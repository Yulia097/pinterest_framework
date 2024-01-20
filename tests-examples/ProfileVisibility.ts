import { expect, Page, Locator } from '@playwright/test';

export class ProfileVisibility {
  readonly page: Page;
  readonly privateProfileSwitch: Locator;
  readonly searchPrivacySwitch: Locator;
  readonly notNowBtn: Locator;
  readonly showBtn: Locator;
  readonly closeModalWindow: Locator;
  readonly profileVisiblity: Locator;
  readonly iUnderstandBtn: Locator;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.privateProfileSwitch = page.getByLabel('Частный профиль')
    this.searchPrivacySwitch = page.getByLabel('Конфиденциальность в поисковых системах')
    this.notNowBtn = page.getByRole('button', { name: 'Не сейчас' })
    this.showBtn = page.getByRole('button', { name: 'Просмотреть' })
    this.closeModalWindow = page.getByLabel('Закрыть модальное окно')
    this.profileVisiblity =page.getByRole('link', { name: 'Видимость профиля' })
    this.iUnderstandBtn = page.getByRole('button', { name: 'Я понимаю' })
    this.iUnderstandBtn = page.getByRole('button', { name: 'Сохранить' })
  }

async goto() {
  await this.page.goto('https://www.pinterest.com/settings/profile-visibility');
}
}