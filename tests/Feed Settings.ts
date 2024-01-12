import { Locator, Page } from '@playwright/test';

export class FeedSettingsePage {
  readonly page: Page;
  readonly unsubscribtions: Locator;
  readonly feed: Locator;
  readonly subscriptions: Locator;



  constructor(page: Page) {
    this.page = page; 
    this.feed = page.getByRole('link', { name: 'Настроить ленту' })
    this.subscriptions = page.getByRole('link', { name: 'Подписки' })
    this.unsubscribtions = page.getByText('Отпишитесь от пользователя или бренда, чтобы не видеть опубликованные ими пины. Мы не будем оповещать их об этом')
  
  }
}
