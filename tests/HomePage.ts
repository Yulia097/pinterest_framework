import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly getLoginBtn: Locator;
  readonly getEmailBtn: Locator;
  readonly getPassword: Locator;
  readonly getSubmitbtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getLoginBtn = page
      .locator('[data-test-id="simple-login-button"]')
      .getByRole('button', { name: 'Log in' });
    this.getEmailBtn = page.getByRole('textbox', { name: 'example@gmail.com' });
    this.getPassword = page.locator('input[name="login_pass"]');
  }

  async goto() {
    await this.page.goto('https://pinterest.com/');
  }
  async loginFunc() {
    await this.getLoginBtn.click();
    await this.getEmailBtn.fill('juliamoiisenko0@gmail.com');
    await this.getEmailBtn.press('Enter');
    await this.getPassword.fill('12345qwe');
    await this.getPassword.press('Enter');
  }
}
