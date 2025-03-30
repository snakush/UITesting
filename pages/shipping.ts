// shippingPage.ts (Shipping Page POM)

import { Page, Locator, expect } from '@playwright/test';

export class shippingPage {
  private page: Page;
  private firstNameField = '[data-test="firstName"]';
  private lastNameField = '[data-test="lastName"]';
  private postalCodeField = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private summaryInfo = '.summary_info';  //  class exists for summary
  private completeHeader = '.complete-header'; // class exists for confirmation message
  private checkoutButton = '[data-test="checkout"]'; // Checkout button locator 

  constructor(page: Page) {
    this.page = page;
  }

  // Method to fill out the shipping form
  async fillShippingForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.postalCodeField).fill(postalCode);
  }

  // Method to click on the checkout button
  async clickCheckoutButton(): Promise<void> {
    await this.page.locator(this.checkoutButton).click();
    // Wait for the checkout page to load
    await this.page.waitForSelector(this.summaryInfo);  // Ensure summary information is loaded
  }

  // Method to proceed to the next step after filling the shipping form
  async continueToNextPage(): Promise<void> {
    await this.page.locator(this.continueButton).click();
    // Wait for the next page to load or a specific element to appear
    await this.page.waitForSelector(this.summaryInfo);  // Ensure summaryInfo is visible before proceeding
  }

  // Method to complete the checkout process
  async completeCheckout(): Promise<void> {
    await this.page.locator(this.finishButton).click();
    // Wait for the confirmation page to load
    await this.page.waitForSelector(this.completeHeader);  // Ensure completeHeader element is visible
  }

  // Method to verify the shipping details summary
  async verifyShippingSummary(firstName: string, lastName: string, postalCode: string): Promise<void> {
    // Wait for the summary info to be visible before accessing it
    const shippingInfo = await this.page.locator(this.summaryInfo).innerText();
    expect(shippingInfo).toContain(`${firstName} ${lastName}`);
    expect(shippingInfo).toContain(postalCode);
  }

  // Method to verify the confirmation message after completion
  async verifyOrderConfirmation(): Promise<void> {
    // Wait for the confirmation message to be visible
    await this.page.locator(this.completeHeader).waitFor({ state: 'visible' });
    const confirmationMessage = await this.page.locator(this.completeHeader).innerText();
    expect(confirmationMessage).toContain('Thank you for your order!');
  }
}
