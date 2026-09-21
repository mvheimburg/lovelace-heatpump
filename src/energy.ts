import type { Statistic, Window } from "./types";
export const HOUR = 3_600_000;
/**
 * An hour's COP point needs at least this much electricity; in standby hours
 * a trickle of input makes the ratio meaningless (e.g. 54). Totals keep them.
 */
export const MIN_POINT_KWH = 0.05;
export interface Series {
  electric: Statistic[];
  heat: Statistic[];
  environment?: Statistic[];
  outdoor?: Statistic[];
}
export interface Summary {
  electric?: number;
  heat?: number;
  environment?: number;
  cop?: number;
  coverage: number;
  status: "missing" | "idle" | "ready" | "noInput";
  points: { start: number; temperature: number; cop: number }[];
}
export function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
// HA statistics timestamps are milliseconds. Never bridge a missing hourly bucket.
function deltas(
  rows: Statistic[],
  start: number,
  end: number,
): Map<number, number> {
  const sums = new Map(
    rows
      .filter((p) => finite(p.start) && finite(p.sum))
      .map((p) => [p.start, p.sum!]),
  );
  const output = new Map<number, number>();
  for (const [time, sum] of sums) {
    const previous = sums.get(time - HOUR);
    if (
      time >= start &&
      time + HOUR <= end &&
      previous !== undefined &&
      sum >= previous
    )
      output.set(time, sum - previous);
  }
  return output;
}
export function summarize(series: Series, start: number, end: number): Summary {
  const electricity = deltas(series.electric, start, end),
    heat = deltas(series.heat, start, end),
    environment = deltas(series.environment ?? [], start, end);
  const outdoor = new Map(
    (series.outdoor ?? [])
      .filter((p) => finite(p.mean))
      .map((p) => [p.start, p.mean!]),
  );
  const result: Summary = { coverage: 0, status: "missing", points: [] };
  let electricTotal = 0,
    heatTotal = 0,
    environmentTotal = 0,
    count = 0,
    environmentCount = 0;
  for (const [time, electric] of electricity) {
    const generated = heat.get(time);
    if (generated === undefined) continue;
    electricTotal += electric;
    heatTotal += generated;
    count++;
    const harvested = environment.get(time);
    if (harvested !== undefined) {
      environmentTotal += harvested;
      environmentCount++;
    }
    const temperature = outdoor.get(time);
    if (
      temperature !== undefined &&
      electric >= MIN_POINT_KWH &&
      Number.isFinite(generated / electric)
    )
      result.points.push({
        start: time,
        temperature,
        cop: generated / electric,
      });
  }
  if (!count) return result;
  result.electric = electricTotal;
  result.heat = heatTotal;
  if (environmentCount === count) result.environment = environmentTotal;
  result.coverage = Math.min(1, count / ((end - start) / HOUR));
  result.status =
    electricTotal > 0 ? "ready" : heatTotal > 0 ? "noInput" : "idle";
  if (electricTotal > 0 && Number.isFinite(heatTotal / electricTotal))
    result.cop = heatTotal / electricTotal;
  return result;
}
export function windowRange(
  window: Window,
  now = Date.now(),
): { start: number; end: number } {
  const end = Math.floor(now / HOUR) * HOUR;
  return {
    start: end - { "24h": 24, "7d": 168, "30d": 720 }[window] * HOUR,
    end,
  };
}
