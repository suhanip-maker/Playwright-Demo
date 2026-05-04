import { chromium } from '@playwright/test';

async function inspectPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://test.app.shallwe-play.com/login/?returnUrl=%2Fbooking-rules%2F');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Log all inputs
  const inputs = await page.locator('input').all();
  console.log(`Found ${inputs.length} input elements`);
  
  for (let i = 0; i < inputs.length; i++) {
    const type = await inputs[i].getAttribute('type');
    const id = await inputs[i].getAttribute('id');
    const name = await inputs[i].getAttribute('name');
    const placeholder = await inputs[i].getAttribute('placeholder');
    console.log(`Input ${i}: type=${type}, id=${id}, name=${name}, placeholder=${placeholder}`);
  }
  
  // Log all buttons
  const buttons = await page.locator('button').all();
  console.log(`\nFound ${buttons.length} button elements`);
  
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const type = await buttons[i].getAttribute('type');
    console.log(`Button ${i}: text="${text}", type=${type}`);
  }
  
  // Keep browser open for inspection
  await page.pause();
  
  await browser.close();
}

inspectPage();
