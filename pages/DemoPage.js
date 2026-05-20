import { expect } from '@playwright/test';

export class DemoPage {
    constructor(page) {
        this.page = page;
        //locators for demo page
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
        await this.page.waitForLoadState('networkidle');
        // Wait for form to be ready
        await this.page.waitForSelector('#user-name');
    }
    async login(email, password) {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.passwordInput.waitFor({ state: 'visible' });
        
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.passwordInput.press('Enter');
        
        // Wait for navigation to complete after login
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }
    async isLoginSuccessful() {
        // Check if we're redirected to inventory page
        const currentUrl = this.page.url();
        return currentUrl.includes('/inventory.html');
    }
    async getErrorMessage() {
        try {
            await this.errorMessage.waitFor({ timeout: 5000 });
            return await this.errorMessage.textContent();
        } catch {
            return null;
        }
    }
}