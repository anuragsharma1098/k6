import { browser } from "k6/browser";

export const options = {
  scenarios: {
    browser_test: {
      executor: "constant-vus",
      vus: 2,
      duration: "5s",
      options: {
        browser: {
          type: "chromium",
          headless: true,
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  // await page.screenshot({ path: `../screenshots/google-${__VU}.png` });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await page.screenshot({
    fullPage: true,
    path: `../screenshots/google-${timestamp}-${__VU}.png`,
  });
  await page.close();
}
