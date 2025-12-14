# Testing Guide

Complete guide to testing bl1nk Web Portal with unit tests, E2E tests, and Playwright.

## Overview

bl1nk Web Portal includes comprehensive testing infrastructure:

- **Unit Tests** - Component and schema validation tests with Vitest
- **E2E Tests** - End-to-end browser automation with Playwright
- **Screenshots** - Visual regression testing with Playwright
- **Coverage** - Code coverage reporting

---

## Setup

### Install Dependencies

```bash
pnpm install
```

### Install Playwright Browsers

```bash
npx playwright install chromium
```

---

## Unit Tests

### Running Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test ContentCard.test.tsx

# Run with coverage
pnpm test --coverage
```

### Test Files

Unit tests are located in `__tests__` folders:

- `client/src/components/__tests__/` - Component tests
- `shared/schemas/__tests__/` - Schema validation tests
- `server/__tests__/` - Server logic tests

### Example Unit Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentCard from '../ContentCard';

describe('ContentCard Component', () => {
  it('renders card with title', () => {
    render(<ContentCard title="Test" description="Test" source="github" url="https://..." />);
    expect(screen.queryByText('Test')).toBeTruthy();
  });
});
```

### Testing Best Practices

1. **Test Behavior, Not Implementation**
   ```typescript
   // ✅ Good - tests user interaction
   it('calls onEdit when edit button is clicked', () => {
     const onEdit = vi.fn();
     render(<ContentCard onEdit={onEdit} {...props} />);
     fireEvent.click(screen.getByRole('button', { name: /edit/i }));
     expect(onEdit).toHaveBeenCalled();
   });

   // ❌ Avoid - tests implementation details
   it('has edit button with specific class', () => {
     render(<ContentCard {...props} />);
     expect(screen.getByRole('button').className).toContain('bg-blue');
   });
   ```

2. **Use Semantic Queries**
   ```typescript
   // ✅ Good - queries by role/label
   screen.getByRole('button', { name: /save/i });
   screen.getByLabelText('Username');

   // ❌ Avoid - queries by test ID when possible
   screen.getByTestId('save-button');
   ```

3. **Test User Flows**
   ```typescript
   // ✅ Good - complete user interaction
   it('allows user to edit and save card', () => {
     render(<CardEditor card={mockCard} onSave={onSave} />);
     fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Title' } });
     fireEvent.click(screen.getByRole('button', { name: /save/i }));
     expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Title' }));
   });
   ```

---

## E2E Tests

### Running E2E Tests

```bash
# Run all E2E tests
pnpm exec playwright test

# Run tests in headed mode (see browser)
pnpm exec playwright test --headed

# Run specific test file
pnpm exec playwright test landing-page

# Run tests in debug mode
pnpm exec playwright test --debug

# Generate test report
pnpm exec playwright show-report
```

### Test Files

E2E tests are located in `e2e/` folder:

- `e2e/landing-page.spec.ts` - Landing page tests
- `e2e/home-page.spec.ts` - Home page tests

### Example E2E Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();
  });

  test('should take screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('landing-page.png');
  });
});
```

### Playwright Features

#### Selectors

```typescript
// By role
page.locator('button:has-text("Click me")');

// By test ID
page.locator('[data-testid="hero-section"]');

// By CSS
page.locator('.card-container');

// By XPath
page.locator('//button[@id="submit"]');
```

#### Interactions

```typescript
// Click
await page.locator('button').click();

// Type
await page.locator('input').fill('text');

// Select
await page.locator('select').selectOption('option');

// Drag
await page.locator('.item').dragTo(page.locator('.target'));

// Scroll
await page.evaluate(() => window.scrollBy(0, 500));
```

#### Assertions

```typescript
// Visibility
await expect(page.locator('button')).toBeVisible();

// Text
await expect(page.locator('h1')).toContainText('Welcome');

// Attribute
await expect(page.locator('a')).toHaveAttribute('href', '/about');

// Count
await expect(page.locator('.card')).toHaveCount(5);
```

#### Screenshots

```typescript
// Single screenshot
await page.screenshot({ path: 'screenshot.png' });

// Full page screenshot
await page.screenshot({ path: 'full-page.png', fullPage: true });

// Visual regression
await expect(page).toHaveScreenshot('landing-page.png');
```

---

## Browser Testing

### Supported Browsers

Playwright tests run on:

- **Chromium** - Chrome/Edge engine
- **Firefox** - Firefox engine
- **WebKit** - Safari engine
- **Mobile Chrome** - Pixel 5 emulation
- **Mobile Safari** - iPhone 12 emulation

### Running on Specific Browser

```bash
# Run on Chromium only
pnpm exec playwright test --project=chromium

