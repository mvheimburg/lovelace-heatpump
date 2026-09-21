import { applyColorScheme } from "./color-schemes";
import { LitElement, html, nothing } from "lit";
import { live } from "lit/directives/live.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { CardConfig, HomeAssistant, Connection, Role } from "./types";
import { normalizeConfig } from "./config";
import { discover, type Discovery } from "./discovery";
import {
  watchRegistry,
  loadEnergy,
  invalidate,
  type RegistryState,
  type EnergyData,
} from "./data";
import { Readings, available, numeric } from "./readings";
import { actionPayload, coolingPayload, perform, type Action } from "./actions";
import { modeLabel, language, localize, type TextKey } from "./localize";
import { efficiencyGroup } from "./efficiency";
import { styles } from "./styles";
import "./editor";
export class HeatpumpCard extends LitElement {
  static styles = styles;
  private config?: CardConfig;
  private ha?: HomeAssistant;
  private connection?: Connection;
  private unwatch?: () => void;
  private timer?: ReturnType<typeof setInterval>;
  private registry: RegistryState = {};
  private found: Discovery = { roles: {}, ambiguous: [] };
  private readings = new Readings();
  private energy?: EnergyData;
  private energyKey = "";
  private energyEpoch = 0;
  private actionEpoch = 0;
  private nextEnergy = 0;
  private energyLoading = false;
  private energyError = "";
  private pending = false;
  private feedback = "";
  private failed = false;
  private vetoHours = 2;
  get hass(): HomeAssistant | undefined {
    return this.ha;
  }
  set hass(value: HomeAssistant | undefined) {
    const changed = this.ha?.connection !== value?.connection;
    this.ha = value;
    if (changed) {
      this.stop();
      this.registry = {};
      this.found = { roles: {}, ambiguous: [] };
      this.readings = new Readings();
      this.energy = undefined;
      this.energyKey = "";
    }
    if (this.isConnected) this.start();
    this.resolve();
    this.requestUpdate();
  }
  setConfig(value: CardConfig): void {
    const next = normalizeConfig(value);
    applyColorScheme(this, value.color_scheme, this.ha);
    this.config = next;
    this.readings = new Readings();
    this.energy = undefined;
    this.energyKey = "";
    this.energyEpoch++;
    this.energyLoading = false;
    this.actionEpoch++;
    this.pending = false;
    this.feedback = "";
    this.vetoHours = 2;
    this.resolve();
    this.requestUpdate();
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.start();
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stop();
  }
  private start(): void {
    if (!this.ha || this.unwatch) return;
    this.connection = this.ha.connection;
    this.unwatch = watchRegistry(this.connection, (state) => {
      this.registry = state.registry
        ? state
        : { ...state, registry: this.registry.registry };
      if (!state.registry) {
        this.energyEpoch++;
        this.energyLoading = false;
        this.energyKey = "";
      }
      this.resolve();
      this.requestUpdate();
    });
    this.timer = setInterval(() => {
      this.refreshEnergy();
      this.requestUpdate();
    }, 60_000);
  }
  private stop(): void {
    this.unwatch?.();
    this.unwatch = undefined;
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
    this.energyEpoch++;
    this.energyLoading = false;
    this.actionEpoch++;
    this.pending = false;
    this.energyKey = "";
  }
  private resolve(): void {
    if (!this.config || !this.ha || !this.registry.registry) return;
    this.found = discover(this.registry.registry, this.ha.states, this.config);
    if (this.ha.connection.connected && !this.registry.disconnected)
      for (const e of Object.values(this.found.roles))
        this.readings.remember(this.ha.states[e.entity_id]);
    this.refreshEnergy();
  }
  private get ready(): boolean {
    return (
      !!this.registry.registry &&
      !this.registry.error &&
      !this.registry.loading &&
      !this.registry.disconnected &&
      !!this.ha?.connection.connected
    );
  }
  private show(mode: "comfort" | "water" | "efficiency"): boolean {
    return (
      (this.config?.mode === "all" || this.config?.mode === mode) &&
      (mode !== "water" || !!this.config?.show_hot_water) &&
      (mode !== "efficiency" || !!this.config?.show_efficiency)
    );
  }
  private refreshEnergy(force = false): void {
    if (
      !this.isConnected ||
      !this.ready ||
      !this.config ||
      !this.ha ||
      !this.show("efficiency") ||
      this.found.error
    )
      return;
    const key = JSON.stringify([this.config.cop_window, this.found.roles]);
    if (
      !force &&
      key === this.energyKey &&
      (this.energyLoading || Date.now() < this.nextEnergy)
    )
      return;
    const changed = key !== this.energyKey;
    this.energyKey = key;
    this.nextEnergy = Date.now() + 300_000;
    this.energyLoading = true;
    this.energyError = "";
    if (changed) this.energy = undefined;
    const ticket = ++this.energyEpoch;
    void loadEnergy(
      this.ha.connection,
      this.found.roles,
      this.config.cop_window ?? "7d",
    )
      .then((data) => {
        if (ticket === this.energyEpoch) {
          this.energy = data;
        }
      })
      .catch((error) => {
        if (ticket === this.energyEpoch) this.energyError = String(error);
      })
      .finally(() => {
        if (ticket === this.energyEpoch) {
          this.energyLoading = false;
          this.requestUpdate();
        }
      });
  }
  private t = (key: TextKey) => localize(language(this.ha), key);
  private reading(role: Role) {
    return this.readings.get(
      this.found.roles[role]?.entity_id,
      this.ha?.states ?? {},
      !!this.ha?.connection.connected && !this.registry.disconnected,
    );
  }
  private enabled(role: Role): boolean {
    return (
      this.ready &&
      !this.pending &&
      available(this.ha?.states[this.found.roles[role]?.entity_id ?? ""])
    );
  }
  private temperatureUnit(): string {
    return this.ha?.config?.unit_system?.temperature ?? "°C";
  }
  private number(value: unknown): string {
    const n = numeric(value);
    return n === undefined
      ? "—"
      : new Intl.NumberFormat(language(this.ha), {
          maximumFractionDigits: 1,
        }).format(n);
  }
  private stamp(role: Role) {
    const r = this.reading(role);
    if (!r.stale) return nothing;
    const stamp = r.entity?.last_updated ?? r.entity?.last_changed;
    return html`<span class="stale"
      >${this.t("stale")} ·
      ${stamp ? html`${this.t("lastSeen")} <time datetime=${stamp}>${new Date(stamp).toLocaleString(language(this.ha))}</time>` : this.t("noLastSeen")}</span
    >`;
  }
  private info(role: Role): void {
    const id = this.found.roles[role]?.entity_id;
    if (id)
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          detail: { entityId: id },
          bubbles: true,
          composed: true,
        }),
      );
  }
  private async act(
    role: Role,
    action: Action,
    value?: unknown,
  ): Promise<void> {
    if (!this.enabled(role) || !this.ha || !this.config) return;
    const entity = this.ha.states[this.found.roles[role]!.entity_id];
    const config = this.config;
    await this.send(() =>
      actionPayload(
        role,
        action,
        entity,
        config,
        value,
        this.vetoHours,
        this.temperatureUnit(),
      ),
    );
  }
  private async send(build: () => ReturnType<typeof actionPayload>) {
    if (this.pending || !this.ha) return;
    const ticket = ++this.actionEpoch;
    try {
      const payload = build();
      this.pending = true;
      this.failed = false;
      this.feedback = this.t("pending");
      this.requestUpdate();
      await perform(this.ha, payload);
      if (ticket === this.actionEpoch) this.feedback = this.t("sent");
    } catch (error) {
      if (ticket === this.actionEpoch) {
        const message = error instanceof Error ? error.message : String(error);
        this.failed = true;
        this.feedback = `${this.t("failed")}: ${["range", "unavailable", "invalidMode"].includes(message) ? this.t(message as TextKey) : message}`;
      }
    } finally {
      if (ticket === this.actionEpoch) {
        this.pending = false;
        this.requestUpdate();
      }
    }
  }
  private control(role: Role, label: TextKey, action: Action = "number") {
    const r = this.reading(role),
      entity = r.entity;
    if (!this.found.roles[role]) return nothing;
    const temperature = action === "temperature";
    if (
      temperature &&
      entity &&
      (Number(entity.attributes.supported_features ?? 0) & 1) === 0
    )
      return nothing;
    const value = temperature ? entity?.attributes.temperature : entity?.state;
    const min = numeric(entity?.attributes[temperature ? "min_temp" : "min"]);
    const max = numeric(entity?.attributes[temperature ? "max_temp" : "max"]);
    const step = numeric(
      entity?.attributes[temperature ? "target_temp_step" : "step"],
    );
    return html`<label
      >${this.t(label)}<input
        data-control=${role}
        type="number"
        aria-label=${this.t(label)}
        min=${ifDefined(min)}
        max=${ifDefined(max)}
        step=${step ?? "any"}
        .value=${live(numeric(value) === undefined ? "" : String(value))}
        ?disabled=${!this.enabled(role)}
        @change=${(e: Event) => {
          const input = e.target as HTMLInputElement;
          void this.act(role, action, input.value);
        }}
      />${this.stamp(role)}</label
    >`;
  }
  /** Heating/cooling selector for an external switch (on = cooling). */
  private season() {
    const id = this.config?.cooling_entity;
    if (!id) return nothing;
    const entity = this.ha?.states[id];
    const known = available(entity) && ["on", "off"].includes(entity.state);
    const cooling = entity?.state === "on";
    const enabled = this.ready && !this.pending && known;
    const option = (value: boolean, label: TextKey) => {
      const selected = known && value === cooling;
      return html`<button
        type="button"
        class=${`segment ${selected ? "selected" : ""}`}
        data-season=${value ? "cooling" : "heating"}
        aria-pressed=${selected ? "true" : "false"}
        ?disabled=${!enabled}
        @click=${() => {
          if (!selected)
            void this.send(() => coolingPayload(this.ha?.states[id], value));
        }}
      >
        ${this.t(label)}
      </button>`;
    };
    return html`<div class="season-row">
      <div class="season" role="group" aria-label=${this.t("season")}>
        ${option(false, "heating")}${option(true, "cool")}
      </div>
      ${known ? nothing : html`<span class="stale">${this.t(entity ? "unavailable" : "coolingMissing")}</span>`}
    </div>`;
  }
  private chip(role: Role, label: TextKey) {
    if (!this.found.roles[role]) return nothing;
    const e = this.reading(role).entity;
    return html`<span class="chip"
      >${this.t(label)}
      <strong
        >${this.number(e?.state)}
        ${e?.attributes.unit_of_measurement ?? ""}</strong
      >${this.stamp(role)}</span
    >`;
  }
  private comfort() {
    const e = this.reading("climate").entity;
    if (!this.found.roles.climate) return nothing;
    const modes = Array.isArray(e?.attributes.hvac_modes)
      ? (e.attributes.hvac_modes.filter(
          (m) => typeof m === "string",
        ) as string[])
      : [];
    return html`<section data-panel="comfort">
      <h3>${this.t("comfort")}</h3>
      ${this.season()}
      <div class="row between">
        <div>
          <div class="eyebrow muted">${this.t("current")}</div>
          <div class="big">
            ${this.number(e?.attributes.current_temperature)}<span class="unit"
              >${this.temperatureUnit()}</span
            >
          </div>
          ${this.stamp("climate")}
        </div>
        <div class="controls">
          ${this.control("climate", "target", "temperature")}${
            modes.length
              ? html`<label
                  >${this.t("mode")}<select
                    data-control="mode"
                    ?disabled=${!this.enabled("climate")}
                    .value=${live(e?.state ?? "")}
                    @change=${(event: Event) => void this.act("climate", "mode", (event.target as HTMLSelectElement).value)}
                  >
                    ${modes.map((m) => html`<option value=${m} ?selected=${m === e?.state}>${modeLabel(language(this.ha), m)}</option>`)}
                  </select></label
                >`
              : nothing
          }
        </div>
      </div>
      <div class="readings">
        ${this.chip("flow", "flow")}${this.chip("flowTarget", "flowTarget")}${this.chip("outdoor", "outdoor")}${this.chip("pressure", "pressure")}
      </div>
      <details class="veto">
        <summary>${this.t("quickVeto")}</summary>
        <p class="hint">${this.t("vetoHint")}</p>
        <div class="controls">
          <label
            >${this.t("duration")}<input
              type="number"
              min="1"
              max="12"
              step="0.5"
              .value=${String(this.vetoHours)}
              @change=${(event: Event) => {
                this.vetoHours = Number(
                  (event.target as HTMLInputElement).value,
                );
              }} /></label
          ><button
            class="secondary"
            data-action="quickVeto"
            ?disabled=${!this.enabled("climate") || numeric(e?.attributes.temperature) === undefined}
            @click=${() => void this.act("climate", "quickVeto", e?.attributes.temperature)}
          >
            ${this.t("startVeto")}</button
          >${this.reading("quickVeto").entity && !this.reading("quickVeto").stale ? this.control("quickVeto", "duration") : nothing}
        </div>
      </details>
      ${
        this.config?.allow_curve_edit &&
        (this.found.roles.curve || this.found.roles.minFlow)
          ? html`<details class="veto" open>
              <summary>${this.t("curve")}</summary>
              <p class="hint">${this.t("curveHint")}</p>
              <div class="controls">
                ${this.control("curve", "curve")}${this.control("minFlow", "minFlow")}
              </div>
            </details>`
          : nothing
      }
    </section>`;
  }
  private water() {
    const roles = this.found.roles;
    if (!["water", "tank", "boost", "legionella"].some((r) => roles[r as Role]))
      return nothing;
    const e = this.reading("water").entity;
    const tankRole: Role = roles.tank ? "tank" : "water",
      targetRole: Role = roles.waterTarget ? "waterTarget" : "water";
    const tank = numeric(
      roles.tank
        ? this.reading("tank").entity?.state
        : e?.attributes.current_temperature,
    );
    const target = numeric(
      roles.waterTarget
        ? this.reading("waterTarget").entity?.state
        : e?.attributes.temperature,
    );
    const tankUnit = String(
      roles.tank
        ? (this.reading("tank").entity?.attributes.unit_of_measurement ??
            this.temperatureUnit())
        : this.temperatureUnit(),
    );
    const targetUnit = String(
      roles.waterTarget
        ? (this.reading("waterTarget").entity?.attributes.unit_of_measurement ??
            this.temperatureUnit())
        : this.temperatureUnit(),
    );
    const celsius = (n: number | undefined, unit: string) =>
      n === undefined ? undefined : unit === "°F" ? ((n - 32) * 5) / 9 : n;
    const currentC = celsius(tank, tankUnit),
      targetC = celsius(target, targetUnit);
    const fill =
      currentC !== undefined && targetC !== undefined && targetC > 0
        ? Math.max(0, Math.min(100, (currentC / targetC) * 100))
        : 0;
    const boosting = this.reading("boost").entity?.state === "on";
    const date = this.reading("legionella").entity?.state;
    const time = date ? Date.parse(date) : NaN,
      days = Number.isFinite(time)
        ? Math.floor((Date.now() - time) / 86400000)
        : undefined;
    const overdue =
      days !== undefined &&
      (Date.now() - time) / 86400000 >
        (this.config?.legionella_interval_days ?? 7);
    return html`<section data-panel="water">
      <h3>${this.t("water")}</h3>
      <div class="water-layout">
        <div
          class="tank"
          role="progressbar"
          aria-label=${this.t("tank")}
          aria-valuemin="0"
          aria-valuemax=${ifDefined(target !== undefined ? Math.max(tank ?? 0, target) : undefined)}
          aria-valuenow=${ifDefined(tank)}
          aria-valuetext=${tank === undefined ? this.t("unknown") : `${tank} ${tankUnit} / ${target ?? "—"} ${targetUnit}`}
        >
          <div class="fill" style=${`height:${fill}%`}></div>
        </div>
        <div class="water-info">
          <div class="eyebrow muted">${this.t("tank")}</div>
          <div class="big">
            ${this.number(tank)}<span class="unit">${tankUnit}</span>
          </div>
          ${this.stamp(tankRole)}
          <div class="hint">
            ${this.t("target")} ${this.number(target)}
            ${targetUnit}${targetRole !== tankRole ? this.stamp(targetRole) : nothing}
          </div>
          ${roles.boost ? html`<button class=${`primary ${boosting ? "active" : ""}`} data-action="boost" ?disabled=${!this.enabled("boost")} @click=${() => void this.act("boost", "boost")}>${this.t(boosting ? "boosting" : "boost")}</button>${this.stamp("boost")}` : nothing}
        </div>
      </div>
      <p class="hint">${this.t("tankHint")}</p>
      ${roles.water ? html`<div class="controls">${this.control("water", "target", "temperature")}</div>` : nothing}
      ${roles.legionella ? html`<div class=${`legionella ${overdue ? "warning" : ""}`}><strong>${this.t("legionella")}</strong><span>${days === undefined ? this.t("neverReached") : days < 0 ? this.t("futureDate") : html`${this.t("lastReached")} ${days === 0 ? this.t("today") : html`${days} ${this.t("daysAgo")}`}`}</span>${overdue ? html`<span>· ${this.t("overdue")}</span>` : nothing}${this.stamp("legionella")}</div>` : nothing}
    </section>`;
  }
  private efficiency() {
    const hasHeating =
        !!this.found.roles.heatingElectric && !!this.found.roles.heatingHeat,
      hasWater =
        !!this.found.roles.waterElectric && !!this.found.roles.waterHeat;
    if (!hasHeating && !hasWater) return nothing;
    return html`<section data-panel="efficiency">
      <div class="row between">
        <h3>${this.t("efficiency")}</h3>
        <span class="chip">${this.t(this.config!.cop_window!)}</span>
      </div>
      ${this.energyLoading ? html`<p class="hint" role="status">${this.t("loading")}</p>` : nothing}
      ${
        this.energyError
          ? html`<p class="feedback error" role="alert">
                ${this.t("statisticsError")}: ${this.energyError}
                <button
                  @click=${() => {
                    invalidate(this.ha!.connection);
                    this.refreshEnergy(true);
                    this.requestUpdate();
                  }}
                >
                  ${this.t("retry")}
                </button>
              </p>
              ${this.energy ? html`<span class="stale">${this.t("statisticsStale")}</span>` : nothing}`
          : nothing
      }
      ${hasHeating ? efficiencyGroup("heating", this.energy, this.t, language(this.ha)) : nothing}${hasWater ? efficiencyGroup("water", this.energy, this.t, language(this.ha)) : nothing}
      <p class="hint">
        ${this.t("energyNote")}${this.energy ? html`<br />${this.t("through")} <time datetime=${new Date(this.energy.end).toISOString()}>${new Date(this.energy.end).toLocaleString(language(this.ha))}</time>` : nothing}
      </p>
    </section>`;
  }
  private retry(): void {
    this.stop();
    this.registry = {};
    this.energyKey = "";
    this.start();
    this.requestUpdate();
  }
  protected render() {
    if (!this.config) return nothing;
    const fault = this.reading("trouble").entity;
    return html`<ha-card
      class=${this.config.appearance === "bubble" ? "bubble" : ""}
      ><header>
        <span class="symbol"
          ><ha-icon icon="mdi:heat-pump-outline"></ha-icon
        ></span>
        <div class="header-name">
          <div class="eyebrow muted">myVAILLANT</div>
          <h2>${this.config.name ?? this.t("title")}</h2>
        </div>
      </header>
      ${
        fault?.state === "on"
          ? html`<div class="takeover" role="alert">
              <h3>${this.t("fault")}</h3>
              <pre>
${JSON.stringify(fault.attributes.diagnostic_trouble_codes ?? [], null, 2)}</pre>
              ${this.stamp("trouble")}<button
                @click=${() => this.info("trouble")}
              >
                ${this.t("details")}
              </button>
            </div>`
          : this.found.roles.trouble
            ? this.stamp("trouble")
            : nothing
      }
      ${this.registry.error || this.registry.disconnected ? html`<p class="feedback error" role="alert">${this.registry.disconnected ? this.t("disconnected") : html`${this.t("registryError")}: ${this.registry.error}`} <button @click=${this.retry}>${this.t("retry")}</button></p>` : nothing}
      ${
        !this.registry.registry
          ? html`<p role="status">${this.t("loading")}</p>`
          : this.found.error
            ? html`<p role="alert">${this.t(this.found.error as TextKey)}</p>`
            : html` ${this.found.ambiguous.length ? html`<p class="hint warning">${this.t("ambiguous")}: ${this.found.ambiguous.join(", ")}</p>` : nothing}
              ${this.feedback ? html`<p class=${`feedback ${this.failed ? "error" : ""}`} role=${this.failed ? "alert" : "status"}>${this.feedback}</p>` : nothing}
              ${this.show("comfort") ? this.comfort() : nothing}${this.show("water") ? this.water() : nothing}${this.show("efficiency") ? this.efficiency() : nothing}
              ${!Object.keys(this.found.roles).length ? html`<p class="hint">${this.t("noRoles")}</p>` : nothing}`
      }</ha-card
    >`;
  }
  getCardSize(): number {
    return this.config?.mode === "all" ? 12 : 5;
  }
  static getConfigElement(): HTMLElement {
    return document.createElement("heatpump-card-editor");
  }
  static getStubConfig(): CardConfig {
    return {
      type: "custom:heatpump-card",
      mode: "all",
      appearance: "default",
      cop_window: "7d",
    };
  }
}
if (!customElements.get("heatpump-card"))
  customElements.define("heatpump-card", HeatpumpCard);
const catalog = window as unknown as {
  customCards?: {
    type: string;
    name: string;
    description: string;
    preview: boolean;
  }[];
};
catalog.customCards ??= [];
if (!catalog.customCards.some((c) => c.type === "heatpump-card"))
  catalog.customCards.push({
    type: "heatpump-card",
    name: "Heat Pump Card",
    description: "myVAILLANT comfort, hot water and measured efficiency",
    preview: true,
  });
