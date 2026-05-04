import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage.js';

test.describe('Sauce Demo Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    await loginPage.goto();
  });

  test('should load login page', async ({ page }) => {
    // Just check if the page loads
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    const email = 'standard_user';
    const password = 'secret_sauce';

    // Perform login
    await loginPage.login(email, password);

    // Verify login was successful
    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).toBeTruthy();

    // Verify we're on the inventory page
    expect(page.url()).toContain('/inventory.html');
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const email = 'invalid@test.com';
    const password = 'wrongpassword';

    // Perform login
    await loginPage.login(email, password);

    // Wait a bit for error message to appear
    await page.waitForTimeout(2000);

    // Check if we're still on login page or error message appears
    const stillOnLoginPage = page.url().includes('/login');
    const errorMsg = await loginPage.getErrorMessage();

    expect(stillOnLoginPage || errorMsg).toBeTruthy();
  });
});