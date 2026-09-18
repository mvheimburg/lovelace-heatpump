import { expect, it } from "vitest";
import { language, localize } from "../src/localize";
it.each(["nb", "nb-NO", "NB_no", "no", "NO_no", "nn"])(
  "supports Norwegian alias %s",
  (value) => {
    expect(localize(language({ language: value }), "comfort")).toBe("Komfort");
  },
);
it("prefers the active language and falls back safely", () => {
  expect(
    localize(
      language({ language: "en", locale: { language: "nb" } }),
      "comfort",
    ),
  ).toBe("Comfort");
  expect(localize(language({ locale: { language: "nb" } }), "comfort")).toBe(
    "Komfort",
  );
  expect(localize(language({ language: "fr" }), "comfort")).toBe("Comfort");
  expect(language({ language: "bad locale!" })).toBe("en");
  expect(language()).toBe("en");
});
