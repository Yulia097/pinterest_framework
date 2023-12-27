import { Locator, Page } from '@playwright/test';

export class NewsPage {
  readonly page: Page;
  readonly getLink: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page; // Ensure you store the page reference
    this.getLink = page.getByRole('link', {
      name: 'Новости ; Открывает новую вкладку'
    });
    this.title = page.locator('#title');
  }

  async goto() {
    await this.page.goto('https://newsroom.pinterest.com/');
  }

  async openLinkInNewTab() {
    await this.getLink.click();
    const [newPage] = await Promise.all([this.page.waitForEvent('popup')]);
    await newPage.bringToFront();
    return newPage;
  }
}
