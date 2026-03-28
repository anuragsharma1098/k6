import { stressTest } from '../test1.js';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<700'],
    'error_count': ['rate<0.05'],
  },
};

export default function () {
  stressTest();
}
