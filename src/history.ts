import type { Connection, HassEntity } from "./types";
import { available, numeric } from "./readings";

/** Time (ms) and value; `undefined` breaks the line (unavailable). */
export type Point = [number, number | undefined];
export interface Series {
  /** A card role, or a derived line such as `heatingCop`. */
  role: string;
  entityId: string;
  unit: string;
  points: Point[];
}
/** An entity's state, or one of its attributes (a water heater's temperatures). */
export interface Source {
  role: string;
  entityId: string;
  attribute?: string;
  unit?: string;
}
/** Readings over hours; COP, being daily, over days (all in hours). */
export type HistoryGroup = "readings" | "water" | "cop";
export const RANGES: Record<HistoryGroup, number[]> = {
  readings: [6, 24, 168],
  water: [6, 24, 168],
  cop: [168, 720, 2160],
};
export const DEFAULT_RANGE: Record<HistoryGroup, number> = {
  readings: 24,
  water: 24,
  cop: 720,
};

/** Home Assistant's compressed history row. */
interface Row {
  s: string;
  a?: Record<string, unknown>;
  lu?: number;
  lc?: number;
}

/**
 * The history of each role's entity over the last `hours`, from Home
 * Assistant's recorder, ending with the current state.
 */
export async function loadHistory(
  connection: Connection,
  sources: Source[],
  states: Record<string, HassEntity>,
  hours: number,
  now = Date.now(),
): Promise<Series[]> {
  const start = now - hours * 3_600_000;
  // Attribute sources need attributes on every row; the others do not.
  const ask = (list: Source[], attributes: boolean) =>
    list.length
      ? connection.sendMessagePromise<Record<string, Row[]>>({
          type: "history/history_during_period",
          start_time: new Date(start).toISOString(),
          entity_ids: [...new Set(list.map((s) => s.entityId))],
          minimal_response: !attributes,
          no_attributes: !attributes,
          significant_changes_only: false,
        })
      : Promise.resolve({} as Record<string, Row[]>);
  const [withAttributes, plain] = await Promise.all([
    ask(
      sources.filter((s) => s.attribute),
      true,
    ),
    ask(
      sources.filter((s) => !s.attribute),
      false,
    ),
  ]);
  const read = (
    source: Source,
    state: string,
    attributes?: Record<string, unknown>,
  ) =>
    ["unavailable", "unknown", ""].includes(state)
      ? undefined
      : numeric(source.attribute ? attributes?.[source.attribute] : state);
  return sources.map((source) => {
    const current = states[source.entityId];
    const rows = (source.attribute ? withAttributes : plain)[source.entityId];
    const points: Point[] = (rows ?? []).map((row) => [
      Math.max(start, (row.lu ?? row.lc ?? 0) * 1000),
      read(source, row.s, row.a),
    ]);
    if (current)
      points.push([
        now,
        available(current)
          ? read(source, current.state, current.attributes)
          : undefined,
      ]);
    return {
      role: source.role,
      entityId: source.entityId,
      unit:
        source.unit ?? String(current?.attributes.unit_of_measurement ?? ""),
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
