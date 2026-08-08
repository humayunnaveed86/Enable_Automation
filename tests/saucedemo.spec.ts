// Single test, single browser session, no repeated steps.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { pageText, knownProducts } from '../data/testData.js';
import { toDataTestSlug } from '../Utils/utils.js';
import { SauceDemo, loginUser } from '../config/env.js';

test.describe('@e2e SauceDemo – Add Products in Cart', () => {
  test('Login->add two products->verify Your Cart', async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    const backpackSlug = toDataTestSlug(knownProducts.backpack);
    const bikeLightSlug = toDataTestSlug(knownProducts.bikeLight);

    // Open login page
    await login.goto();
    await login.login(loginUser.username, loginUser.password);

    // Step 1 - Verify successful login
    await expect(page).toHaveURL(SauceDemo.uiBaseUrl + '/inventory.html');
    await expect(products.pageTitle).toHaveText(pageText.productsTitle);

    // Step 2 – Add "Sauce Labs Backpack" to cart directly from the listing
    await products.addToCartButtonFor(backpackSlug).click();
    await expect(products.cartBadge).toHaveText('1');

    // Step 3 – Click the cart icon
    await products.openCart();
    await expect(page).toHaveURL(SauceDemo.uiBaseUrl + '/cart.html');
    await expect(cart.pageTitle).toHaveText(pageText.yourCartTitle);

    // Step 4 – Click "Continue Shopping" to return to the products page
    await cart.continueShoppingButton.click();
    await expect(page).toHaveURL(SauceDemo.uiBaseUrl + '/inventory.html');

    // Step 5 – Add "Sauce Labs Bike Light" to cart directly from the listing
    await products.addToCartButtonFor(bikeLightSlug).click();
    await expect(products.cartBadge).toHaveText('2');

    // Step 6 – Click the cart icon to view the cart
    await products.openCart();
    await expect(page).toHaveURL(SauceDemo.uiBaseUrl + '/cart.html');
    await expect(cart.pageTitle).toHaveText(pageText.yourCartTitle);

    // Verify both products made it into the cart
    await expect(cart.cartItems).toHaveCount(2);
    await expect(cart.cartItemNames).toContainText([
      knownProducts.backpack,
      knownProducts.bikeLight,
    ]);

    // Step 7 – Verify the required buttons are present
    await expect(cart.removeButtons).toHaveCount(2);
    await expect(cart.removeButtonFor(backpackSlug)).toBeVisible();
    await expect(cart.removeButtonFor(bikeLightSlug)).toBeVisible();

    // b. Continue Shopping
    await expect(cart.continueShoppingButton).toBeVisible();

    // c. Checkout
    await expect(cart.checkoutButton).toBeVisible();
  });
});
