import http from 'k6/http';
import { check, sleep } from 'k6';
import { options as scenarioOptions, configOverrides } from '../scenarios/http_scenarios.js';
import { buildHeaders, buildUrl, users, randomItem } from '../lib/utils.js';
import { recordResponse, recordCustomStatus } from '../lib/metrics.js';

export const options = scenarioOptions;

const endpoint = configOverrides.baseUrl;

export function smokeTest() {
  const url = buildUrl(endpoint, configOverrides.endpoints.ping);
  const res = http.get(url, { headers: buildHeaders() });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });

  recordResponse(res);
  sleep(1);
}

export function loadTest() {
  const url = buildUrl(endpoint, configOverrides.endpoints.todos);
  const res = http.get(url, { headers: buildHeaders() });

  check(res, { 'todos is present': (r) => r.status === 200 });
  recordResponse(res);
  sleep(1);
}

export function stressTest() {
  const url = buildUrl(endpoint, configOverrides.endpoints.ping);
  const res = http.get(url, { headers: buildHeaders() });

  check(res, { 'stress status is 200': (r) => r.status === 200 });
  recordCustomStatus(res, 200);
  sleep(0.5);
}

export default function () {
  // fallback path for direct execution
  smokeTest();
}