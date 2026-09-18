import { vi } from "vitest";
import type { HomeAssistant, RegistryEntity, HassEntity } from "../src/types";
export const reg = (
  id: string,
  unique: string,
  device: string,
): RegistryEntity => ({
  entity_id: id,
  unique_id: unique,
  device_id: device,
  config_entry_id: "home",
  platform: "mypyllant",
});
export const state = (
  id: string,
  value: string,
  attributes: Record<string, unknown> = {},
): HassEntity => ({
  entity_id: id,
  state: value,
  attributes,
  last_updated: "2026-09-17T14:20:00Z",
});
export function fixture(): HomeAssistant {
  const entities = [
    reg("climate.home", "mypyllant_sys_zone_1_climate", "zone"),
    reg(
      "water_heater.home",
      "mypyllant_sys_domestic_hot_water_0_base",
      "water",
    ),
    reg(
      "switch.boost",
      "mypyllant_sys_domestic_hot_water_0_boost_switch",
      "water",
    ),
    reg(
      "datetime.legionella",
      "mypyllant_sys_domestic_hot_water_0_legionella_protection_datetime",
      "water",
    ),
    reg("number.curve", "mypyllant sys_circuit_0_heating_curve", "circuit"),
    reg("number.veto", "mypyllant_sys_zone_1_quick_veto_duration", "zone"),
    reg("binary_sensor.fault", "mypyllant_sys_home_control_error", "general"),
  ];
  const devices = [
    {
      id: "zone",
      name: "Home Zone 1 (Circuit 0)",
      identifiers: [["mypyllant", "sys_zone_1"]],
    },
    { id: "water", identifiers: [["mypyllant", "sys_domestic_hot_water_0"]] },
    { id: "circuit", identifiers: [["mypyllant", "sys_circuit_0"]] },
    { id: "general", identifiers: [["mypyllant", "sys_home"]] },
  ];
  const states = [
    state("climate.home", "auto", {
      temperature: 21,
      current_temperature: 20.5,
      min_temp: 5,
      max_temp: 30,
      target_temp_step: 0.5,
      hvac_modes: ["off", "heat", "auto"],
      supported_features: 1,
    }),
    state("water_heater.home", "auto", {
      temperature: 55,
      current_temperature: 48,
      min_temp: 35,
      max_temp: 65,
      supported_features: 1,
    }),
    state("switch.boost", "off"),
    state("datetime.legionella", "2026-09-12T10:00:00Z"),
    state("number.curve", "0.8", { min: 0.1, max: 5, step: 0.05 }),
    state("number.veto", "unavailable", {
      min: 0,
      max: 12,
      step: 0.5,
      unit_of_measurement: "h",
    }),
    state("binary_sensor.fault", "off"),
  ];
  return {
    language: "en",
    config: { unit_system: { temperature: "°C" } },
    states: Object.fromEntries(states.map((s) => [s.entity_id, s])),
    callService: vi.fn(async () => {}),
    connection: {
      connected: true,
      sendMessagePromise: vi.fn(
        async <T>(m: Record<string, unknown>) =>
          (m.type === "config/entity_registry/list"
            ? entities
            : m.type === "config/device_registry/list"
              ? devices
              : []) as T,
      ) as HomeAssistant["connection"]["sendMessagePromise"],
      subscribeEvents: vi.fn(async () => () => {}),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    },
  };
}
