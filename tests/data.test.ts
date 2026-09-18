import { it, expect, vi } from "vitest";
import { loadEnergy, watchRegistry, invalidate } from "../src/data";
import type { Connection, RegistryEntity } from "../src/types";
import { START, HOUR, counter } from "./fixtures";
function connection(
  handler: (msg: Record<string, unknown>) => unknown,
): Connection {
  return {
    connected: true,
    sendMessagePromise: vi.fn(
      async <T>(m: Record<string, unknown>) => handler(m) as T,
    ) as Connection["sendMessagePromise"],
    subscribeEvents: vi.fn(async () => () => {}),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}
const e = (entity_id: string, unique_id: string): RegistryEntity => ({
  entity_id,
  unique_id,
  platform: "mypyllant",
  config_entry_id: "entry",
  device_id: "pump",
});
const electric = e("sensor.input", "mypyllant_SYS-UUID_0_0"),
  heat = e("sensor.output", "mypyllant_SYS-UUID_1_0");
const resolved = { heatingElectric: electric, heatingHeat: heat };
it("selects external statistics using unique IDs, normalizes units at the API and includes a baseline hour", async () => {
  const c = connection((m) => {
    if (m.type === "recorder/get_statistics_metadata")
      return [
        "mypyllant:mypyllant_sys_uuid_0_0",
        "mypyllant:mypyllant_sys_uuid_1_0",
      ].map((statistic_id) => ({
        statistic_id,
        has_sum: true,
        statistics_unit_of_measurement: "Wh",
      }));
    if (m.type === "recorder/statistics_during_period")
      return {
        "mypyllant:mypyllant_sys_uuid_0_0": counter(24, 1),
        "mypyllant:mypyllant_sys_uuid_1_0": counter(24, 3),
      };
    throw Error("unexpected command");
  });
  const result = await loadEnergy(c, resolved, "24h", START + 24 * HOUR);
  expect(result.heating?.cop).toBe(3);
  expect(result.sources.heating).toBe("external");
  expect(c.sendMessagePromise).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "recorder/statistics_during_period",
      start_time: new Date(START - HOUR).toISOString(),
      end_time: new Date(START + 24 * HOUR).toISOString(),
      units: { energy: "kWh", temperature: "°C" },
      types: ["sum", "mean"],
      period: "hour",
    }),
  );
});
it("falls back to recorder energy statistics and never selects a statistic with incompatible units", async () => {
  const c = connection((m) =>
    m.type === "recorder/get_statistics_metadata"
      ? [
          {
            statistic_id: "sensor.input",
            has_sum: true,
            statistics_unit_of_measurement: "kWh",
          },
          {
            statistic_id: "sensor.output",
            has_sum: true,
            statistics_unit_of_measurement: "kWh",
          },
          {
            statistic_id: "mypyllant:mypyllant_sys_uuid_0_0",
            has_sum: true,
            statistics_unit_of_measurement: "m³",
          },
        ]
      : { "sensor.input": counter(24, 1), "sensor.output": counter(24, 4) },
  );
  const r = await loadEnergy(c, resolved, "24h", START + 24 * HOUR);
  expect(r.heating?.cop).toBe(4);
  expect(r.sources.heating).toBe("recorder");
});
it("coalesces in-flight requests but retries failures and invalidates on reconnect", async () => {
  let fails = true;
  const c = connection(() => {
    if (fails) throw Error("offline");
    return [];
  });
  await expect(loadEnergy(c, resolved, "7d", START)).rejects.toThrow("offline");
  fails = false;
  await Promise.all([
    loadEnergy(c, resolved, "7d", START),
    loadEnergy(c, resolved, "7d", START),
  ]);
  expect(c.sendMessagePromise).toHaveBeenCalledTimes(2);
  invalidate(c);
  await loadEnergy(c, resolved, "7d", START);
  expect(c.sendMessagePromise).toHaveBeenCalledTimes(3);
});
it("unsubscribes even if the card leaves before subscribeEvents resolves", async () => {
  const listeners = new Map<string, () => void>();
  const unsubscribe = vi.fn();
  let resolve!: (value: () => void) => void;
  const c = connection((m) =>
    m.type === "config/entity_registry/list" ? [] : [],
  );
  c.addEventListener = (event, cb) => {
    listeners.set(event, cb);
  };
  c.removeEventListener = (event) => {
    listeners.delete(event);
  };
  c.subscribeEvents = () =>
    new Promise((r) => {
      resolve = r;
    });
  const changes = vi.fn();
  const stop = watchRegistry(c, changes);
  await vi.waitFor(() => expect(resolve).toBeDefined());
  stop();
  resolve(unsubscribe);
  await vi.waitFor(() => expect(unsubscribe).toHaveBeenCalled());
  expect(listeners.size).toBe(0);
});
