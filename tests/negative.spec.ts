import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { Login } from '../pages/login';  // Adjust path as needed


test.describe('Login Tests', () => {
  
  let browser: Browser;
  let page: Page;
  let context: BrowserContext;
  let loginPage: Login;


  test.beforeAll(async ({ browser: browserInstance }) => {
    // Launch browser and create context
    browser = browserInstance;
    context = await browser.newContext();  // BrowserContext
    page = await context.newPage();  // Page within the context
    loginPage = new Login(page);
     
  });

  test('Second Login Test', async () => {
    
    await context.clearCookies();  // Clear cookies for the current context

    // Reopen the login page (with cleared cache)
    await page.goto('https://www.saucedemo.com/');
    
    // Perform the second login
    await loginPage.login('new_user', 'new_password');
    
    // Add assertions to verify successful login for negative test
    // Verify if error message appears
const errorMessage = await loginPage.getErrorMessage(); //  getErrorMessage returns the error text
expect(errorMessage).toBe('Error message not found'); 
  });

  test.afterAll(async () => {
    // Close the browser once tests are finished
    await browser.close();
  });
});
