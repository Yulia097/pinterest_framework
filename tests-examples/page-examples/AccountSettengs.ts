import { expect, Locator, Page } from '@playwright/test';

export class AccountSettings {
  readonly page: Page;
  readonly accountManagement: Locator;
  readonly dropdownSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdownSelector = page.locator('//*[@id="accountBasicsCountry"]');
    this.accountManagement = page.getByRole('link', { name: 'Управление аккаунтом' });

  }

  async goto() {
    await this.page.goto('https://www.pinterest.com/settings/account-settings/');
  }

  async selectCountry(country: string) {
    await this.dropdownSelector.click();
    await this.dropdownSelector.selectOption({ label: country });
    await this.page.waitForTimeout(2000);
  }
}
