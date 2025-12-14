import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load landing page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if page title is visible
    const title = page.locator('h1');
    await expect(title).toBeVisible();
  });

  test('should display hero section with CTA buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check for hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();
    
    // Check for CTA buttons
    const ctaButtons = page.locator('button:has-text("Get Started")');
    await expect(ctaButtons).toBeVisible();
  });

  test('should display navbar with navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check for navbar
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    
    // Check for logo
    const logo = page.locator('img[alt="BLinkOS"]');
    await expect(logo).toBeVisible();
  });

  test('should display footer with links', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should navigate to login when clicking login button', async ({ page }) => {
    await page.goto('/');
    
    // Click login button
    const loginButton = page.locator('button:has-text("Login")');
    await loginButton.click();
    
    // Check if login modal appears
    const loginModal = page.locator('[data-testid="login-modal"]');
    await expect(loginModal).toBeVisible();
  });

  test('should display content sections', async ({ page }) => {
    await page.goto('/');
    
    // Scroll down to see content sections
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Check for GitHub section
    const githubSection = page.locator('h2:has-text("GitHub Repositories")');
    await expect(githubSection).toBeVisible();
  });

  test('should take screenshot of landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await expect(page).toHaveScreenshot('landing-page.png');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check if navbar is still visible
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    
    // Check if content is readable
    const title = page.locator('h1');
    await expect(title).toBeVisible();
  });
});
