# WYNN Web Framework
This repository contains automated tests for file upload functionality using Playwright with TypeScript and the Page Object Model design pattern.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/qualicion/wynn-web-framework
   
   cd wynn-web-framework
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Project Structure

```
wynn-web-framework/
├── fixtures/           # Test fixtures and sample files
│   └── tunde.jpg       # Sample image for upload testing
├── pages/              # Page Object classes
│   ├── BasePage.ts     # Base page with common functionality
│   ├── FileUploadedPage.ts # Success page after upload
│   └── FileUploaderPage.ts # File upload page interactions
├── tests/              # Test specifications
│   └── wynn-test.spec.ts # File upload test cases
├── node_modules/       # Node.js dependencies
├── playwright-report/  # Test execution reports
├── test-results/       # Test result artifacts
├── .gitignore          # Git ignore file
├── package-lock.json   # Dependency lock file
├── package.json        # Project configuration
├── playwright.config.ts # Playwright configuration
└── README.md           # Project documentation
```

## Running Tests

### Run all tests

```
npx playwright test
```

### Run specific test file

```
npx playwright test tests/wynn-test.spec.ts
```

### Run tests in UI mode

```
npx playwright test --ui
```

### Run tests with specific browser

```
npx playwright test --project=chromium
```

## Viewing Test Reports

After running tests, you can view the HTML report:

```
npx playwright show-report
```

## Debugging Tests

1. Run test in debug mode:
   ```
   npx playwright test tests/wynn-test.spec.ts --debug
   ```

2. Use UI mode for visual debugging:
   ```
   npx playwright test --ui
   ```

## Adding New Tests

1. Create test files in the appropriate directories
2. For image uploads, place sample images in the `fixtures` folder
3. Follow the Page Object Model pattern for maintainable tests
4. Use descriptive test and function names



## Troubleshooting
- Run tests in headed mode to visually see what's happening: `npx playwright test --headed`
- Check the network tab in DevTools to verify upload requests
- Confirm file paths in tests match your project structure
