import { describe, it, expect } from "vitest";
import { discover } from "../src/discovery";
import { normalizeConfig } from "../src/config";
import type { Registry, RegistryEntity } from "../src/types";
export const entity = (
  id: string,
  unique: string,
  device = "zone",
  entry = "home",
): RegistryEntity => ({
  entity_id: id,
  unique_id: unique,
  device_id: device,
  config_entry_id: entry,
  platform: "mypyllant",
});
const registry = (): Registry => ({
  devices: [
    { id: "zone", identifiers: [["mypyllant", "sys_zone_1"]] },
    { id: "circuit", identifiers: [["mypyllant", "sys_circuit_0"]] },
    { id: "water", identifiers: [["mypyllant", "sys_domestic_hot_water_0"]] },
    {
      id: "pump",
      model: "flexoCOMPACT exclusiv",
      identifiers: [["mypyllant", "sys_device_uuid"]],
    },
  ],
  entities: [
    entity("climate.renamed", "mypyllant_sys_zone_1_climate"),
    entity(
      "sensor.teknisk_heating_circuit_huset_circuit_0_flow_temperature_setpoint",
      "mypyllant_sys_circuit_0_flow_temperature_setpoint",
      "circuit",
    ),
    entity(
      "number.renamed_curve",
      "mypyllant sys_circuit_0_heating_curve",
      "circuit",
    ),
    entity(
      "switch.renamed_boost",
      "mypyllant_sys_domestic_hot_water_0_boost_switch",
      "water",
    ),
    {
      ...entity("sensor.renamed_energy", "mypyllant_sys_uuid_0_0", "pump"),
      original_name:
        "Huset Device 0 flexoCOMPACT exclusiv Consumed Electrical Energy Heating",
    },
    entity(
      "sensor.other_consumed_electrical_energy_heating",
      "other",
      "other",
      "other",
    ),
  ],
});
describe("entry-scoped discovery", () => {
  it("uses registry identity and original names despite renames and area prefixes", () => {
    const r = discover(
      registry(),
      {},
      normalizeConfig({
        type: "custom:heatpump-card",
        entity: "climate.renamed",
      }),
    );
    expect(r.roles.flowTarget?.entity_id).toContain("teknisk_");
    expect(r.roles.curve?.entity_id).toBe("number.renamed_curve");
    expect(r.roles.boost?.entity_id).toBe("switch.renamed_boost");
    expect(r.roles.heatingElectric?.entity_id).toBe("sensor.renamed_energy");
  });
  it("refuses to infer an entry when there are multiple installations", () => {
    expect(
      discover(
        registry(),
        {},
        normalizeConfig({ type: "custom:heatpump-card" }),
      ).error,
    ).toBe("chooseEntry");
  });
  it("rejects an anchor from another platform and cross-entry overrides", () => {
    const r = registry();
    r.entities[0].platform = "generic";
    expect(
      discover(
        r,
        {},
        normalizeConfig({
          type: "custom:heatpump-card",
          entity: "climate.renamed",
        }),
      ).error,
    ).toBe("invalidAnchor");
    expect(
      discover(
        registry(),
        {},
        normalizeConfig({
          type: "custom:heatpump-card",
          entry: "home",
          entities: {
            heatingElectric: "sensor.other_consumed_electrical_energy_heating",
          },
        }),
      ).roles.heatingElectric,
    ).toBeUndefined();
  });
  it("does not resolve a disabled entity or select arbitrarily among energy meters", () => {
    const r = registry();
    r.entities[2].disabled_by = "user";
    r.entities.push(
      entity(
        "sensor.second_consumed_electrical_energy_heating",
        "another",
        "pump",
      ),
    );
    const found = discover(
      r,
      {},
      normalizeConfig({ type: "custom:heatpump-card", entry: "home" }),
    );
    expect(found.roles.curve).toBeUndefined();
    expect(found.roles.heatingElectric).toBeUndefined();
    expect(found.ambiguous).toContain("heatingElectric");
  });
  it("selects the associated circuit without leaking a second system in the same entry", () => {
    const r = registry();
    r.devices.push(
      { id: "circuit2", identifiers: [["mypyllant", "sys_circuit_2"]] },
      {
        id: "alien",
        identifiers: [["mypyllant", "else_domestic_hot_water_0"]],
      },
    );
    r.entities.push(
      entity(
        "sensor.circuit_2_flow_temperature",
        "mypyllant_sys_circuit_2_flow_temperature",
        "circuit2",
      ),
      entity(
        "switch.alien_boost",
        "mypyllant_else_domestic_hot_water_0_boost_switch",
        "alien",
      ),
    );
    const found = discover(
      r,
      {
        "climate.renamed": {
          entity_id: "climate.renamed",
          state: "auto",
          attributes: { associated_circuit_index: 2 },
        },
      },
      normalizeConfig({
        type: "custom:heatpump-card",
        entity: "climate.renamed",
      }),
    );
    expect(found.roles.flow?.entity_id).toBe(
      "sensor.circuit_2_flow_temperature",
    );
    expect(found.roles.flowTarget).toBeUndefined();
    expect(found.roles.boost?.entity_id).toBe("switch.renamed_boost");
  });
});
it("rejects invalid configuration instead of silently enabling controls", () => {
  expect(() =>
    normalizeConfig({
      type: "custom:heatpump-card",
      cop_window: "1y",
    } as never),
  ).toThrow();
  expect(() =>
    normalizeConfig({
      type: "custom:heatpump-card",
      allow_curve_edit: "false",
    } as never),
  ).toThrow();
  expect(() =>
    normalizeConfig({
      type: "custom:heatpump-card",
      legionella_interval_days: 0,
    }),
  ).toThrow();
});
it("keeps minimum flow and requested flow distinct when both sensors exist", () => {
  const r: Registry = {
    devices: [{ id: "circuit", identifiers: [["mypyllant", "sys_circuit_0"]] }],
    entities: [
      entity(
        "sensor.minimum",
        "mypyllant_sys_circuit_0_min_flow_temperature_setpoint",
        "circuit",
      ),
      entity(
        "sensor.desired",
        "mypyllant_sys_circuit_0_flow_temperature_setpoint",
        "circuit",
      ),
    ],
  };
  expect(
    discover(
      r,
      {},
      normalizeConfig({ type: "custom:heatpump-card", entry: "home" }),
    ).roles.flowTarget?.entity_id,
  ).toBe("sensor.desired");
  r.entities.pop();
  expect(
    discover(
      r,
      {},
      normalizeConfig({ type: "custom:heatpump-card", entry: "home" }),
    ).roles.flowTarget,
  ).toBeUndefined();
});
it("selects a heating zone instead of Ambisense or ventilation climate entities", () => {
  const r: Registry = {
    devices: [
      { id: "room", identifiers: [["mypyllant", "sys_room_0"]] },
      { id: "zone", identifiers: [["mypyllant", "sys_zone_1"]] },
    ],
    entities: [
      entity("climate.room", "mypyllant_sys_room_0_climate", "room"),
      entity("climate.zone", "mypyllant_sys_zone_1_climate", "zone"),
    ],
  };
  expect(
    discover(
      r,
      {},
      normalizeConfig({ type: "custom:heatpump-card", entry: "home" }),
    ).roles.climate?.entity_id,
  ).toBe("climate.zone");
  expect(
    discover(
      r,
      {},
      normalizeConfig({ type: "custom:heatpump-card", entity: "climate.room" }),
    ).error,
  ).toBe("invalidAnchor");
});
