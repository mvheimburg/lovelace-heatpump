import type { Connection, HassEntity, Role } from "./types";
import { available, numeric } from "./readings";

/** Time (ms) and value; `undefined` breaks the line (unavailable). */
export type Point = [number, number | undefined];
export interface Series {
  role: Role;
  entityId: string;
  unit: string;
  points: Point[];
}
export const RANGES = [6, 24, 168] as const;
export type Range = (typeof RANGES)[number];

/** Home Assistant's compressed, minimal history row. */
interface Row {
  s: string;
  lu?: number;
  lc?: number;
}

/**
 * The history of each role's entity over the last `hours`, from Home
 * Assistant's recorder, ending with the current state.
 */
export async function loadHistory(
  connection: Connection,
  sources: Array<{ role: Role; entityId: string }>,
  states: Record<string, HassEntity>,
  hours: number,
  now = Date.now(),
): Promise<Series[]> {
  const start = now - hours * 3_600_000;
  const reply = sources.length
    ? await connection.sendMessagePromise<Record<string, Row[]>>({
        type: "history/history_during_period",
        start_time: new Date(start).toISOString(),
        entity_ids: [...new Set(sources.map((s) => s.entityId))],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      })
    : {};
  const value = (state: string) =>
    ["unavailable", "unknown", ""].includes(state) ? undefined : numeric(state);
  return sources.map(({ role, entityId }) => {
    const current = states[entityId];
    const points: Point[] = (reply[entityId] ?? []).map((row) => [
      Math.max(start, (row.lu ?? row.lc ?? 0) * 1000),
      value(row.s),
    ]);
    if (current)
      points.push([now, available(current) ? value(current.state) : undefined]);
    return {
      role,
      entityId,
      unit: String(current?.attributes.unit_of_measurement ?? ""),
      points,
    };
  });
}

/** The value in force at `time`: the last point at or before it. */
export function valueAt(series: Series, time: number): number | undefined {
  let value: number | undefined;
  for (const [t, v] of series.points) {
    if (t > time) break;
    value = v;
  }
  return value;
}

/** Round-number ticks covering [min, max], about `count` of them. */
export function ticks(min: number, max: number, count = 4): number[] {
  const raw = (max - min) / count || 1;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step =
    [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= raw) ??
    10 * power;
  const out: number[] = [];
  // From the step at or below min up to the first step at or above max.
  for (let v = Math.floor(min / step) * step; ; v += step) {
    out.push(Number(v.toFixed(6)));
    if (v >= max - 1e-9) break;
  }
  return out;
}

export const isTemperature = (unit: string) => ["°C", "°F", "K"].includes(unit);
