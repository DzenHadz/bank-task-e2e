# Simple Cypress E2E tests on GLOBALBank.com

E2E automation with Cypress.

# How to run tests

**Node.js 18+ is required to run these tests.**

1. Install the dependencies

```
npm install
```

2. Run tests

```
npx cypress run OR npm test
```

or run the tests on Cypress Launchpad

```
npx cypress open OR npm run open
```

There is no need for .env file, since base URL is hard coded in Cypress.config.js

3. Cypress Tests GitHub Actions Workflow

This GitHub Actions workflow is designed to run Cypress tests on pull requests and pushes to the `main` branch. Below is a breakdown of the workflow:

## Trigger

The workflow is triggered by the following events:

- **Pull Requests**:
  - The workflow runs when a pull request is opened, synchronized (updated), or reopened.
- **Push to Main Branch**:
  - The workflow is triggered when changes are pushed to the `main` branch.

## Jobs

### `run-tests` Job

This job is responsible for running the Cypress tests inside a Docker container.

- **runs-on**:

  - Specifies that the job runs on the latest version of Ubuntu (`ubuntu-latest`).

- **container**:
  - The job runs inside the `cypress/included:latest` Docker image, which has Cypress pre-installed.

## Steps

1. **Checkout repository**:

   - Uses the `actions/checkout@v4` action to check out the repository's code. This step is necessary for accessing the files to run tests.

2. **Install dependencies**:

   - Runs `npm install` to install the necessary project dependencies defined in the `package.json` file.

3. **Run Cypress tests**:

   - Executes the Cypress tests using `npm test`. This will trigger Cypress to run the tests defined in the project.

4. **Upload test results**:
   - Uses `actions/upload-artifact@v3` to upload the test results (located in `cypress/reports`). This step ensures that the test reports are stored as artifacts and can be accessed later.
   - The `if: always()` condition ensures that the test results are uploaded regardless of whether the tests pass or fail.
   - The `retention-days: 7` option specifies that the uploaded test results will be retained for 7 days.

This setup ensures that Cypress tests are run on both pull requests and changes to the `main` branch, with test reports being uploaded for further analysis.
