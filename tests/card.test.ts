import { afterEach, it, expect, vi } from "vitest";
import { HeatpumpCard } from "../src/heatpump-card";
import { HeatpumpEditor } from "../src/editor";
import { fixture, state } from "./ui-fixture";
import type { CardConfig, HomeAssistant } from "../src/types";
const mounted: HTMLElement[] = [];
afterEach(() => {
  mounted.splice(0).forEach((c) => c.remove());
});
async function card(
  config: Partial<CardConfig> = {},
  hass: HomeAssistant = fixture(),
) {
  const c = new HeatpumpCard();
  c.setConfig({
    type: "custom:heatpump-card",
    entity: "climate.home",
    ...config,
  });
  c.hass = hass;
  document.body.append(c);
  mounted.push(c);
  await vi.waitFor(() =>
    expect(
      c.shadowRoot?.querySelector(
        '[data-panel="comfort"], [data-panel="water"]',
      ),
    ).not.toBeNull(),
  );
  return { c, hass };
}
it("renders a tank column and dispatches explicit boost on/off service calls", async () => {
  const { c, hass } = await card();
  expect(
    c.shadowRoot
      ?.querySelector('[role="progressbar"]')
      ?.getAttribute("aria-valuenow"),
  ).toBe("48");
  (
    c.shadowRoot?.querySelector('[data-action="boost"]') as HTMLButtonElement
  ).click();
  await vi.waitFor(() =>
    expect(hass.callService).toHaveBeenCalledWith("switch", "turn_on", {
      entity_id: "switch.boost",
    }),
  );
  hass.states["switch.boost"] = state("switch.boost", "on");
  c.hass = { ...hass };
  await c.updateComplete;
  (
    c.shadowRoot?.querySelector('[data-action="boost"]') as HTMLButtonElement
  ).click();
  await vi.waitFor(() =>
    expect(hass.callService).toHaveBeenCalledWith("switch", "turn_off", {
      entity_id: "switch.boost",
    }),
  );
});
it("preserves last-known values and timestamp while disabling stale actions", async () => {
  const { c, hass } = await card();
  hass.states["water_heater.home"] = state("water_heater.home", "unavailable");
  hass.states["switch.boost"] = state("switch.boost", "unavailable");
  c.hass = { ...hass };
  await c.updateComplete;
  expect(c.shadowRoot?.textContent).toContain("48");
  expect(c.shadowRoot?.textContent).toContain("Stale");
  expect(c.shadowRoot?.querySelector("time")?.getAttribute("datetime")).toBe(
    "2026-09-17T14:20:00Z",
  );
  expect(
    (c.shadowRoot?.querySelector('[data-action="boost"]') as HTMLButtonElement)
      .disabled,
  ).toBe(true);
});
it("takes over for faults in water mode and requires an explicit curve-edit flag", async () => {
  const { c, hass } = await card({ mode: "water" });
  expect(c.shadowRoot?.querySelector('[data-panel="comfort"]')).toBeNull();
  hass.states["binary_sensor.fault"] = state("binary_sensor.fault", "on", {
    diagnostic_trouble_codes: ["F.22"],
  });
  c.hass = { ...hass };
  await c.updateComplete;
  expect(c.shadowRoot?.querySelector('[role="alert"]')?.textContent).toContain(
    "F.22",
  );
  c.setConfig({ type: "custom:heatpump-card", entity: "climate.home" });
  await c.updateComplete;
  expect(c.shadowRoot?.querySelector('[data-control="curve"]')).toBeNull();
  c.setConfig({
    type: "custom:heatpump-card",
    entity: "climate.home",
    allow_curve_edit: true,
  });
  await c.updateComplete;
  expect(c.shadowRoot?.querySelector('[data-control="curve"]')).not.toBeNull();
});
it("starts a quick veto with a temperature and duration even when the duration entity is inactive", async () => {
  const { c, hass } = await card();
  (
    c.shadowRoot?.querySelector(
      '[data-action="quickVeto"]',
    ) as HTMLButtonElement
  ).click();
  await vi.waitFor(() =>
    expect(hass.callService).toHaveBeenCalledWith(
      "mypyllant",
      "set_quick_veto",
      { entity_id: "climate.home", temperature: 21, duration_hours: 2 },
    ),
  );
});
it("rejects out-of-range temperature edits and displays service failures", async () => {
  const { c, hass } = await card();
  const input = c.shadowRoot?.querySelector(
    '[data-control="climate"]',
  ) as HTMLInputElement;
  input.value = "90";
  input.dispatchEvent(new Event("change"));
  await c.updateComplete;
  expect(hass.callService).not.toHaveBeenCalled();
  vi.mocked(hass.callService).mockRejectedValueOnce(Error("Cloud timed out"));
  (
    c.shadowRoot?.querySelector('[data-action="boost"]') as HTMLButtonElement
  ).click();
  await vi.waitFor(() =>
    expect(c.shadowRoot?.textContent).toContain("Cloud timed out"),
  );
});
it("never carries readings across entry configuration changes", async () => {
  const { c } = await card();
  c.setConfig({ type: "custom:heatpump-card", entry: "missing" });
  await c.updateComplete;
  expect(c.shadowRoot?.textContent).not.toContain("48");
});
it("emits editor changes while preserving YAML role overrides", async () => {
  const editor = new HeatpumpEditor();
  editor.hass = fixture();
  editor.setConfig({
    type: "custom:heatpump-card",
    entity: "climate.home",
    entities: { flow: "sensor.custom" },
  });
  document.body.append(editor);
  mounted.push(editor);
  await editor.updateComplete;
  const event = vi.fn();
  editor.addEventListener("config-changed", event);
  const select = editor.shadowRoot?.querySelector(
    '[data-config="mode"]',
  ) as HTMLSelectElement;
  select.value = "water";
  select.dispatchEvent(new Event("change"));
  expect(event.mock.calls[0][0].detail.config).toMatchObject({
    mode: "water",
    entities: { flow: "sensor.custom" },
  });
});
it("disables controls while registry identities are being refreshed", async () => {
  const { c, hass } = await card();
  const callbacks = vi.mocked(hass.connection.subscribeEvents).mock.calls;
  hass.connection.sendMessagePromise = () => new Promise(() => {});
  callbacks.find(([, type]) => type === "entity_registry_updated")![0]();
  await c.updateComplete;
  expect(
    (c.shadowRoot?.querySelector('[data-action="boost"]') as HTMLButtonElement)
      .disabled,
  ).toBe(true);
});
it("blocks duplicate boost calls while a request is pending", async () => {
  const { c, hass } = await card();
  let done!: () => void;
  vi.mocked(hass.callService).mockImplementationOnce(
    () =>
      new Promise<void>((resolve) => {
        done = resolve;
      }),
  );
  const button = c.shadowRoot?.querySelector(
    '[data-action="boost"]',
  ) as HTMLButtonElement;
  button.click();
  button.click();
  expect(hass.callService).toHaveBeenCalledTimes(1);
  done();
  await c.updateComplete;
});
it("marks readings stale and disables controls on a connection disconnect", async () => {
  const { c, hass } = await card();
  hass.connection.connected = false;
  vi.mocked(hass.connection.addEventListener).mock.calls.find(
    ([event]) => event === "disconnected",
  )![1]();
  await c.updateComplete;
  expect(
    (c.shadowRoot?.querySelector('[data-action="boost"]') as HTMLButtonElement)
      .disabled,
  ).toBe(true);
  expect(c.shadowRoot?.textContent).toContain("Home Assistant disconnected");
  expect(c.shadowRoot?.textContent).toContain("Stale");
});
it("shows the actual HVAC mode on the first render", async () => {
  const { c } = await card();
  expect(
    (c.shadowRoot?.querySelector('[data-control="mode"]') as HTMLSelectElement)
      .value,
  ).toBe("auto");
});
it("shows configured editor selections on the first render", async () => {
  const editor = new HeatpumpEditor();
  editor.setConfig({
    type: "custom:heatpump-card",
    mode: "water",
    appearance: "bubble",
    cop_window: "30d",
  });
  document.body.append(editor);
  mounted.push(editor);
  await editor.updateComplete;
  expect(
    (
      editor.shadowRoot?.querySelector(
        '[data-config="mode"]',
      ) as HTMLSelectElement
    ).value,
  ).toBe("water");
  expect(
    (
      editor.shadowRoot?.querySelector(
        '[data-config="cop_window"]',
      ) as HTMLSelectElement
    ).value,
  ).toBe("30d");
});
it("warns as soon as the legionella reminder interval has elapsed", async () => {
  const hass = fixture();
  hass.states["datetime.legionella"] = state(
    "datetime.legionella",
    new Date(Date.now() - 7 * 86400000 - 3600000).toISOString(),
  );
  const { c } = await card({}, hass);
  expect(c.shadowRoot?.querySelector(".legionella")?.textContent).toContain(
    "Past the reminder interval",
  );
});
it("localizes fallback locale, HVAC labels and live language changes without translating service values", async () => {
  const hass = {
    ...fixture(),
    language: undefined,
    locale: { language: "NB_no" },
  };
  const { c } = await card({}, hass);
  expect(c.shadowRoot?.textContent).toContain("Komfort");
  expect(c.shadowRoot?.textContent).toContain("20,5");
  const mode = c.shadowRoot!.querySelector<HTMLSelectElement>(
    '[data-control="mode"]',
  )!;
  expect(Array.from(mode.options, (o) => o.textContent)).toEqual([
    "Av",
    "Oppvarming",
    "Automatisk",
  ]);
  mode.value = "heat";
  mode.dispatchEvent(new Event("change"));
  await vi.waitFor(() =>
    expect(hass.callService).toHaveBeenCalledWith("climate", "set_hvac_mode", {
      entity_id: "climate.home",
      hvac_mode: "heat",
    }),
  );
  c.hass = { ...hass, language: "en" };
  await c.updateComplete;
  expect(c.shadowRoot?.textContent).toContain("Comfort");
});
it("localizes editor windows and validation with locale fallback", async () => {
  const editor = new HeatpumpEditor();
  editor.hass = {
    ...fixture(),
    language: undefined,
    locale: { language: "no" },
  } as HomeAssistant;
  document.body.append(editor);
  mounted.push(editor);
  await editor.updateComplete;
  expect(editor.shadowRoot?.textContent).toContain("7 dager");
  const input = editor.shadowRoot!.querySelector<HTMLInputElement>(
    '[data-config="legionella_interval_days"]',
  )!;
  input.value = "-1";
  input.dispatchEvent(new Event("change"));
  expect(input.validationMessage).toBe("Ugyldig verdi");
});
it("refreshes an existing validation message when editor language changes", async () => {
  const editor = new HeatpumpEditor();
  editor.hass = fixture();
  document.body.append(editor);
  mounted.push(editor);
  await editor.updateComplete;
  const input = editor.shadowRoot!.querySelector<HTMLInputElement>(
    '[data-config="legionella_interval_days"]',
  )!;
  input.value = "-1";
  input.dispatchEvent(new Event("change"));
  editor.hass = { ...fixture(), language: "nb" };
  await editor.updateComplete;
  expect(input.validationMessage).toBe("Ugyldig verdi");
});
it("switches between heating and cooling through a configured external switch", async () => {
  const hass = fixture();
  hass.states["switch.cooling"] = state("switch.cooling", "off");
  const { c } = await card({ cooling_entity: "switch.cooling" }, hass);
  const segment = (season: string) =>
    c.shadowRoot!.querySelector<HTMLButtonElement>(
      `[data-season="${season}"]`,
    )!;
  expect(segment("heating").getAttribute("aria-pressed")).toBe("true");
  expect(segment("cooling").getAttribute("aria-pressed")).toBe("false");
  segment("heating").click();
  expect(hass.callService).not.toHaveBeenCalled();
  segment("cooling").click();
  segment("cooling").click();
  await vi.waitFor(() =>
    expect(hass.callService).toHaveBeenCalledWith("switch", "turn_on", {
      entity_id: "switch.cooling",
    }),
  );
  expect(hass.callService).toHaveBeenCalledTimes(1);
  hass.states["switch.cooling"] = state("switch.cooling", "on");
  c.hass = { ...hass };
  await c.updateComplete;
  expect(segment("cooling").getAttribute("aria-pressed")).toBe("true");
  segment("heating").click();
  await vi.waitFor(() =>
    expect(hass.callService).toHaveBeenCalledWith("switch", "turn_off", {
      entity_id: "switch.cooling",
    }),
  );
});
it("disables the heating/cooling switch when its entity is unavailable or missing, in Bokmål", async () => {
  const hass = { ...fixture(), language: "nb" };
  hass.states["input_boolean.kjoling"] = state(
    "input_boolean.kjoling",
    "unavailable",
  );
  const { c } = await card({ cooling_entity: "input_boolean.kjoling" }, hass);
  const group = c.shadowRoot!.querySelector(".season")!;
  expect(group.getAttribute("aria-label")).toBe("Varme eller kjøling");
  expect(group.textContent).toContain("Oppvarming");
  expect(group.textContent).toContain("Kjøling");
  const buttons = group.querySelectorAll("button");
  expect(Array.from(buttons).every((b) => b.disabled)).toBe(true);
  expect(c.shadowRoot!.querySelector(".season-row")?.textContent).toContain(
    "Utilgjengelig",
  );
  c.setConfig({
    type: "custom:heatpump-card",
    entity: "climate.home",
    cooling_entity: "switch.gone",
  });
  await c.updateComplete;
  expect(c.shadowRoot!.querySelector(".season-row")?.textContent).toContain(
    "Fant ikke bryteren",
  );
  c.setConfig({ type: "custom:heatpump-card", entity: "climate.home" });
  await c.updateComplete;
  expect(c.shadowRoot!.querySelector(".season")).toBeNull();
  expect(() =>
    c.setConfig({
      type: "custom:heatpump-card",
      entity: "climate.home",
      cooling_entity: "climate.home",
    }),
  ).toThrow(/cooling_entity/);
});
it("sets the heating/cooling switch from the editor", async () => {
  const editor = new HeatpumpEditor();
  const hass = fixture();
  hass.states["switch.cooling"] = state("switch.cooling", "off");
  editor.hass = hass;
  editor.setConfig({ type: "custom:heatpump-card", entity: "climate.home" });
  document.body.append(editor);
  mounted.push(editor);
  await editor.updateComplete;
  expect(
    Array.from(
      editor.shadowRoot!.querySelectorAll("#cooling-switches option"),
      (o) => o.getAttribute("value"),
    ),
  ).toEqual(["switch.boost", "switch.cooling"]);
  const event = vi.fn();
  editor.addEventListener("config-changed", event);
  const input = editor.shadowRoot!.querySelector<HTMLInputElement>(
    '[data-config="cooling_entity"]',
  )!;
  input.value = "switch.cooling";
  input.dispatchEvent(new Event("change"));
  expect(event.mock.calls[0][0].detail.config).toMatchObject({
    cooling_entity: "switch.cooling",
  });
  input.value = "sensor.nope";
  input.dispatchEvent(new Event("change"));
  expect(event).toHaveBeenCalledTimes(1);
});

