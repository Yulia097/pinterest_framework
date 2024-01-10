import { Locator, Page } from '@playwright/test';

export class WelcomePage {
  readonly page: Page;
  readonly welcomePopUp: Locator;
  readonly profile: Locator;
  readonly nextButton: Locator;
  readonly countryCheckBox: Locator;
  readonly femaleCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomePopUp = page.getByRole('heading', {
      name: 'Welcome to Pinterest'
    });
    this.nextButton = page.getByLabel('Next');
    this.femaleCheckbox = page.getByLabel('Female');
    this.countryCheckBox = page.locator('#newUserLanguage');
  }
}
