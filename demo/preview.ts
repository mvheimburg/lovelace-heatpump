import "../src/heatpump-card";
import type { HeatpumpCard } from "../src/heatpump-card";
import type {
  HomeAssistant,
  RegistryEntity,
  RegistryDevice,
  HassEntity,
  Statistics,
} from "../src/types";
const HOUR = 3600000,
  end = Math.floor(Date.now() / HOUR) * HOUR,
  start = end - 168 * HOUR;
const entities: RegistryEntity[] = [],
  states: Record<string, HassEntity> = {};
const devices: RegistryDevice[] = [
  {
    id: "zone",
    name: "Huset Zone 1 (Circuit 0)",
    identifiers: [["mypyllant", "home_zone_1"]],
  },
  { id: "water", identifiers: [["mypyllant", "home_domestic_hot_water_0"]] },
  { id: "circuit", identifiers: [["mypyllant", "home_circuit_0"]] },
  { id: "general", identifiers: [["mypyllant", "home_home"]] },
  {
    id: "pump",
    model: "flexoCOMPACT exclusiv",
    identifiers: [["mypyllant", "home_device_uuid"]],
  },
];
function add(
  id: string,
  unique: string,
  device: string,
  value: string,
  attributes: Record<string, unknown> = {},
) {
  entities.push({
    entity_id: id,
    unique_id: unique,
    platform: "mypyllant",
    config_entry_id: "preview",
    device_id: device,
  });
  states[id] = {
    entity_id: id,
    state: value,
    attributes,
    last_updated: new Date().toISOString(),
  };
}
add("climate.home", "mypyllant_home_zone_1_climate", "zone", "auto", {
  temperature: 21,
  current_temperature: 20.7,
  min_temp: 5,
  max_temp: 30,
  target_temp_step: 0.5,
  hvac_modes: ["off", "heat", "auto"],
  supported_features: 1,
});
add(
  "water_heater.home",
  "mypyllant_home_domestic_hot_water_0_base",
  "water",
  "auto",
  {
    current_temperature: 48,
    temperature: 55,
    min_temp: 35,
    max_temp: 65,
    supported_features: 1,
  },
);
add(
  "switch.boost",
  "mypyllant_home_domestic_hot_water_0_boost_switch",
  "water",
  "off",
);
add(
  "datetime.legionella",
  "mypyllant_home_domestic_hot_water_0_legionella_protection_datetime",
  "water",
  new Date(Date.now() - 6 * 86400000).toISOString(),
);
add(
  "sensor.flow",
  "mypyllant_home_circuit_0_flow_temperature",
  "circuit",
  "32.4",
  { unit_of_measurement: "°C" },
);
add(
  "sensor.flow_target",
  "mypyllant_home_circuit_0_flow_temperature_setpoint",
  "circuit",
  "33",
  { unit_of_measurement: "°C" },
);
add(
  "sensor.outdoor",
  "mypyllant_home_home_outdoor_temperature",
  "general",
  "3.2",
  { unit_of_measurement: "°C", device_class: "temperature" },
);
add("sensor.pressure", "mypyllant_home_home_water_pressure", "general", "1.6", {
  unit_of_measurement: "bar",
  device_class: "pressure",
});
add(
  "binary_sensor.trouble",
  "mypyllant_home_home_control_error",
  "general",
  "off",
  { diagnostic_trouble_codes: ["F.22 · Low water pressure"] },
);
states["switch.cooling"] = {
  entity_id: "switch.cooling",
  state: "off",
  attributes: {},
  last_updated: new Date().toISOString(),
};
const stats: Statistics = { "sensor.outdoor": [] };
for (const mode of ["heating", "water"])
  for (const kind of ["Electric", "Heat", "Environment"]) {
    const suffix = `${{ Electric: "consumed_electrical_energy", Heat: "heat_generated", Environment: "earned_environment_energy" }[kind]}_${mode === "water" ? "domestic_hot_water" : "heating"}`;
    const id = `sensor.${suffix}`,
      unique = `mypyllant_home_${suffix}`;
    add(id, unique, "pump", "120", {
      unit_of_measurement: "kWh",
      device_class: "energy",
    });
    const key = `mypyllant:${unique}`;
    stats[key] = [];
    let sum = 0;
    for (let i = -1; i < 168; i++) {
      const temperature = 2 + 6 * Math.sin(i * 0.08);
      const cop =
        (mode === "water" ? 2.1 : 3.4) +
        temperature * 0.055 +
        Math.sin(i * 2) * 0.25;
      const electric =
        (mode === "water" ? 0.15 : 0.8) + Math.sin(i * 0.05) * 0.1;
      sum +=
        kind === "Electric"
          ? electric
          : kind === "Heat"
            ? electric * cop
            : electric * (cop - 1);
      stats[key].push({ start: start + i * HOUR, sum });
    }
  }
