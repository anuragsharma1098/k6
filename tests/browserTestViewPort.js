import { browser } from "k6/browser";

export const options = {
  scenarios: {
    browser_test: {
      executor: "constant-vus",
      vus: 2,
      duration: "10s",
      options: {
        browser: {
          type: "chromium",
          headless: false,
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();
  page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("https://www.google.com/");
//   await page.screenshot({ path: "screenshot.png" });
  await page.close();
}
