import http from "k6/http";

export const options = {
  stages: [
    { duration: "30s", target: 100 }, // Ramp up to 100 users over 30 seconds
    { duration: "1m", target: 100 }, // Stay at 100 users for 1 minute
    { duration: "30s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
};

export default function () {
  http.get("https://test.k6.io");
}
