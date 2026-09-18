import type {
  Connection,
  Resolved,
  Window,
  Registry,
  RegistryEntity,
  Metadata,
  Statistics,
  Role,
} from "./types";
import { HOUR, summarize, windowRange, type Summary } from "./energy";
export interface EnergyData {
  heating?: Summary;
  water?: Summary;
  sources: Partial<Record<"heating" | "water", "external" | "recorder">>;
  start: number;
  end: number;
}
export interface RegistryState {
  loading?: boolean;
  registry?: Registry;
  error?: string;
  disconnected?: boolean;
}
const cache = new WeakMap<
  Connection,
  Map<string, { expires: number; promise: Promise<EnergyData> }>
>();
export function invalidate(c: Connection): void {
  cache.delete(c);
}
const external = (e: RegistryEntity) =>
  `mypyllant:${e.unique_id}`.toLowerCase().replace(/-/g, "_");
const energyRoles: Role[] = [
  "heatingElectric",
  "heatingHeat",
  "heatingEnvironment",
  "waterElectric",
  "waterHeat",
  "waterEnvironment",
];
const energyUnit = (m: Metadata) =>
  m.has_sum &&
  ["Wh", "kWh", "MWh", "GJ", "MJ", "J"].includes(
    m.statistics_unit_of_measurement ?? m.unit_of_measurement ?? "",
  );
async function fetchEnergy(
  c: Connection,
  roles: Resolved,
  window: Window,
  now: number,
): Promise<EnergyData> {
  const range = windowRange(window, now),
    result: EnergyData = { ...range, sources: {} };
  const requested = energyRoles.flatMap((r) =>
    roles[r] ? [external(roles[r]!), roles[r]!.entity_id] : [],
  );
  if (roles.outdoor) requested.push(roles.outdoor.entity_id);
  if (!requested.length) return result;
  const metadata = await c.sendMessagePromise<Metadata[]>({
    type: "recorder/get_statistics_metadata",
    statistic_ids: [...new Set(requested)],
  });
  const valid = metadata.filter(
    (m) =>
      energyUnit(m) ||
      ((m.mean_type === 1 || m.has_mean) &&
        ["°C", "°F", "K"].includes(
          m.statistics_unit_of_measurement ?? m.unit_of_measurement ?? "",
        )),
  );
  const ids = new Set(valid.map((m) => m.statistic_id));
  if (!ids.size) return result;
  const stats = await c.sendMessagePromise<Statistics>({
    type: "recorder/statistics_during_period",
    start_time: new Date(range.start - HOUR).toISOString(),
    end_time: new Date(range.end).toISOString(),
    statistic_ids: [...ids],
    period: "hour",
    types: ["sum", "mean"],
    units: { energy: "kWh", temperature: "°C" },
  });
  for (const mode of ["heating", "water"] as const) {
    const electric = roles[`${mode}Electric`],
      heat = roles[`${mode}Heat`],
      environment = roles[`${mode}Environment`];
    if (!electric || !heat) continue;
    if (electric.device_id !== heat.device_id) continue;
    const supports = (id: string) =>
      valid.some((m) => m.statistic_id === id && energyUnit(m));
    const ext = [external(electric), external(heat)];
    const useExternal = ext.every(
      (id) => supports(id) && (stats[id]?.length ?? 0) > 1,
    );
    const idFor = (e: RegistryEntity) =>
      useExternal ? external(e) : e.entity_id;
    if (![electric, heat].every((e) => supports(idFor(e)))) continue;
    result.sources[mode] = useExternal ? "external" : "recorder";
    result[mode] = summarize(
      {
        electric: stats[idFor(electric)] ?? [],
        heat: stats[idFor(heat)] ?? [],
        environment:
          environment &&
          environment.device_id === electric.device_id &&
          supports(idFor(environment))
            ? stats[idFor(environment)]
            : undefined,
        outdoor: roles.outdoor ? stats[roles.outdoor.entity_id] : undefined,
      },
      range.start,
      range.end,
    );
  }
  return result;
}
export function loadEnergy(
  c: Connection,
  roles: Resolved,
  window: Window,
  now = Date.now(),
): Promise<EnergyData> {
  let items = cache.get(c);
  if (!items) {
    items = new Map();
    cache.set(c, items);
  }
  const key = JSON.stringify([
    window,
    windowRange(window, now).end,
    Object.entries(roles)
      .filter(([r]) => energyRoles.includes(r as Role) || r === "outdoor")
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([r, e]) => [r, e.entity_id, e.unique_id, e.device_id]),
  ]);
  const found = items.get(key);
  if (found && found.expires > Date.now()) return found.promise;
  for (const [id, value] of items)
    if (value.expires <= Date.now()) items.delete(id);
  const promise = fetchEnergy(c, roles, window, now).catch((error) => {
    items.delete(key);
    throw error;
  });
  items.set(key, { expires: Date.now() + 300_000, promise });
  return promise;
}
export function watchRegistry(
  c: Connection,
  cb: (state: RegistryState) => void,
): () => void {
  let active = true,
    epoch = 0;
  const subscriptions: (() => void)[] = [];
  const refresh = async () => {
    const ticket = ++epoch;
    invalidate(c);
    cb({ disconnected: !c.connected, loading: c.connected });
    if (!c.connected) return;
    try {
      const [entities, devices] = await Promise.all([
        c.sendMessagePromise<Registry["entities"]>({
          type: "config/entity_registry/list",
        }),
        c.sendMessagePromise<Registry["devices"]>({
          type: "config/device_registry/list",
        }),
      ]);
      if (active && ticket === epoch) cb({ registry: { entities, devices } });
    } catch (error) {
      if (active && ticket === epoch) cb({ error: String(error) });
    }
  };
  const disconnected = () => {
    epoch++;
    invalidate(c);
    if (active) cb({ disconnected: true });
  };
  const ready = () => {
    void refresh();
  };
  c.addEventListener("ready", ready);
  c.addEventListener("disconnected", disconnected);
  for (const event of ["entity_registry_updated", "device_registry_updated"]) {
    void c
      .subscribeEvents(ready, event)
      .then((unsub) => {
        if (active) subscriptions.push(unsub);
        else unsub();
      })
      .catch((error) => {
        if (active) cb({ error: String(error) });
      });
  }
  void refresh();
  return () => {
    active = false;
    epoch++;
    subscriptions.forEach((unsub) => unsub());
    c.removeEventListener("ready", ready);
    c.removeEventListener("disconnected", disconnected);
  };
}
