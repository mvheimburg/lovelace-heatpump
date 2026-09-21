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
