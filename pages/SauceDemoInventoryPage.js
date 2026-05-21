import { expect } from '@playwright/test';

export class SauceDemoInventoryPage {
  constructor(page) {
    this.page = page;

    // Locators for Sauce Demo inventory page
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
  }

  async selectSortOption(optionValue) {
    await this.sortDropdown.waitFor({ state: 'visible' });
    await this.sortDropdown.selectOption(optionValue);
    // Wait a brief period or wait for load state to ensure the page has re-sorted
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500); // safety buffer for rendering
  }

  async getProductNames() {
    await this.inventoryItemName.first().waitFor({ state: 'visible' });
    const nameElements = await this.inventoryItemName.all();
    const names = [];
    for (const el of nameElements) {
      const text = await el.textContent();
      if (text) {
        names.push(text.trim());
      }
    }
    return names;
  }

  async getProductPrices() {
    await this.inventoryItemPrice.first().waitFor({ state: 'visible' });
    const priceElements = await this.inventoryItemPrice.all();
    const prices = [];
    for (const el of priceElements) {
      const text = await el.textContent();
      if (text) {
        // Strip '$' and convert to number
        const priceNum = parseFloat(text.replace('$', '').trim());
        prices.push(priceNum);
      }
    }
    return prices;
  }
}
