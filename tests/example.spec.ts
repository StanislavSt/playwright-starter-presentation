import { test, expect } from "@playwright/test";
test("test", async ({ browser }) => {
  // Go to https://en.wikipedia.org/wiki/Main_Page
  const context = await browser.newContext({ recordVideo: { dir: "videos/" } });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage()
  // Make sure to await close, so that videos are saved.
  await page.goto("https://en.wikipedia.org/wiki/Main_Page");
  // Click text=Log in
  await page.locator("text=Log in").click();
  await expect(page).toHaveURL(
    "https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page"
  );
  // Click [placeholder="Enter your username"]
  await page.locator('[placeholder="Enter your username"]').click();
  // Fill [placeholder="Enter your username"]
  await page
    .locator('[placeholder="Enter your username"]')
    .fill("Playwright1234");
  // Click [placeholder="Enter your password"]
  await page.locator('[placeholder="Enter your password"]').click();
  // Fill [placeholder="Enter your password"]
  await page
    .locator('[placeholder="Enter your password"]')
    .fill("randompassword");
  // Click button:has-text("Log in")
  await page.locator('button:has-text("Log in")').click();
  await expect(page).toHaveURL("https://en.wikipedia.org/wiki/Main_Page");

  await page.screenshot({ path: "screenshots/wiki_test.png" });

  await expect(await page.locator("text=Playwright1234")).toBeVisible();
  await context.tracing.stop({ path: 'trace.zip' });
  await context.close();
});
