const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');
const { SauceDemoInventoryPage } = require('../pages/SauceDemoInventoryPage');

test.describe('SauceDemo Products Sorting / Filtering Tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    inventoryPage = new SauceDemoInventoryPage(page);

    // Log in with standard user
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBe(true);
  });

  test('Filter by Name (A to Z)', async () => {
    // Select sorting Name (A to Z) - "az"
    await inventoryPage.selectSortOption('az');

    // Get list of names
    const names = await inventoryPage.getProductNames();
    
    // Create sorted copy and assert they match
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test('Filter by Name (Z to A)', async () => {
    // Select sorting Name (Z to A) - "za"
    await inventoryPage.selectSortOption('za');

    // Get list of names
    const names = await inventoryPage.getProductNames();
    
    // Create sorted copy and reverse assert
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });

  test('Filter by Price (low to high)', async () => {
    // Select sorting Price (low to high) - "lohi"
    await inventoryPage.selectSortOption('lohi');

    // Get list of prices
    const prices = await inventoryPage.getProductPrices();
    
    // Create numerically sorted copy and assert
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Filter by Price (high to low)', async () => {
    // Select sorting Price (high to low) - "hilo"
    await inventoryPage.selectSortOption('hilo');

    // Get list of prices
    const prices = await inventoryPage.getProductPrices();
    
    // Create numerically sorted copy in descending order and assert
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});
