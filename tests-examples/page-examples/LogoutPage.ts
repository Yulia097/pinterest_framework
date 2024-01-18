import { expect, Locator, Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly getLogoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getLogoutBtn = page
      .locator('[data-test-id="header-menu-options-logout"] div')
      .filter({ hasText: 'Выход' })
      .nth(4);
  }

  async goto() {
    await this.page.goto('https://pixabay.com/accounts/logout/');
  }
}
