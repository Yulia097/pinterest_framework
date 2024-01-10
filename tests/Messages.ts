import { Locator, Page } from '@playwright/test';
export class MessagesPage {
  readonly page: Page;
  readonly getPic: Locator;
  readonly writeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPic = page.getByLabel('Сообщения');
    this.writeMessage = page.getByRole('button', {
      name: 'Создание нового сообщения Новое сообщение'
    });
  }
}
