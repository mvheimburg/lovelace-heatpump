import { colorSchemeSelector } from "./color-schemes";
import { LitElement, html } from "lit";
import { live } from "lit/directives/live.js";
import type { CardConfig, HomeAssistant } from "./types";
import { normalizeConfig } from "./config";
import { language, localize, type TextKey } from "./localize";
import { styles } from "./styles";
export class HeatpumpEditor extends LitElement {
  static styles = styles;
  static properties = { hass: { attribute: false } };
  hass?: HomeAssistant;
  private config: CardConfig = { type: "custom:heatpump-card" };
  setConfig(config: CardConfig): void {
    this.config = {
      ...config,
      entities: config.entities ? { ...config.entities } : undefined,
    };
    this.requestUpdate();
  }
  protected updated(): void {
    this.renderRoot
      .querySelectorAll<HTMLInputElement>("input")
      .forEach((input) => {
        if (input.validity.customError)
          input.setCustomValidity(this.t("invalidValue"));
      });
  }
  private t(key: TextKey): string {
    return localize(language(this.hass), key);
  }
  private change(key: keyof CardConfig, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value =
      input.type === "checkbox"
        ? input.checked
        : input.type === "number"
          ? Number(input.value)
          : input.value;
    const next = { ...this.config, [key]: value };
    if (value === "") delete next[key];
    if (key === "entity" && value) delete next.entry;
    if (key === "entry" && value) delete next.entity;
    try {
      normalizeConfig(next);
    } catch {
      input.setCustomValidity(this.t("invalidValue"));
      input.reportValidity();
      return;
    }
    input.setCustomValidity("");
    this.config = next;
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...next } },
        bubbles: true,
        composed: true,
      }),
    );
  }
  private select(
    key: "mode" | "appearance" | "cop_window",
    label: TextKey,
    values: string[],
  ) {
    const selected =
      this.config[key] ??
      { mode: "all", appearance: "default", cop_window: "7d" }[key];
    return html`<label
      >${this.t(label)}<select
        data-config=${key}
        .value=${live(selected)}
        @change=${(e: Event) => this.change(key, e)}
      >
        ${values.map((v) => html`<option value=${v} ?selected=${v === selected}>${this.t(v as TextKey)}</option>`)}
      </select></label
    >`;
  }
  protected render() {
    return html`<div class="editor">
      ${colorSchemeSelector(this.hass, this.config.color_scheme, (scheme) => {
        this.config = { ...this.config, color_scheme: scheme };
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this.config } }, bubbles: true, composed: true }));
      })}
      <p class="hint">${this.t("editorHint")}</p>
      <label
        >${this.t("entity")}<input
          data-config="entity"
          list="climates"
          .value=${live(this.config.entity ?? "")}
          placeholder="climate.…"
          @change=${(e: Event) => this.change("entity", e)}
        /><datalist id="climates">
          ${Object.keys(this.hass?.states ?? {})
            .filter((id) => id.startsWith("climate."))
            .map((id) => html`<option value=${id}></option>`)}
        </datalist></label
      >
      <label
        >${this.t("entry")}<input
          data-config="entry"
          .value=${live(this.config.entry ?? "")}
          @change=${(e: Event) => this.change("entry", e)}
      /></label>
      <label
        >${this.t("name")}<input
          data-config="name"
          .value=${live(this.config.name ?? "")}
          @change=${(e: Event) => this.change("name", e)}
      /></label>
      ${this.select("mode", "mode", ["all", "comfort", "water", "efficiency"])}${this.select("appearance", "appearance", ["default", "bubble"])}${this.select("cop_window", "window", ["24h", "7d", "30d"])}
      ${(["show_efficiency", "show_hot_water", "allow_curve_edit"] as const).map((key) => html`<label class="toggle"><input data-config=${key} type="checkbox" .checked=${live(this.config[key] ?? key !== "allow_curve_edit")} @change=${(e: Event) => this.change(key, e)} />${this.t(key)}</label>`)}
      <label
        >${this.t("legionella_interval_days")}<input
          data-config="legionella_interval_days"
          type="number"
          min="1"
          step="1"
          .value=${live(String(this.config.legionella_interval_days ?? 7))}
          @change=${(e: Event) => this.change("legionella_interval_days", e)}
      /></label>
    </div>`;
  }
}
if (!customElements.get("heatpump-card-editor"))
  customElements.define("heatpump-card-editor", HeatpumpEditor);
