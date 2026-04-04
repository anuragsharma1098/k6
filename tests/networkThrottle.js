import { browser } from "k6/browser";

export const options = {
  scenarios: {
    network_throttle_test: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
          headless: true,
        //   network: {
        //     download: 500 * 1024, // 500 kbps
        //     upload: 100 * 1024, // 100 kbps
        //     latency: 100, // 100 ms
        //   },
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  page.throttleNetwork({networkProfile: "Slow 3G"});
  await page.goto("https://www.google.com/");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await page.screenshot({
    fullPage: true,
    path: `../screenshots/google-${timestamp}-${__VU}.png`,
  });
  await page.close();
}
