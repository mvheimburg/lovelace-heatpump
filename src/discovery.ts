import {
  roles,
  type Registry,
  type HomeAssistant,
  type CardConfig,
  type Resolved,
  type Role,
  type RegistryEntity,
  type RegistryDevice,
} from "./types";
const domain = (e: RegistryEntity) => e.entity_id.split(".")[0];
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/_+$/, "");
const endings: Partial<Record<Role, string[]>> = {
  flow: ["flow_temperature"],
  flowTarget: ["flow_temperature_setpoint"],
  outdoor: ["outdoor_temperature"],
  pressure: ["water_pressure"],
  tank: ["tank_temperature"],
  waterTarget: ["set_point"],
  boost: ["boost_switch", "boost"],
  legionella: [
    "legionella_protection_datetime",
    "legionella_protection_temperature_reached",
  ],
  quickVeto: ["quick_veto_duration"],
  curve: ["heating_curve"],
  minFlow: ["min_flow_temperature_setpoint"],
  trouble: ["trouble_codes", "control_error"],
  heatingElectric: ["consumed_electrical_energy_heating"],
  heatingHeat: ["heat_generated_heating"],
  heatingEnvironment: ["earned_environment_energy_heating"],
  waterElectric: [
    "consumed_electrical_energy_domestic_hot_water",
    "consumed_electrical_energy_hot_water",
  ],
  waterHeat: ["heat_generated_domestic_hot_water", "heat_generated_hot_water"],
  waterEnvironment: [
    "earned_environment_energy_domestic_hot_water",
    "earned_environment_energy_hot_water",
  ],
};
const roleDomain = (role: Role) =>
  role === "climate"
    ? "climate"
    : role === "water"
      ? "water_heater"
      : role === "boost"
        ? "switch"
        : role === "trouble"
          ? "binary_sensor"
          : ["curve", "minFlow", "quickVeto"].includes(role)
            ? "number"
            : role === "legionella"
              ? "datetime"
              : "sensor";
function score(
  e: RegistryEntity,
  role: Role,
  states: HomeAssistant["states"],
): number {
  if (domain(e) !== roleDomain(role)) return 0;
  if (
    role === "flowTarget" &&
    [e.unique_id, e.original_name ?? "", e.entity_id].some((id) =>
      slug(id).endsWith("_min_flow_temperature_setpoint"),
    )
  )
    return 0;
  if (role === "climate" || role === "water") return 10;
  const tails = endings[role] ?? [];
  if (tails.some((t) => slug(e.unique_id).endsWith("_" + t))) return 30;
  if (tails.some((t) => slug(e.original_name ?? "").endsWith("_" + t)))
    return 20;
  if (tails.some((t) => e.entity_id.endsWith("_" + t))) return 10;
  const cls =
    e.device_class ??
    e.original_device_class ??
    states[e.entity_id]?.attributes.device_class;
  if (role === "pressure" && cls === "pressure") return 5;
  return 0;
}
const identity = (d?: RegistryDevice) =>
  d?.identifiers?.find(([p]) => p === "mypyllant")?.[1];
const system = (d?: RegistryDevice) =>
  identity(d)?.replace(
    /_(?:zone_\d+|circuit_\d+|domestic_hot_water_\d+|device_.+|home|system)$/,
    "",
  );
