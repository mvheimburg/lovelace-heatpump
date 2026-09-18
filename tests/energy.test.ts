import { it, expect } from "vitest";
import { summarize, windowRange } from "../src/energy";
import {
  HOUR,
  START,
  winter,
  summer,
  reset,
  outage,
  counter,
} from "./fixtures";
const end = START + 168 * HOUR;
it("calculates a ratio of total energy and keeps the independently measured environment balance", () => {
  const r = summarize(winter, START, end);
  expect(r.cop).toBe(3);
  expect(r.electric).toBe(168);
  expect(r.heat).toBe(504);
  expect(r.environment).toBe(336);
  expect(r.coverage).toBe(1);
});
it("does not divide by zero in the summer fixture", () => {
  const r = summarize(summer, START, end);
  expect(r.cop).toBeUndefined();
  expect(r.status).toBe("idle");
});
it("skips a resetting interval across both sides of the ratio", () => {
  const r = summarize(reset, START, end);
  expect(r.electric).toBe(167);
  expect(r.cop).toBe(3);
  expect(r.coverage).toBeCloseTo(167 / 168);
});
it("does not attribute six missing hours of accumulated energy to the recovery hour", () => {
  const r = summarize(outage, START, end);
  expect(r.electric).toBe(161);
  expect(r.cop).toBe(3);
  expect(r.coverage).toBeCloseTo(161 / 168);
});
it("does not show zero demand when there is no usable paired data", () => {
  expect(summarize({ electric: [], heat: [] }, START, end).status).toBe(
    "missing",
  );
  expect(
    summarize(
      {
        electric: counter(2, 1),
        heat: counter(2, 3).map((p) => ({ ...p, start: p.start + 4 * HOUR })),
      },
      START,
      end,
    ).cop,
  ).toBeUndefined();
});
it("pairs outdoor temperature by interval and omits invalid temperatures and nonfinite sums", () => {
  const r = summarize(
    {
      ...winter,
      outdoor: [
        { start: START, mean: -8 },
        { start: START + HOUR, mean: null },
        { start: START + 2 * HOUR, mean: NaN },
      ],
    },
    START,
    end,
  );
  expect(r.points).toEqual([{ start: START, temperature: -8, cop: 3 }]);
  expect(
    summarize(
      {
        electric: [
          { start: START - HOUR, sum: 0 },
          { start: START, sum: Infinity },
        ],
        heat: counter(1, 3),
      },
      START,
      START + HOUR,
    ).status,
  ).toBe("missing");
});
it("uses a ratio of sums instead of averaging hourly COPs", () => {
  expect(
    summarize(
      {
        electric: [
          { start: START - HOUR, sum: 0 },
          { start: START, sum: 1 },
          { start: START + HOUR, sum: 4 },
        ],
        heat: [
          { start: START - HOUR, sum: 0 },
          { start: START, sum: 5 },
          { start: START + HOUR, sum: 8 },
        ],
      },
      START,
      START + 2 * HOUR,
    ).cop,
  ).toBe(2);
});
it("uses complete UTC hours and excludes the partial current hour", () => {
  expect(windowRange("24h", START + HOUR / 2)).toEqual({
    start: START - 24 * HOUR,
    end: START,
  });
  expect(windowRange("30d", START)).toEqual({
    start: START - 720 * HOUR,
    end: START,
  });
});
it("does not fabricate environmental energy if it is missing", () => {
  const r = summarize(
    { electric: winter.electric, heat: winter.heat },
    START,
    end,
  );
  expect(r.cop).toBe(3);
  expect(r.environment).toBeUndefined();
});
it("does not claim no operation when heat rose without recorded electricity", () => {
  const r = summarize(
    { electric: counter(2, 0), heat: counter(2, 3) },
    START,
    START + 2 * HOUR,
  );
  expect(r.status).toBe("noInput");
  expect(r.cop).toBeUndefined();
  expect(r.heat).toBe(6);
});
