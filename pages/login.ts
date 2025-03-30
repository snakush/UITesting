import { Page, Locator, expect } from '@playwright/test';

export class Login {
  private page: Page;

  // Selectors
  private usernameInput = '[data-test="username"]'; 
  private passwordInput = '[data-test="password"]'; 
  private loginButton = '[data-test="login-button"]'; 
  private errorMessage = '.error-message';

  constructor(page: Page) {
    this.page = page;
    
  }

  // Method to enter the username
  async enterUsername(username: string) {
    try {
      console.log('Waiting for the page to load completely...');
      await this.page.waitForLoadState('domcontentloaded');  // Ensure the page is loaded

      console.log('Waiting for the username input to be visible...');
      await this.page.waitForSelector(this.usernameInput, { state: 'visible', timeout: 50000 });
      
      console.log('Filling in the username...');
      await this.page.locator(this.usernameInput).fill(username);
      console.log('Username entered successfully');
    } catch (error) {
      console.error(`Error while entering username: ${error.message}`);
      throw error;
    }
  }

  // Method to enter the password
  async enterPassword(password: string) {
    try {
      console.log('Waiting for the password input to be visible...');
      await this.page.waitForSelector(this.passwordInput, { state: 'visible', timeout: 50000 });
      
      console.log('Filling in the password...');
      await this.page.locator(this.passwordInput).fill(password);
      console.log('Password entered successfully');
    } catch (error) {
      console.error(`Error while entering password: ${error.message}`);
      throw error;
    }
  }

  // Method to click the login button
  async clickLoginButton() {
    try {
      console.log('Clicking the login button...');
      await this.page.locator(this.loginButton).click();
      console.log('Login button clicked');
    } catch (error) {
      console.error(`Error while clicking login button: ${error.message}`);
      throw error;
    }
  }

  // Method to perform the login action
  async login(username: string, password: string, ) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
      

  }

  // Method to get the error message text
  async getErrorMessage(): Promise<string> {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 6000 });
      return await this.page.locator(this.errorMessage).innerText();
    } catch (error) {
      console.error('Error message not found.');
      return 'Error message not found';
    }
  }
}
