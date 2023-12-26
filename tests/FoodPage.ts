import { expect, Locator, Page } from '@playwright/test';

export class FoodPage {
  readonly page: Page;
  readonly topSearches: Locator;
  readonly foodPageHeader: Locator;
  readonly topVideos: Locator;
  readonly exploreBtn: Locator;
  readonly foodDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topSearches = page.getByRole('heading', {
      name: 'Top Pinterest searches for'
    });
    this.foodPageHeader = page
      .locator('[data-test-id="ideas-hub-page-header"]')
      .getByRole('heading', { name: 'Food and Drinks' });
    this.topVideos = page.getByRole('heading', {
      name: 'Watch popular Food and drink'
    });
    this.exploreBtn = page.getByRole('link', { name: 'Explore' });
    this.foodDescription = page.getByText('Discover food and drink on');
  }
}
