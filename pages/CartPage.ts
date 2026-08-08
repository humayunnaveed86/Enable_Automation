import { type Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;

  // Buttons required to exist on the cart page
  readonly removeButtons: Locator; // one per product – data-test="remove-*"
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.cart_item .inventory_item_name');

    this.removeButtons = page.locator('button[data-test^="remove-"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // navigate directly to the cart page
  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  // Remove button scoped to a single product by its data-test slug
  removeButtonFor(productSlug: string): Locator {
    return this.page.locator(`[data-test="remove-${productSlug}"]`);
  }
}