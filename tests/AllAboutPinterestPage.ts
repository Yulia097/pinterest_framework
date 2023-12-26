import { expect, type Locator, type Page } from '@playwright/test';

export class AllAboutPinterestPage {
  readonly page: Page;
  readonly getLink: Locator;

  constructor(page: Page) {
    this.getLink = page.getByRole('link', { name: 'About ; Opens a new tab' });
  }

  async goto() {
    await this.page.goto(
      'https://help.pinterest.com/en/guide/all-about-pinterest'
    );
  }
}
