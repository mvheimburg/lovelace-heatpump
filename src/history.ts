import type { Connection, HassEntity } from "./types";
import { loadSeries, type Series as SharedSeries } from "lovelace-card-history";
export { valueAt, ticks, isTemperature } from "lovelace-card-history";

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

/** Card roles retain their palette and setpoint semantics in the shared chart. */
export function sharedSeries(series: Series[]): SharedSeries[] {
  return series.map((s) => ({
    ...s,
    tag: s.role,
    color:
      s.role === "outdoor"
        ? 2
        : s.role === "pressure" || s.role === "waterCop"
          ? 3
          : s.role === "flowTarget" || s.role === "waterTarget"
            ? 1
            : 0,
    kind: s.role === "flowTarget" || s.role === "waterTarget" ? "step" : "line",
    states: [],
  }));
}

/** Keep raw recorder readings at every range, including attribute-based tank sensors. */
export async function loadHistory(
  connection: Connection,
  sources: Source[],
  states: Record<string, HassEntity>,
  hours: number,
  now = Date.now(),
): Promise<Series[]> {
  const loaded = await loadSeries(
    connection,
    sources.map((s) => ({
      ...s,
      tag: s.role,
      color: 0,
    })),
    states,
    hours,
    { now, statisticsFrom: 0 },
  );
  return loaded.map((s) => ({ ...s, role: s.tag! }));
}
