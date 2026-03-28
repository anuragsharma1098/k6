import { loadConfig } from '../lib/utils.js';

const config = loadConfig();

export const options = {
  scenarios: {
    smoke_scenario: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
      exec: 'smokeTest',
    },
    load_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 20 },
        { duration: '3m', target: 50 },
        { duration: '1m', target: 0 },
      ],
      exec: 'loadTest',
    },
    stress_scenario: {
      executor: 'per-vu-iterations',
      vus: 50,
      iterations: 20,
      maxDuration: '10m',
      exec: 'stressTest',
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1000'],
    'error_count': ['rate<0.01'],
  },
  ext: {
    loadimpact: {
      projectID: 1234567,
      name: 'Enterprise reusable test suite',
    },
  },
};

export const configOverrides = {
  baseUrl: config.baseUrl,
  endpoints: config.endpoints,
};