const numericSort = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true });
export interface Discovery {
  roles: Resolved;
  ambiguous: Role[];
  error?: string;
  entry?: string;
}
export function discover(
  registry: Registry,
  states: HomeAssistant["states"],
  config: CardConfig,
): Discovery {
  const result: Discovery = { roles: {}, ambiguous: [] };
  const devices = new Map(registry.devices.map((d) => [d.id, d]));
  const eligible = registry.entities.filter(
    (e) =>
      e.platform === "mypyllant" &&
      !e.disabled_by &&
      !devices.get(e.device_id ?? "")?.disabled_by,
  );
  const zoneClimate = (e: RegistryEntity) =>
    domain(e) === "climate" &&
    (/_zone_\d+$/.test(identity(devices.get(e.device_id ?? "")) ?? "") ||
      /_zone_\d+_climate$/.test(e.unique_id));
  const anchor = config.entity
    ? eligible.find((e) => e.entity_id === config.entity && zoneClimate(e))
    : undefined;
  if (config.entity && !anchor) return { ...result, error: "invalidAnchor" };
  if (anchor && config.entry && config.entry !== anchor.config_entry_id)
    return { ...result, error: "invalidAnchor" };
  const entries = [
    ...new Set(eligible.map((e) => e.config_entry_id).filter(Boolean)),
  ];
  const entry =
    config.entry ??
    anchor?.config_entry_id ??
    (entries.length === 1 ? entries[0] : undefined);
  if (!entry) return { ...result, error: "chooseEntry" };
  result.entry = entry;
  let candidates = eligible.filter((e) => e.config_entry_id === entry);
  if (!candidates.length) return { ...result, error: "noEntities" };
  const climates = candidates
    .filter(zoneClimate)
    .sort((a, b) => numericSort(a.unique_id, b.unique_id));
  const climate = anchor ?? climates[0];
  const deviceFor = (e?: RegistryEntity) => devices.get(e?.device_id ?? "");
  const systemId =
    system(deviceFor(climate)) ??
    system(
      deviceFor(
        candidates
          .slice()
          .sort((a, b) => numericSort(a.unique_id, b.unique_id))[0],
      ),
    );
  if (systemId)
    candidates = candidates.filter(
      (e) => !system(deviceFor(e)) || system(deviceFor(e)) === systemId,
    );
  const circuitAttribute = climate
    ? states[climate.entity_id]?.attributes.associated_circuit_index
    : undefined;
  const circuitFromName = (
    deviceFor(climate)?.name ??
    climate?.original_name ??
    climate?.entity_id ??
    ""
  ).match(/circuit[ _](\d+)/i)?.[1];
  const circuitIndex =
    typeof circuitAttribute === "number"
      ? String(circuitAttribute)
      : circuitFromName;
  const circuits = registry.devices
    .filter(
      (d) => system(d) === systemId && /_circuit_\d+$/.test(identity(d) ?? ""),
    )
    .sort((a, b) => numericSort(identity(a) ?? "", identity(b) ?? ""));
  const circuit =
    circuitIndex !== undefined
      ? circuits.find((d) => identity(d)?.endsWith("_circuit_" + circuitIndex))
      : circuits[0];
  const water = candidates
    .filter((e) => domain(e) === "water_heater")
    .sort((a, b) => numericSort(a.unique_id, b.unique_id))[0];
  const waterDevice =
    water?.device_id ??
    registry.devices
      .filter(
        (d) =>
          system(d) === systemId &&
          /_domestic_hot_water_\d+$/.test(identity(d) ?? ""),
      )
      .sort((a, b) => numericSort(identity(a) ?? "", identity(b) ?? ""))[0]?.id;
  const energyRoles = roles.filter((r) =>
    /^(heating|water)(Electric|Heat|Environment)$/.test(r),
  );
  let energyDevices = [
    ...new Set(
      candidates
        .filter((e) => energyRoles.some((r) => score(e, r, states) > 0))
        .map((e) => e.device_id),
    ),
  ];
  const pumps = energyDevices.filter((id) =>
    /flexo|aro|verso|heat.?pump/i.test(devices.get(id ?? "")?.model ?? ""),
  );
  if (pumps.length === 1) energyDevices = pumps;
  for (const role of roles) {
    const override = config.entities?.[role];
    if (override) {
      const chosen = candidates.find(
        (e) => e.entity_id === override && domain(e) === roleDomain(role),
      );
      if (chosen) result.roles[role] = chosen;
      else result.ambiguous.push(role);
      continue;
    }
    let pool = candidates;
    if (role === "climate") pool = climate ? [climate] : [];
    if (role === "quickVeto")
      pool = pool.filter((e) => e.device_id === climate?.device_id);
    if (["flow", "flowTarget", "curve", "minFlow"].includes(role))
      pool = pool.filter((e) => circuit && e.device_id === circuit.id);
    if (["water", "tank", "waterTarget", "boost", "legionella"].includes(role))
      pool = pool.filter((e) => waterDevice && e.device_id === waterDevice);
    if (energyRoles.includes(role)) {
      if (energyDevices.length > 1) {
        result.ambiguous.push(role);
        continue;
      }
      pool = pool.filter((e) => e.device_id === energyDevices[0]);
    }
    const scored = pool
      .map((e) => ({ e, score: score(e, role, states) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    if (
      scored.length &&
      (scored.length === 1 ||
        (!energyRoles.includes(role) && scored[0].score > scored[1].score))
    )
      result.roles[role] = scored[0].e;
    else if (scored.length) result.ambiguous.push(role);
  }
  return result;
}
