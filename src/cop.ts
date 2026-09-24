import type { Connection } from "./types";
import type { EnergyData } from "./data";
import type { Point, Series } from "./history";

interface Row {
  start: number;
  change?: number | null;
  mean?: number | null;
}
/** Below this much electricity a day's COP is noise, not efficiency. */
const MIN_KWH = 0.1;
const DAY = 86_400_000;

/**
 * Daily COP (heat out ÷ electricity in) for heating and hot water, from the
 * same statistics as the card's efficiency summary, with the day's mean
 * outdoor temperature. A day without enough electricity is a gap.
 */
export async function loadCop(
  connection: Connection,
  energy: EnergyData,
  outdoor: string | undefined,
  days: number,
  entities: Partial<Record<"heating" | "water", string>> = {},
  now = Date.now(),
): Promise<Series[]> {
  const modes = (["heating", "water"] as const).filter((m) => energy.ids[m]);
  const ids = [
    ...modes.flatMap((m) => [energy.ids[m]!.electric, energy.ids[m]!.heat]),
    ...(outdoor ? [outdoor] : []),
  ];
  if (!ids.length) return [];
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const start = today.getTime() - (days - 1) * DAY;
  const stats = await connection.sendMessagePromise<Record<string, Row[]>>({
    type: "recorder/statistics_during_period",
    start_time: new Date(start).toISOString(),
    end_time: new Date(now).toISOString(),
    statistic_ids: [...new Set(ids)],
    period: "day",
    types: ["change", "mean"],
    units: { energy: "kWh", temperature: "°C" },
  });
  const byDay = (id: string, key: "change" | "mean") =>
    new Map(
      (stats[id] ?? []).flatMap((row) =>
        typeof row[key] === "number" && Number.isFinite(row[key])
          ? [[row.start, row[key] as number] as const]
          : [],
      ),
    );
  const dayStarts: number[] = [];
  for (let t = start; t <= now; t += DAY) {
    // Local midnights, robust to daylight-saving days of 23 or 25 hours.
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    if (dayStarts[dayStarts.length - 1] !== d.getTime())
      dayStarts.push(d.getTime());
  }
  // Statistics may be stamped at UTC or local midnight; match to the day.
  const lookup = (values: Map<number, number>, day: number) => {
    for (const [time, value] of values)
      if (time >= day - 12 * 3_600_000 && time < day + 12 * 3_600_000)
        return value;
    return undefined;
  };
  const series: Series[] = modes.map((mode) => {
    const electric = byDay(energy.ids[mode]!.electric, "change");
    const heat = byDay(energy.ids[mode]!.heat, "change");
    const points: Point[] = dayStarts.map((day) => {
      const e = lookup(electric, day),
        h = lookup(heat, day);
      return [
        day,
        e !== undefined && h !== undefined && e >= MIN_KWH ? h / e : undefined,
      ];
    });
    return {
      role: mode === "heating" ? "heatingCop" : "waterCop",
      entityId: entities[mode] ?? energy.ids[mode]!.heat,
      unit: "COP",
      points,
    };
  });
  if (outdoor) {
    const mean = byDay(outdoor, "mean");
    series.push({
      role: "outdoor",
      entityId: outdoor,
      unit: "°C",
      points: dayStarts.map((day) => [day, lookup(mean, day)]),
    });
  }
  return series;
}