const HOUR = 3_600_000;
/** The fixture plus flow, flow target, outdoor and pressure, with history. */
function withReadings(now: number, fail?: Error) {
  const hass = fixture();
  const s = (ms: number) => ms / 1000;
  const extra = [
    ["sensor.flow", "mypyllant_sys_circuit_0_flow_temperature", "31.5", "°C"],
    [
      "sensor.flow_target",
      "mypyllant_sys_circuit_0_flow_temperature_setpoint",
      "28.6",
      "°C",
    ],
    ["sensor.outdoor", "mypyllant_sys_home_outdoor_temperature", "13.7", "°C"],
    ["sensor.pressure", "mypyllant_sys_home_water_pressure", "1.4", "bar"],
  ];
  for (const [id, , value, unit] of extra)
    hass.states[id] = state(id, value, {
      unit_of_measurement: unit,
      device_class: unit === "bar" ? "pressure" : "temperature",
    });
  const original = hass.connection.sendMessagePromise;
  const history = vi.fn(async (m: Record<string, unknown>) => {
    if (fail) throw fail;
    const rows: Record<string, unknown[]> = {
      "sensor.flow": [
        { s: "30", lu: s(now - 20 * HOUR) },
        { s: "unavailable", lu: s(now - 12 * HOUR) },
        { s: "33", lu: s(now - 8 * HOUR) },
      ],
      "sensor.flow_target": [{ s: "29", lu: s(now - 20 * HOUR) }],
      "sensor.outdoor": [{ s: "5", lu: s(now - 20 * HOUR) }],
      "sensor.pressure": [{ s: "1.5", lu: s(now - 20 * HOUR) }],
    };
    return Object.fromEntries(
      (m.entity_ids as string[]).map((id) => [id, rows[id] ?? []]),
    );
  });
  hass.connection.sendMessagePromise = vi.fn(
    async <T>(m: Record<string, unknown>) => {
      if (m.type === "history/history_during_period")
        return (await history(m)) as T;
      const reply = await original<unknown[]>(m);
      if (m.type === "config/entity_registry/list")
        return [
          ...reply,
          ...extra.map(([id, unique]) => ({
            entity_id: id,
            unique_id: unique,
            device_id: unique.includes("circuit") ? "circuit" : "general",
            config_entry_id: "home",
            platform: "mypyllant",
          })),
        ] as T;
      return reply as T;
    },
  ) as HomeAssistant["connection"]["sendMessagePromise"];
  return { hass, history };
}
const legend = (c: HTMLElement) =>
  Array.from(c.shadowRoot!.querySelectorAll(".legend .item")).map((i) =>
    i.textContent!.replace(/\s+/g, " ").trim(),
  );
