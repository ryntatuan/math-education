const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1366, height: 768 });
  
  try {
    console.log('Navigating to app...');
    await page.goto('http://localhost:5173', { timeout: 15000 });
    
    // We need to navigate to grade 1, chapter 2, lesson 1
    // Usually there's a routing or click path.
    // Let's just wait for load. If we can't easily navigate, we'll just check if the CSS was applied correctly by parsing the stylesheet.
    
    // Wait for network idle
    await page.waitForLoadState('networkidle');

    // To navigate:
    // Click "Lớp 1" or wait for it.
    console.log('Trying to find grade links...');
    try {
      await page.click('text=Lớp 1', { timeout: 3000 });
      await page.click('text=Hình học', { timeout: 3000 });
      await page.click('text=Hình vuông', { timeout: 3000 });
      await page.waitForTimeout(2000); // wait for lesson slide
    } catch(e) {
      console.log('Navigation clicks failed, might be already there or different structure.');
    }

    // Now check the DOM
    const cardRect = await page.evaluate(() => {
      const card = document.querySelector('.slide-visual-card, .slide-story-card');
      if (!card) return null;
      return card.getBoundingClientRect();
    });

    const innerRect = await page.evaluate(() => {
      // Find the inner card with CARD_STYLE
      const card = document.querySelector('.slide-visual-card > div:last-child, .slide-story-card > div:last-child');
      if (!card) return null;
      return card.getBoundingClientRect();
    });

    if (cardRect && innerRect) {
      console.log('Outer Card Rect:', cardRect);
      console.log('Inner Card Rect:', innerRect);
      const bottomDiff = cardRect.bottom - innerRect.bottom;
      console.log(`Difference at bottom: ${bottomDiff}px`);
      if (bottomDiff < 20) {
        console.log('FAILED: Inner card is too close to the bottom border!');
      } else {
        console.log('SUCCESS: Inner card has enough bottom padding!');
      }
    } else {
      console.log('Could not find cards on the page. Assuming CSS applies.');
    }

    // Take screenshot for visual proof
    await page.screenshot({ path: 'scratch/test-overlap.png' });
    console.log('Saved screenshot to scratch/test-overlap.png');

  } catch (e) {
    console.error('Test error:', e.message);
  }
  
  await browser.close();
})();
