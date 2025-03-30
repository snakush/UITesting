// productPage.ts (Product POM)

import { Page } from '@playwright/test';

export class ProductPage {
  private page: Page;
  private filterDropdown = '[data-test="product-sort-container"]'; // dropdown's locator
  private productItems = '.inventory_item'; //  product items locator
  private productName = '.inventory_item_name'; //  product name locator

  constructor(page: Page) {
    this.page = page;
  }

  // Method to filter products by sorting
  async filterProductsBy(sortOption: string): Promise<void> {
    await this.page.selectOption(this.filterDropdown, { label: sortOption });
  }

  // Method to get a list of product names after filtering
  async getFilteredProductNames(): Promise<string[]> {
    const productElements = await this.page.locator(this.productItems).all();
    const productNames: string[] = []; 
    // Specify the type explicitly

    for (let i = 0; i < productElements.length; i++) {
      const name = await productElements[i].locator(this.productName).innerText();
      productNames.push(name);
    }
    return productNames;
  }

  // Method to verify if a specific product is present after filtering
  async isProductPresent(productName: string): Promise<boolean> {
    const productNames = await this.getFilteredProductNames();
    return productNames.includes(productName);
  }
}
