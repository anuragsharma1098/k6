import { smokeTest } from '../test1.js';

export const options = {
  vus: 5,
  duration: '15s',
};

export default function () {
  smokeTest();
}

export function handleSummary(data) {
  return {
    'results/junit.xml': generateJUnitXML(data),
    stdout: JSON.stringify(data, null, 2),
  };
}

function generateJUnitXML(data) {
  const checks = data.root_group.checks || [];
  const failures = checks.filter(c => c.fails > 0).length;
  const total = checks.length || 1;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<testsuite name="k6-smoke-test" tests="${total}" failures="${failures}">\n`;

  checks.forEach(check => {
    xml += `  <testcase classname="k6.smoke" name="${check.name}">\n`;
    if (check.fails > 0) {
      xml += `    <failure message="Check failed">${check.fails} of ${check.passes + check.fails} failed</failure>\n`;
    }
    xml += `  </testcase>\n`;
  });

  xml += `</testsuite>\n`;
  return xml;
}
