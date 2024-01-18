import { Locator, Page } from '@playwright/test';

export class AllAboutPinterestPage {
  readonly page: Page;
  readonly getLink: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page; // Ensure you store the page reference
    this.getLink = page.getByRole('link', { name: 'About ; Opens a new tab' });
    this.title = page.locator('#title');
  }

  async goto() {
    await this.page.goto(
      'https://help.pinterest.com/en/guide/all-about-pinterest'
    );
  }

  async openLinkInNewTab() {
    await this.getLink.click();
    const [newPage] = await Promise.all([this.page.waitForEvent('popup')]);
    await newPage.bringToFront();
    return newPage;
  }
}
