import { type Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly productLinks: Locator; // clickable product name links
  readonly addToCartButtons: Locator; // all "Add to cart" buttons on the listing

  // Header cart icon + badge
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.productLinks = page.locator('.inventory_item_name');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart-"]');

    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // navigate directly to the inventory page
  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  // Step 3 – open a product's detail page by its position in the listing (0-based)
  async openProductByIndex(index: number): Promise<string> {
    const name = await this.productLinks.nth(index).innerText();
    await this.productLinks.nth(index).click();
    return name;
  }

  // open the cart page via the header cart icon
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  // "Add to cart" button for a single product on the listing, scoped by its
  // data-test slug (e.g. "sauce-labs-backpack") — lets a product be added
  addToCartButtonFor(productSlug: string): Locator {
    return this.page.locator(`[data-test="add-to-cart-${productSlug}"]`);
  }
}