import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage.js';

test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    const email = 'suhanip@zignuts.com';
    const password = 'Test@123';

    // Perform login
    await loginPage.login(email, password);

    // Verify login was successful
    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).toBeTruthy();

    // Verify we're on the booking rules page
    expect(page.url()).toContain('booking-rules');
  });
});
