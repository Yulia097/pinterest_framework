import { Locator, Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly getSignUp: Locator;
  readonly getEmailBtn: Locator;
  readonly getPassword: Locator;
  readonly getBirthDate: Locator;
  readonly getCreateBtn: Locator;
  readonly getLanguage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getSignUp = page.getByRole('button', { name: 'Sign up' });
    this.getEmailBtn = page.getByPlaceholder('Email');
    this.getPassword = page.getByPlaceholder('Create a password');
    this.getBirthDate = page
      .locator('[data-test-id="signup-birthdate-field"]')
      .getByLabel('Birthdate');
    this.getCreateBtn = page.getByLabel('Continue creating your');
    this.getLanguage = page.locator('#newUserLanguage');
  }
 
  async goto() {
    await this.page.goto('https://pinterest.com/');
  }

  async signUpFunc() {
    await this.getSignUp.click();
    await this.getEmailBtn.fill('foxmargaret4811@gmail.com');
    await this.getPassword.fill('wg21672rw;');
    await this.getBirthDate.fill('');
    await this.getBirthDate.press('2');
    await this.getBirthDate.press('1');
    await this.getBirthDate.press('.');
    await this.getBirthDate.press('0');
    await this.getBirthDate.press('1');
    await this.getBirthDate.press('.');
    await this.getBirthDate.press('2');
    await this.getBirthDate.press('0');
    await this.getBirthDate.press('0');
    await this.getBirthDate.press('0');
    await this.getCreateBtn.press('Enter');
  }
}
