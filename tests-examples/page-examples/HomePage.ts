import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly getLoginBtn: Locator;
  readonly getEmailBtn: Locator;
  readonly getPassword: Locator;
  readonly getSubmitbtn: Locator;
  readonly scrollButton: Locator;
  readonly exploreBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getLoginBtn = page
      .locator('[data-test-id="simple-login-button"]')
      .getByRole('button', { name: 'Log in' });
    this.getEmailBtn = page.getByPlaceholder('Email');
    this.getPassword = page.getByPlaceholder('Password');
    this.scrollButton = page.locator('[data-test-id="how-it-works-container"]');
    this.exploreBtn = page.getByRole('link', { name: 'Explore' }).nth(1);

    this.getSubmitbtn = page
      .locator('[data-test-id="registerFormSubmitButton"]')
      .getByRole('button', { name: 'Log in' });
  }

  async goto() {
    await this.page.goto('https://pinterest.com/');
  }
  async loginFunc() {
    await this.getLoginBtn.click();
    await this.getEmailBtn.fill('juliamoiisenko0@gmail.com ');
    await this.getEmailBtn.press('Enter');
    await this.getPassword.fill('12345qwe');
    await this.getSubmitbtn.press('Enter');
  }
}
