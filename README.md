# k6 Enterprise Performance Testing Framework

A scalable, reusable, and enterprise-grade performance testing suite built with k6. This framework provides a structured approach to load testing, stress testing, and smoke testing with modular components for easy maintenance and extension.

## Features

- **Modular Architecture**: Reusable libraries, scenarios, and test configurations
- **Multiple Test Types**: Smoke, load, and stress testing scenarios
- **Configurable Endpoints**: Easy base URL and endpoint management
- **Custom Metrics**: Built-in response time, error rate, and request rate tracking
- **Data-Driven Testing**: CSV-based user data and configuration files
- **Thresholds and Assertions**: Pre-defined performance thresholds and checks
- **CI/CD Ready**: Designed for integration with continuous integration pipelines

## Project Structure

```
k6/
├── .github/
│   └── workflows/
│       └── performance-tests.yml  # GitHub Actions CI pipeline
├── README.md                 # Project documentation
├── data/
│   ├── config.json          # API endpoints and base configuration
│   └── users.csv            # Test user data for data-driven tests
├── lib/
│   ├── utils.js             # Utility functions (config loading, CSV parsing, URL building)
│   └── metrics.js           # Custom metrics and response recording
├── scenarios/
│   └── http_scenarios.js     # Test scenario definitions (smoke, load, stress)
├── tests/
│   ├── test1.js             # Main test file with all scenario functions
│   ├── smoke/
│   │   └── smoke_test.js    # Smoke test wrapper
│   ├── load/
│   │   └── load_test.js     # Load test wrapper
│   └── stress/
│       └── stress_test.js   # Stress test wrapper
└── results/                 # Output directory for test artifacts
```

## Prerequisites

- [k6](https://k6.io/docs/get-started/installation/) installed (version 0.40.0 or later)
- Node.js (optional, for advanced scripting or CI integration)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anuragsharma1098/k6.git
   cd k6
   ```

2. Install k6 if not already installed:
   ```bash
   # On macOS with Homebrew
   brew install k6

   # On Windows with Chocolatey
   choco install k6

   # Or download from https://k6.io/docs/get-started/installation/
   ```

## Configuration

### Base URL Configuration

The base URL is configured in `data/config.json`:

```json
{
  "baseUrl": "https://test.k6.io",
  "endpoints": {
    "login": "/auth/login",
    "todos": "/public/crocodiles/",
    "ping": "/"
  },
  "defaultToken": "",
  "logLevel": "info"
}
```

To change the base URL for testing different environments:

1. Edit `data/config.json` and update the `baseUrl` field
2. Or use environment variables (if env support is added):
   ```bash
   k6 run --env BASE_URL=https://staging-api.example.com tests/test1.js
   ```

### Test Data

User data for data-driven tests is stored in `data/users.csv`:

```csv
username,password,email
admin,admin123,admin@example.com
user1,user1password,user1@example.com
user2,user2password,user2@example.com
```

## Running Tests

### Smoke Test
Quick validation test to ensure basic functionality:
```bash
k6 run tests/smoke/smoke_test.js
```

### Load Test
Gradual load increase to test performance under normal conditions:
```bash
k6 run tests/load/load_test.js
```

### Stress Test
High-load test to find breaking points:
```bash
k6 run tests/stress/stress_test.js
```

### Full Scenario Suite
Run all scenarios defined in the configuration:
```bash
k6 run tests/test1.js
```

### Custom Options
Override default settings:
```bash
# Run with custom VUs and duration
k6 run --vus 10 --duration 30s tests/smoke/smoke_test.js

# Output results to file
k6 run --out json=results/test_results.json tests/test1.js

# Run with HTML report
k6 run --out json=results/test_results.json tests/test1.js
# Then use k6-reporter or similar for HTML generation
```

## Test Scenarios

### Smoke Scenario
- **Executor**: `constant-vus`
- **VUs**: 5
- **Duration**: 30 seconds
- **Purpose**: Basic functionality validation

### Load Scenario
- **Executor**: `ramping-vus`
- **Stages**: Ramp up to 50 VUs over 4 minutes, then ramp down
- **Purpose**: Performance testing under normal load

### Stress Scenario
- **Executor**: `per-vu-iterations`
- **VUs**: 50
- **Iterations**: 20 per VU
- **Max Duration**: 10 minutes
- **Purpose**: Breaking point identification

## Metrics and Monitoring

The framework includes custom metrics:

- **Response Time Trend**: Tracks response times (95th, 99th percentiles)
- **Request Rate**: Measures requests per second
- **Error Counter**: Counts failed requests

Thresholds are defined in scenarios:
- HTTP request duration: p(95) < 500ms, p(99) < 1000ms
- Error rate: < 1%

## Extending the Framework

### Adding New Tests
1. Create a new test file in `tests/`
2. Import required utilities from `lib/`
3. Define test logic using k6 APIs
4. Add to scenarios in `scenarios/http_scenarios.js` if needed

### Adding New Endpoints
1. Update `data/config.json` with new endpoint paths
2. Use `buildUrl()` utility in test code

### Custom Metrics
1. Define new metrics in `lib/metrics.js`
2. Record them in test functions

## CI/CD Integration

This project includes a GitHub Actions workflow (`.github/workflows/performance-tests.yml`) that automatically runs performance tests on every push and pull request to the `main` and `day_1` branches.

### What the CI Pipeline Does

- **Smoke Tests**: Validates basic functionality
- **Load Tests**: Tests performance under normal load conditions
- **Stress Tests**: Identifies breaking points under high load
- **Result Artifacts**: Uploads JSON results and HTML reports
- **PR Comments**: Automatically comments on pull requests with test summaries

### GitHub Actions Workflow

The workflow file (`.github/workflows/performance-tests.yml`) includes:

```yaml
name: Performance Tests
on:
  push:
    branches: [ main, day_1 ]
  pull_request:
    branches: [ main, day_1 ]
```

**Steps:**
1. Checkout code
2. Setup k6
3. Run smoke, load, and stress tests
4. Generate HTML reports using k6-reporter
5. Upload artifacts (JSON results and HTML reports)
6. Comment on PRs with performance metrics

### Viewing Test Results

- **Artifacts**: Download JSON and HTML reports from the Actions tab
- **PR Comments**: Automatic summaries posted to pull requests
- **Metrics**: Response times, error rates, and throughput statistics

### Azure Pipelines Example

For Azure DevOps pipelines:

```yaml
steps:
- task: k6-load-test@1
  inputs:
    filename: 'tests/test1.js'
    args: '--out json=results/test_results.json'
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-test-type`
3. Make your changes and add tests
4. Run tests: `k6 run tests/test1.js`
5. Commit your changes: `git commit -am 'Add new test type'`
6. Push to the branch: `git push origin feature/new-test-type`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- Check the [k6 documentation](https://k6.io/docs/)
- Open an issue in this repository
- Join the [k6 community](https://community.k6.io/)
