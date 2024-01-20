import { expect, Locator, Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly CreateBtn: Locator;
  readonly myProfileBtn: Locator;
  readonly mainBtn: Locator;
  readonly questionBtn: Locator;
  readonly aboutUs: Locator;
  readonly popover: Locator;
  readonly params: Locator;
  readonly changeProfile: Locator;
  readonly descriptionBtn: Locator;
  readonly saveChanges: Locator;
  readonly settingsLine: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myProfileBtn = page.getByRole('link', { name: 'Юлия Письменная' });
    this.mainBtn = page.getByRole('link', { name: 'Главная' });
    this.CreateBtn = page.getByRole('link', { name: 'Создать' });
    this.questionBtn = page.getByRole('button', { name: 'Еще' });
    this.aboutUs = page.getByRole('link', {
      name: 'О нас ; Открывает новую вкладку'
    });
    this.popover = page.getByLabel('Popover');
    this.params = page.getByLabel('Аккаунты и другие параметры');
    this.changeProfile =page.getByRole('button', { name: 'Изменить профиль' })
    this.descriptionBtn =page.getByPlaceholder('Расскажите свою историю')
    this.saveChanges = page.getByRole('button', { name: 'Сохранить' })
    this.settingsLine = page.getByRole('link', { name: 'Настройки' })
  
  }

  async goto() {
    await this.page.goto('https://pixabay.com/users/u_wws3wu9p8o-41404537/');
  }
}
