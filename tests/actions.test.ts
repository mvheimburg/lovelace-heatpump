import { it, expect } from "vitest";
import { actionPayload } from "../src/actions";
import { fixture } from "./ui-fixture";
const config = { type: "custom:heatpump-card" };
it("rejects quick veto durations that upstream would silently clamp to an hour", () => {
  expect(() =>
    actionPayload(
      "climate",
      "quickVeto",
      fixture().states["climate.home"],
      config,
      21,
      0.5,
    ),
  ).toThrow("range");
});
it("converts quick veto temperature into the Celsius unit required by the custom service", () => {
  const e = fixture().states["climate.home"];
  e.attributes = {
    temperature: 70,
    min_temp: 40,
    max_temp: 90,
    target_temp_step: 1,
    supported_features: 1,
  };
  expect(
    actionPayload("climate", "quickVeto", e, config, 68, 2, "°F").data,
  ).toEqual({ entity_id: "climate.home", temperature: 20, duration_hours: 2 });
});
it("enforces the curve flag and number step at the service boundary", () => {
  const e = fixture().states["number.curve"];
  expect(() => actionPayload("curve", "number", e, config, 1)).toThrow(
    "unavailable",
  );
  expect(() =>
    actionPayload(
      "curve",
      "number",
      e,
      { ...config, allow_curve_edit: true },
      0.83,
    ),
  ).toThrow("range");
});
it("rejects a quick-veto target above the custom service limit instead of silently clamping", () => {
  const e = fixture().states["climate.home"];
  e.attributes.max_temp = 35;
  expect(() => actionPayload("climate", "quickVeto", e, config, 32, 2)).toThrow(
    "range",
  );
});
