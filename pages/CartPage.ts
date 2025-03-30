// cartPage.ts (Cart Page POM)

import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;
  private checkoutButton = '[data-test="checkout"]';
  private cartItems = '.cart_item'; // Adjust to match actual locator for cart items

  constructor(page: Page) {
    this.page = page;
  }

  // Method to click on the checkout button
  async proceedToCheckout(): Promise<void> {
    await this.page.locator(this.checkoutButton).click();
  }

  // Method to check the number of items in the cart
  async getCartItemCount(): Promise<number> {
    return await this.page.locator(this.cartItems).count();
  }
}
