const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');

test('Login to SauceDemo', async ({ page }) => {
    const SauceDemo = new SauceDemoLoginPage(page);
    //await SauceDemoLoginPage.goto("https://www.saucedemo.com/");
    
    await SauceDemo.goto();
    await SauceDemo.login("standard_user","secret_sauce");
    
});