# Run on Firefox only
pnpm exec playwright test --project=firefox

# Run on all browsers
pnpm exec playwright test
```

### Device Emulation

```typescript
test('should work on mobile', async ({ page }) => {
  // Page is already emulated as Pixel 5
  await page.goto('/');
  
  // Test mobile-specific behavior
  const mobileMenu = page.locator('[data-testid="mobile-menu"]');
  await expect(mobileMenu).toBeVisible();
});
```

---

## Screenshots & Visual Testing

### Taking Screenshots

Screenshots are stored in `docs/screenshots/`:

- `01-landing-page.png` - Full landing page
- `02-hero-section.png` - Hero section
- `03-content-cards.png` - Content cards section

### Taking GIFs

GIFs are stored in `docs/gifs/`:

- `01-drag-and-drop-demo.gif` - Drag and drop interaction
- `02-card-editor-demo.gif` - Card editor interaction

### Visual Regression Testing

```typescript
test('landing page looks correct', async ({ page }) => {
  await page.goto('/');
  
  // Compare with baseline screenshot
  await expect(page).toHaveScreenshot('landing-page.png');
});
```

### Updating Baselines

```bash
# Update all screenshots
pnpm exec playwright test --update-snapshots
```

---

## Coverage Reports

### Generate Coverage

```bash
pnpm test --coverage
```

### View Coverage Report

```bash
# HTML report
open coverage/index.html

# Terminal report
pnpm test --coverage --reporter=text
```

### Coverage Goals

- **Statements:** > 80%
- **Branches:** > 75%
- **Functions:** > 80%
- **Lines:** > 80%

---

## Continuous Integration

### GitHub Actions

Tests run automatically on:

- Push to main branch
- Pull requests
- Scheduled daily

### CI Configuration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test
      - run: pnpm exec playwright test
```

---

## Debugging Tests

### Debug Mode

```bash
# Run single test in debug mode
pnpm exec playwright test landing-page --debug

# Step through test execution
# Use browser DevTools to inspect elements
```

### Verbose Logging

```typescript
test('debug example', async ({ page }) => {
  console.log('Navigating to home...');
  await page.goto('/');
  
  console.log('Clicking button...');
  await page.locator('button').click();
  
  console.log('Checking result...');
  await expect(page.locator('.result')).toBeVisible();
});
```

### Trace Viewer

```bash
# Run with trace recording
pnpm exec playwright test --trace on

# View trace
pnpm exec playwright show-trace trace.zip
```

---

## Common Issues

### Tests Timing Out

```typescript
// Increase timeout for specific test
test('slow test', async ({ page }) => {
  // ...
}, { timeout: 60000 });

// Or globally in playwright.config.ts
use: {
  timeout: 30000,
}
```

### Flaky Tests

```typescript
// Retry specific test
test('flaky test', async ({ page }) => {
  // ...
}, { retries: 2 });

// Wait for element properly
await page.waitForSelector('[data-testid="element"]');
await page.locator('[data-testid="element"]').waitFor({ state: 'visible' });
```

### Element Not Found

```typescript
// Wait for element to appear
await page.waitForSelector('button');

// Or use locator with timeout
await page.locator('button').click({ timeout: 5000 });
```

---

## Best Practices

### 1. Use Data Attributes

```typescript
// In component
<button data-testid="save-button">Save</button>

// In test
await page.locator('[data-testid="save-button"]').click();
```

### 2. Test User Flows

```typescript
// ✅ Good - complete user journey
test('user can create and save card', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Card")').click();
  await page.locator('input[name="title"]').fill('My Card');
  await page.locator('button:has-text("Save")').click();
  await expect(page.locator('text=My Card')).toBeVisible();
});
```

### 3. Avoid Hard Waits

```typescript
// ❌ Bad
await page.waitForTimeout(5000);

// ✅ Good
await page.waitForSelector('[data-testid="result"]');
await expect(page.locator('[data-testid="result"]')).toBeVisible();
```

### 4. Test Accessibility

```typescript
// ✅ Good - test keyboard navigation
test('can navigate with keyboard', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-testid="modal"]')).toBeVisible();
});
```

---

## Related Documentation

- [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) - Component documentation
- [SCHEMA_DOCUMENTATION.md](./SCHEMA_DOCUMENTATION.md) - Schema validation
- [README.md](./README.md) - Project overview
- [Playwright Docs](https://playwright.dev/) - Official Playwright documentation
- [Vitest Docs](https://vitest.dev/) - Official Vitest documentation
