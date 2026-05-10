import { Trend, Counter, Rate } from 'k6/metrics';

export const responseTimeTrend = new Trend('response_time_ms', true);
export const requestRate = new Rate('request_rate');
export const errorCounter = new Counter('error_count');

export function recordResponse(response) {
  responseTimeTrend.add(response.timings.duration);
  requestRate.add(response.status >= 200 && response.status < 400);
  if (response.status >= 400) {
    errorCounter.add(1);
  }
}

export function recordCustomStatus(response, expected) {
  if (response.status !== expected) {
    errorCounter.add(1);
  }
}
