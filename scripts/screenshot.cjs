const { chromium } = require("playwright");
const { resolve } = require("node:path");

// The preview contains generic, simulated myVAILLANT data only.
(async () => {
  const { createServer } = await import("vite");
  const server = await createServer({
    root: resolve(__dirname, ".."),
    server: { host: "127.0.0.1", port: 5197 },
  });
  await server.listen();
  const browser = await chromium.launch({ headless: true });
  try {
    const errors = [];
    const page = await browser.newPage({
      viewport: { width: 900, height: 760 },
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:5197/demo/");
    const card = page.locator("heatpump-card").first();
    await card.locator('[data-chip="flow"]').click();
    await card.locator(".history-chart .line").first().waitFor();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: resolve(__dirname, "../docs/heatpump-history.png"),
    });
    await card.locator("[data-close-history]").click();
    await page.locator("#theme").click();
    await page.setViewportSize({ width: 375, height: 740 });
    await card.locator('[data-chip="flow"]').click();
    await card.locator(".history-chart .line").first().waitFor();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: resolve(__dirname, "../docs/heatpump-history-mobile.png"),
    });
    if (errors.length) throw new Error(errors.join("; "));
  } finally {
    await browser.close();
    await server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
