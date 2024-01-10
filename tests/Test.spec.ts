import { test, expect, chromium } from '@playwright/test';
import { AllAboutPinterestPage } from './AllAboutPinterestPage';
import { HomePage } from './HomePage';
import { ProfilePage } from './ProfilePage';
import { FoodPage } from './FoodPage';
import { LogoutPage } from './LogoutPage';
import { NewsPage } from './NewsPage';
import { RegistrationPage } from './RegistationPage';
import { WelcomePage } from './WelcomePage';
import { MessagesPage } from './Messages';
import { NotificationPage } from './NotificationsPage';

test('Login', async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  await login.goto();

  await login.loginFunc();
  await expect(profile.myProfileBtn).toBeVisible();
  await expect(profile.mainBtn).toBeVisible();
  await expect(profile.CreateBtn).toBeVisible();
  await profile.myProfileBtn.click();
  await expect(page).toHaveURL(/.*juliamoiisenko0/);
});

test('Go to Food Page', async ({ page }) => {
  const homePage = new HomePage(page);
  const foodPage = new FoodPage(page);

  await homePage.goto();
  await homePage.scrollButton.click();
  await expect(page).toHaveURL(/.*search/);
  await homePage.exploreBtn.click();
  expect(page.url()).toBe(
    'https://www.pinterest.com/ideas/food-and-drink/918530398158/'
  );
  await expect(foodPage.foodDescription).toBeVisible();
  await foodPage.exploreBtn.click();
  expect(page.url()).toBe('https://www.pinterest.com/ideas/');
});

test('Go to News Page', async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  const news = new NewsPage(page);
  await login.goto();
  await login.loginFunc();
  await expect(profile.questionBtn).toBeVisible({ timeout: 20000 });

  await profile.questionBtn.click();
  await expect(profile.popover).toBeVisible();

  const newPage = await news.openLinkInNewTab();
  await newPage.waitForLoadState('domcontentloaded');
  const newPageTitle = await newPage.title();
  console.log('Title of the new tab:', newPageTitle);
  await newPage.close();
});

test('Logging out', async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  const logout = new LogoutPage(page);

  await login.goto();
  await login.loginFunc();
  await profile.params.click();
  await logout.getLogoutBtn.click();
  expect(page.url()).toBe('https://www.pinterest.com/');
  await expect(login.scrollButton).toBeVisible();
});

test(' Go to About Us Page', async ({ page, context }) => {
  const login = new HomePage(page);
  const about = new AllAboutPinterestPage(page);
  await login.goto();
  const newPage = await about.openLinkInNewTab();
  await newPage.waitForLoadState('domcontentloaded');
  const newPageTitle = await newPage.title();
  console.log('Title of the new tab:', newPageTitle);
  await newPage.close();
});

test('Registration', async ({ page }) => {
  const registration = new RegistrationPage(page);
  const welcome = new WelcomePage(page);
  await registration.goto();
  await registration.signUpFunc();

  await expect(welcome.welcomePopUp).toBeVisible();
  await welcome.femaleCheckbox.check();
  await welcome.nextButton.click();
});

test('Go to Messages page', async ({ page }) => {
  const login = new HomePage(page);
  const message = new MessagesPage(page);
  await login.goto();

  await login.loginFunc();
  await message.getPic.click();
  await expect(message.writeMessage).toBeVisible();
});

test('Go to Notifications page', async ({ page }) => {
  const login = new HomePage(page);
  const notification = new NotificationPage(page);
  await login.goto();

  await login.loginFunc();
  await notification.notificationBtn.click();
  await expect(notification.updates).toBeVisible();
  await notification.updatesParams.click();
  await notification.deleteUpdates.click();
  await expect(notification.deletedMessage).toBeVisible();
});
