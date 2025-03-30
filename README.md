# Project Title

Automated Testing with Playwright and TypeScript

## Overview
This project leverages Playwright and TypeScript to automate end-to-end testing. It is configured for seamless integration within a VS Code environment, ensuring smooth development and testing workflows.

## Prerequisites
-https://playwright.dev/docs/intro(This will be helpfull for installation and running commands)
- Node.js (v16+)
- npm or yarn
- Visual Studio Code

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running Tests
To execute all tests, run the following command:
```bash
npx playwright test
```

### Run Specific Tests
To run a specific test file:
```bash
npx playwright test tests/example.spec.ts
```

### Generate HTML Report
After running tests, generate and open an HTML report:
```bash
npx playwright show-report
```

## Project Structure
- **tests/**: Contains the test scripts(login.spec.ts(for calling all the scripts) nd negative.spec.ts) written in TypeScript.
- **pages/**: Contains the Page Object Model(Login,Product iltering,Shipping,Cart) written in TypeScript.
- **playwright.config.ts**: Playwright configuration file.
- **package.json**: Project dependencies and scripts.

## Scripts
- Run tests:
  ```bash
  npm test
  ```
- Generate report:
  ```bash
  npm run report
  ```

## CI/CD Integration
To integrate with CI/CD pipelines, ensure the following:
- Install dependencies as part of the pipeline.
- Run tests using the command:
  ```bash
  npx playwright test
  ```

## Troubleshooting
If tests fail, check the logs generated in the **test-results/** directory for detailed information.



