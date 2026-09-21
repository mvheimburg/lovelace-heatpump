import { expect, it } from "vitest";
import { render } from "lit";
import { efficiencyGroup } from "../src/efficiency";
import { localize } from "../src/localize";
it("formats chart, table, totals and accessible balance with the selected locale", () => {
  const host = document.createElement("div");
  const start = Date.UTC(2026, 8, 17, 12);
  const data = {
    start,
    end: start + 3600000,
    sources: {},
    ids: {},
    heating: {
      status: "ready" as const,
      coverage: 1,
      electric: 1.5,
      heat: 4.8,
      cop: 3.2,
      points: [{ start, temperature: 10.5, cop: 3.2 }],
    },
  };
  render(
    efficiencyGroup("heating", data, (key) => localize("nb", key), "nb-NO"),
    host,
  );
  expect(host.querySelector(".cop")?.textContent).toBe("3,20");
  expect(
    host.querySelector(".energy-bar")?.getAttribute("aria-label"),
  ).toContain("Strøm inn 1,5 kWh");
  expect(host.querySelector("circle title")?.textContent).toContain(
    "10,5 °C · COP 3,20",
  );
  expect(host.querySelector("tbody td")?.textContent).toBe(
    new Date(start).toLocaleString("nb-NO"),
  );
  expect(host.querySelector("tbody")?.textContent).toContain("3,20");
  expect(host.querySelector("svg")?.getAttribute("aria-label")).toBe(
    "COP og utetemperatur",
  );
});