async function opened(c: HeatpumpCard, role: string) {
  (
    c.shadowRoot!.querySelector(`[data-chip="${role}"]`) as HTMLButtonElement
  ).click();
  await vi.waitFor(() => expect(legend(c).length).toBeGreaterThan(0));
  await c.updateComplete;
}

it("opens one history of flow, flow target, outdoor and pressure from any reading", async () => {
  const now = Date.now();
  const { hass, history } = withReadings(now);
  const { c } = await card({}, hass);
  await opened(c, "pressure");
  const dialog = c.shadowRoot!.querySelector<HTMLDialogElement>("#history")!;
  expect(dialog.open).toBe(true);
  expect(history).toHaveBeenCalledTimes(1);
  const message = history.mock.calls[0][0];
  expect(message).toMatchObject({
    type: "history/history_during_period",
    entity_ids: [
      "sensor.flow",
      "sensor.flow_target",
      "sensor.outdoor",
      "sensor.pressure",
    ],
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false,
  });
  expect(Date.parse(String(message.start_time))).toBeCloseTo(
    now - 24 * HOUR,
    -4,
  );
  expect(legend(c)).toEqual([
    "Flow 31.5 °C",
    "Flow target 28.6 °C",
    "Outdoors 13.7 °C",
    "Pressure 1.4 bar",
  ]);
  expect(c.shadowRoot!.querySelectorAll(".chart .line")).toHaveLength(4);
  // Pressure has its own right-hand scale in bar.
  expect(
    Array.from(c.shadowRoot!.querySelectorAll(".chart .axis")).some((t) =>
      t.textContent!.includes("bar"),
    ),
  ).toBe(true);
  // The unavailable spell splits the flow line in two.
  expect(
    c
      .shadowRoot!.querySelector(".chart .s-flow")!
      .getAttribute("d")!
      .match(/M/g),
  ).toHaveLength(2);
  dialog.close();
  await opened(c, "outdoor");
  expect(dialog.open).toBe(true);
});

