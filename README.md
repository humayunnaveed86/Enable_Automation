# SauceDemo UI Tests

Playwright + TypeScript automation for [saucedemo.com](https://www.saucedemo.com), using the Page Object Model.

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
npx playwright install chromium
```

## Running the tests

```bash
npm run saucedemo-ui-test          # headless
npm run saucedemo-ui-test:headed   # watch it run in a browser
npm run saucedemo-ui-test:report   # open the last HTML report
```

## Project structure

```
config/    → environment/base URL + credentials
data/      → test data (users, product names, expected text)
pages/     → Page Object Model classes (Login, Products, Cart)
Utils/     → shared helpers
tests/     → @e2e-tagged test specs
```