import type { Statistic } from "../src/types";
// Synthetic hourly fixtures; these are not exports from a real installation.
export const HOUR = 3_600_000;
export const START = Date.UTC(2026, 0, 5);
export function counter(
  hours: number,
  increment: number,
  missing: number[] = [],
  resetAt = -1,
): Statistic[] {
  let sum = 100;
  const rows: Statistic[] = [{ start: START - HOUR, sum }];
  for (let hour = 0; hour < hours; hour++) {
    sum = hour === resetAt ? 0 : sum + increment;
    if (!missing.includes(hour)) rows.push({ start: START + hour * HOUR, sum });
  }
  return rows;
}
export const winter = {
  electric: counter(168, 1),
  heat: counter(168, 3),
  environment: counter(168, 2),
};
export const summer = {
  electric: counter(168, 0),
  heat: counter(168, 0),
  environment: counter(168, 0),
};
export const reset = {
  electric: counter(168, 1, [], 80),
  heat: counter(168, 3, [], 80),
  environment: counter(168, 2, [], 80),
};
export const outage = {
  electric: counter(168, 1, [50, 51, 52, 53, 54, 55]),
  heat: counter(168, 3, [50, 51, 52, 53, 54, 55]),
  environment: counter(168, 2, [50, 51, 52, 53, 54, 55]),
};