it("reads the values under the pointer, changes range and opens a reading's details", async () => {
  const now = Date.now();
  const { hass, history } = withReadings(now);
  const { c } = await card({}, hass);
  await opened(c, "flow");
  const svg = c.shadowRoot!.querySelector<SVGSVGElement>(".chart")!;
  const box = svg.getBoundingClientRect();
  const width = svg.viewBox.baseVal.width;
  // The plot spans x 40 to width − 44; a third in is 16 hours ago.
  c.shadowRoot!.querySelector(".history-plot")!.dispatchEvent(
    new PointerEvent("pointermove", {
      clientX: box.left + ((40 + (width - 84) / 3) / width) * box.width,
    }),
  );
  await c.updateComplete;
  expect(legend(c)).toEqual([
    "Flow 30 °C",
    "Flow target 29 °C",
    "Outdoors 5 °C",
    "Pressure 1.5 bar",
  ]);
  (
    c.shadowRoot!.querySelector('[data-range="168"]') as HTMLButtonElement
  ).click();
  await vi.waitFor(() => expect(history).toHaveBeenCalledTimes(2));
  expect(Date.parse(String(history.mock.calls[1][0].start_time))).toBeCloseTo(
    now - 168 * HOUR,
    -4,
  );
  const info: string[] = [];
  c.addEventListener("hass-more-info", (e) =>
    info.push((e as CustomEvent).detail.entityId),
  );
  await vi.waitFor(() => expect(legend(c).length).toBe(4));
  (
    c.shadowRoot!.querySelector('[data-series="pressure"]') as HTMLButtonElement
  ).click();
  expect(info).toEqual(["sensor.pressure"]);
  expect(c.shadowRoot!.querySelector<HTMLDialogElement>("#history")!.open).toBe(
    false,
  );
});

it("explains a failed history request in Bokmål", async () => {
  const { hass } = withReadings(Date.now(), new Error("Recorder is off"));
  hass.language = "nb";
  const { c } = await card({}, hass);
  (
    c.shadowRoot!.querySelector('[data-chip="flow"]') as HTMLButtonElement
  ).click();
  await vi.waitFor(() =>
    expect(
      c.shadowRoot!.querySelector("#history [role=alert]")?.textContent?.trim(),
    ).toBe("Kunne ikke hente historikk: Recorder is off"),
  );
  expect(
    Array.from(c.shadowRoot!.querySelectorAll("[data-range]")).map((b) =>
      b.textContent!.trim(),
    ),
  ).toEqual(["6 t", "24 t", "7 d"]);
  expect(c.shadowRoot!.querySelector("#history-title")!.textContent).toBe(
    "Varmepumpehistorikk",
  );
});
