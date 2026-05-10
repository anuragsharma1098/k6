import { smokeTest } from '../test1.js';

export const options = {
  vus: 5,
  duration: '15s',
};

export default function () {
  smokeTest();
}
