const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');

test('Login to SauceDemo', async ({ page }) => {
    const SauceDemo = new SauceDemoLoginPage(page);
    //await SauceDemoLoginPage.goto("https://www.saucedemo.com/");

    await SauceDemo.goto();
    await SauceDemo.login("standard_user", "secret_sauce");

});
test('login to saucedemo with invaild credentials', async ({ page }) => {
    const SauceDemo = new SauceDemoLoginPage(page);
    //login with invaild credentials

    await SauceDemo.goto();
    await SauceDemo.login("standard_us", "secret_sauce");
    await SauceDemo.getErrorMessage();
});
test('login to saucedemo without enter username and password credentials', async ({ page }) => {
    const SauceDemo = new SauceDemoLoginPage(page);
    //login without enter username and password credentials

    await SauceDemo.goto();
    await SauceDemo.login("", "");
    await SauceDemo.getErrorMessage();
}); 