for (let i = 0; i < 168; i++)
  stats["sensor.outdoor"].push({
    start: start + i * HOUR,
    mean: 2 + 6 * Math.sin(i * 0.08),
  });
const cards: HeatpumpCard[] = [];
const hass: HomeAssistant = {
  states,
  language: "en",
  config: { unit_system: { temperature: "°C" } },
  connection: {
    connected: true,
    addEventListener() {},
    removeEventListener() {},
    async subscribeEvents() {
      return () => {};
    },
    async sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T> {
      if (msg.type === "history/history_during_period") {
        const from = Date.parse(String(msg.start_time));
        const now = Date.now();
        return Object.fromEntries(
          (msg.entity_ids as string[]).map((id) => [
            id,
            Array.from({ length: 97 }, (_, i) => {
              const time = from + ((now - from) * i) / 96;
              const current = states[id];
              const base = Number(current?.state);
              const pressure =
                current?.attributes.unit_of_measurement === "bar";
              return {
                s:
                  i > 40 && i < 52
                    ? "unavailable"
                    : Number.isFinite(base)
                      ? String(base + Math.sin(i / 8) * (pressure ? 0.12 : 2))
                      : (current?.state ?? "unknown"),
                lu: time / 1000,
                a: current?.attributes,
              };
            }),
          ]),
        ) as T;
      }
      return (
        msg.type === "config/entity_registry/list"
          ? entities
          : msg.type === "config/device_registry/list"
            ? devices
            : msg.type === "recorder/get_statistics_metadata"
              ? Object.keys(stats).map((statistic_id) => ({
                  statistic_id,
                  has_sum: statistic_id !== "sensor.outdoor",
                  mean_type: statistic_id === "sensor.outdoor" ? 1 : 0,
                  statistics_unit_of_measurement:
                    statistic_id === "sensor.outdoor" ? "°C" : "kWh",
                }))
              : stats
      ) as T;
    },
  },
  async callService(_domain, service, data) {
    const e = states[data.entity_id as string];
    if (service === "turn_on" || service === "turn_off")
      e.state = service === "turn_on" ? "on" : "off";
    else if (service === "set_hvac_mode") e.state = String(data.hvac_mode);
    else if (data.temperature !== undefined)
      e.attributes.temperature = data.temperature;
    update();
  },
};
function update() {
  for (const c of cards) c.hass = { ...hass };
}
for (const [mode, mount] of [
  ["comfort", "daily"],
  ["water", "daily"],
  ["efficiency", "energy"],
] as const) {
  const c = document.createElement("heatpump-card") as HeatpumpCard;
  c.setConfig({
    type: "custom:heatpump-card",
    entity: "climate.home",
    mode,
    appearance: "bubble",
    cooling_entity: "switch.cooling",
    name:
      mode === "efficiency"
        ? "Where the warmth comes from"
        : mode === "water"
          ? "Ready for the evening"
          : "Home, just right",
  });
  c.hass = hass;
  document.querySelector("#" + mount)!.append(c);
  cards.push(c);
}
if (!customElements.get("ha-icon"))
  customElements.define(
    "ha-icon",
    class extends HTMLElement {
      connectedCallback() {
        this.textContent = "♨";
        this.style.fontSize = "24px";
      }
    },
  );
document.querySelector("#fault")!.addEventListener("click", () => {
  states["binary_sensor.trouble"].state =
    states["binary_sensor.trouble"].state === "on" ? "off" : "on";
  update();
});
let saved: Record<string, HassEntity> | undefined;
document.querySelector("#offline")!.addEventListener("click", () => {
  if (saved) {
    hass.states = saved;
    saved = undefined;
  } else {
    saved = hass.states;
    hass.states = Object.fromEntries(
      Object.entries(states).map(([id, e]) => [
        id,
        { ...e, state: "unavailable" },
      ]),
    );
  }
  update();
});
document
  .querySelector("#theme")!
  .addEventListener("click", () => document.body.classList.toggle("dark"));
document.querySelector("#language")!.addEventListener("click", () => {
  hass.language = hass.language === "en" ? "nb" : "en";
  update();
});
