import { expect, it, vi } from "vitest";
import { loadCop } from "../src/cop";
import type { EnergyData } from "../src/data";
import type { Connection } from "../src/types";

const DAY = 86_400_000;
it("reads daily COP from the summary's statistics, leaving idle days as gaps", async () => {
  const now = new Date(2026, 8, 21, 15, 0).getTime();
  const today = new Date(2026, 8, 21).getTime();
  const days = [today - 2 * DAY, today - DAY, today];
  const sendMessagePromise = vi.fn(async () => ({
    "mypyllant:in": [
      { start: days[0], change: 10 },
      { start: days[1], change: 0.05 },
      { start: days[2], change: 4 },
    ],
    "mypyllant:out": [
      { start: days[0], change: 35 },
      { start: days[1], change: 0.2 },
      { start: days[2], change: 12 },
    ],
    "sensor.outdoor": [
      { start: days[0], mean: 2.5 },
      { start: days[2], mean: 6 },
    ],
  }));
  const energy: EnergyData = {
    start: 0,
    end: 0,
    sources: { heating: "external" },
    ids: { heating: { electric: "mypyllant:in", heat: "mypyllant:out" } },
  };
  const series = await loadCop(
    { sendMessagePromise } as unknown as Connection,
    energy,
    "sensor.outdoor",
    3,
    { heating: "sensor.heat_generated_heating" },
    now,
  );
  expect(sendMessagePromise).toHaveBeenCalledWith({
    type: "recorder/statistics_during_period",
    start_time: new Date(days[0]).toISOString(),
    end_time: new Date(now).toISOString(),
    statistic_ids: ["mypyllant:in", "mypyllant:out", "sensor.outdoor"],
    period: "day",
    types: ["change", "mean"],
    units: { energy: "kWh", temperature: "°C" },
  });
  expect(series.map((s) => [s.role, s.entityId, s.unit])).toEqual([
    ["heatingCop", "sensor.heat_generated_heating", "COP"],
    ["outdoor", "sensor.outdoor", "°C"],
  ]);
  // 35/10, then a day under 0.1 kWh (a gap, not COP 4), then 12/4.
  expect(series[0].points).toEqual([
    [days[0], 3.5],
    [days[1], undefined],
    [days[2], 3],
  ]);
  expect(series[1].points).toEqual([
    [days[0], 2.5],
    [days[1], undefined],
    [days[2], 6],
  ]);
});
