import { type Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Step 1 – navigate to https://www.saucedemo.com/
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  // Step 2 – log in with the given credentials
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.waitFor({ state: 'visible' });

    // Clear first – guards against stray browser autofill or leftover text
    await this.usernameInput.fill('');
    await this.usernameInput.fill(username);

    await this.passwordInput.fill('');
    await this.passwordInput.fill(password);

    // Fail fast, with a clear message, if the fields don't hold what we just
    // set — better than submitting the wrong credentials and getting a
    // confusing "Epic sadface" error further down the test.
    await expect(this.usernameInput, 'Username field did not hold the expected value before submit').toHaveValue(username);
    await expect(this.passwordInput, 'Password field did not hold the expected value before submit').toHaveValue(password);

    await this.loginButton.click();
  }
}