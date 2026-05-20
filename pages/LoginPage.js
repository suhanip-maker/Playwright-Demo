import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.emailInput = page.getByPlaceholder('Enter your official email address');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto() {
    await this.page.goto('https://test.app.shallwe-play.com/login/?returnUrl=%2Fbooking-rules%2F');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
    // Wait for navigation to complete after login
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async isLoginSuccessful() {
    // Check if we're redirected away from the login page
    const currentUrl = this.page.url();
    return currentUrl.includes('booking-rules');
  }
}

