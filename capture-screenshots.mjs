import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const screenshotDir = './docs/screenshots';

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.createContext();
  const page = await context.newPage();

  try {
    console.log('📸 Capturing Landing Page...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotDir, '01-landing-page.png'), fullPage: true });
    console.log('✅ Landing page screenshot saved');

    console.log('📸 Capturing Hero Section...');
    await page.screenshot({ path: path.join(screenshotDir, '02-hero-section.png'), fullPage: false });
    console.log('✅ Hero section screenshot saved');

    console.log('📸 Capturing Content Cards Section...');
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(screenshotDir, '03-content-cards.png'), fullPage: false });
    console.log('✅ Content cards screenshot saved');

  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
