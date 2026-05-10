import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  iterations: 30,
  thresholds: {
    http_req_duration: ["p(95)<1000", "p(99)<2000"], // 95% of requests should be below 1000ms, 99% below 2000ms
    http_req_failed: ["rate<0.01"], // Less than 1% of requests should fail
  },
};

const endpoint = "https://www.google.com";

export default function () {
  http.get(endpoint);
}
