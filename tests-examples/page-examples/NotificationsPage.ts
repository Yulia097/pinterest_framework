import { Locator, Page } from '@playwright/test';
export class NotificationPage {
  readonly page: Page;
  readonly notificationBtn: Locator;
  readonly updates: Locator;
  readonly updatesParams: Locator;
  readonly deleteUpdates: Locator;
  readonly deletedMessage: Locator;
  readonly notificationsPage: Locator;
  readonly changeNotifications: Locator;
  readonly mentions: Locator;
  readonly comments: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notificationBtn = page.getByLabel('Уведомл');
    this.updates = page.getByRole('heading', { name: 'Обновления' });
    this.notificationsPage = page.getByRole('link', { name: 'Уведомления' })

    this.mentions = page.getByText('Mentions')
    this.comments = page.getByText('Comments', { exact: true })
    this.updatesParams = page.getByLabel(
      'Параметры обновления настроек подписки'
    );
    this.changeNotifications = page.locator('[data-test-id="notifications-settings-on-pinterest-edit-button"]').getByRole('button', { name: 'Изменить' })
    this.deleteUpdates = page
      .locator('#dropdown_item_settings_id-item-0 div')
      .filter({ hasText: 'Удалить обновление' })
      .nth(4);

    this.deletedMessage = page.getByText('Обновление удалено.Отмена');
  }
}
