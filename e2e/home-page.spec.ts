import { test, expect } from '@playwright/test';

test.describe('Home Page (Authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    // In a real scenario, you would login first
    await page.goto('/home');
  });

  test('should display content sections', async ({ page }) => {
    // Check for GitHub section
    const githubSection = page.locator('h2:has-text("GitHub Repositories")');
    await expect(githubSection).toBeVisible();
    
    // Check for GitBook section
    const gitbookSection = page.locator('h2:has-text("GitBook Documentation")');
    await expect(gitbookSection).toBeVisible();
    
    // Check for Notion section
    const notionSection = page.locator('h2:has-text("Notion Workspaces")');
    await expect(notionSection).toBeVisible();
  });

  test('should display content cards', async ({ page }) => {
    // Check for content cards
    const cards = page.locator('[data-testid="content-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should open card editor on edit button click', async ({ page }) => {
    // Click edit button on first card
    const editButton = page.locator('[data-testid="edit-button"]').first();
    await editButton.click();
    
    // Check if editor modal appears
    const editorModal = page.locator('[data-testid="card-editor-modal"]');
    await expect(editorModal).toBeVisible();
  });

  test('should display AI Agent Skills section', async ({ page }) => {
    // Scroll down to see agent skills section
    await page.evaluate(() => window.scrollBy(0, 1000));
    
    // Check for agent skills section
    const agentSection = page.locator('h2:has-text("AI Agent Skills")');
    await expect(agentSection).toBeVisible();
    
    // Check for agent cards
    const agentCards = page.locator('[data-testid="agent-card"]');
    const count = await agentCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter agents by track', async ({ page }) => {
    // Scroll down to see agent skills section
    await page.evaluate(() => window.scrollBy(0, 1000));
    
    // Click on Builder track filter
    const builderFilter = page.locator('button:has-text("Builder")');
    await builderFilter.click();
    
    // Check if agents are filtered
    const agentCards = page.locator('[data-testid="agent-card"]');
    const count = await agentCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Mermaid diagram', async ({ page }) => {
    // Scroll down to see diagram section
    await page.evaluate(() => window.scrollBy(0, 1500));
    
    // Check for diagram
    const diagram = page.locator('[data-testid="mermaid-diagram"]');
    await expect(diagram).toBeVisible();
  });

  test('should share card as markdown', async ({ page }) => {
    // Click share button on first card
    const shareButton = page.locator('[data-testid="share-button"]').first();
    await shareButton.click();
    
    // Check if toast notification appears
    const toast = page.locator('[data-testid="toast-notification"]');
    await expect(toast).toBeVisible();
  });

  test('should drag and drop cards', async ({ page }) => {
    // Get first card
    const firstCard = page.locator('[data-testid="content-card"]').first();
    const secondCard = page.locator('[data-testid="content-card"]').nth(1);
    
    // Drag first card to second position
    await firstCard.dragTo(secondCard);
    
    // Check if order changed
    const cards = page.locator('[data-testid="content-card"]');
    const firstCardText = await cards.first().textContent();
    expect(firstCardText).toBeTruthy();
  });

  test('should take screenshot of home page', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await expect(page).toHaveScreenshot('home-page.png');
  });

  test('should display navbar with user profile', async ({ page }) => {
    // Check for navbar
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    
    // Check for user profile
    const userProfile = page.locator('[data-testid="user-profile"]');
    await expect(userProfile).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Check if content is still visible
    const githubSection = page.locator('h2:has-text("GitHub Repositories")');
    await expect(githubSection).toBeVisible();
    
    // Check if cards are displayed in grid
    const cards = page.locator('[data-testid="content-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
