import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { Login } from '../pages/login';  // Adjust path as needed
import { ProductPage } from '../pages/Product-filtering';
import { CartPage } from '../pages/CartPage';
import { shippingPage } from '../pages/shipping';

test.describe('Login Tests', () => {
  
  let browser: Browser;
  let page: Page;
  let context: BrowserContext;
  let loginPage: Login;
  let products: ProductPage;
  let cart: CartPage;
  let shiporder: shippingPage;

  test.beforeAll(async ({ browser: browserInstance }) => {
    // Launch browser and create context
    browser = browserInstance;
    context = await browser.newContext();  // BrowserContext
    page = await context.newPage();  // Page within the context
    loginPage = new Login(page);
     products = new ProductPage(page);
      cart = new CartPage(page);
   shiporder = new shippingPage(page);
  });

  test('Positive Login Test', async () => {
    // Navigate to the login page and perform login
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    const appLogo = page.locator('.app_logo');
    // Assertion to check if the logo contains the text "Swag Labs"
    await expect(appLogo).toHaveText('Swag Labs');
    // Step 2: Apply filter for low to high
  await products.filterProductsBy('Price (low to high)'); //  the sorting option 

  // Step 3: Get the filtered product names
  const filteredProducts = await products.getFilteredProductNames();
  console.log('Filtered products:', filteredProducts);

  // Step 4: Assert that the products are sorted correctly 
  expect(filteredProducts).toEqual(filteredProducts.sort()); // This is an  assertion

  // Optional: Check if a specific product is present after filtering
  const isProductPresent = await products.isProductPresent('Sauce Labs Backpack');
  expect(isProductPresent).toBe(true); // Adjust with the expected product name
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Step 3: Go to shopping cart and verify items
  await page.locator('[data-test="shopping-cart-link"]').click();
  const cartItemCount = await cart.getCartItemCount();
  expect(cartItemCount).toBe(2);  // Should have 2 items in the cart

  // Step 4: Proceed to checkout
  await cart.proceedToCheckout();

  // Step 5: Fill in shipping information
  await shiporder.fillShippingForm('Tester', 'Data', '2016');

  // Step 7: Click the checkout button
  await shiporder.continueToNextPage();

  // Step 8: Complete the checkout
  await shiporder.completeCheckout();

  // Step 9: Verify order confirmation
  await shiporder.verifyOrderConfirmation();
});


  test.afterAll(async () => {
    // Close the browser once tests are finished
    await browser.close();
  });

});