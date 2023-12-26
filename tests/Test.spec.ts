import { test, expect } from '@playwright/test';
import { AllAboutPinterestPage } from './AllAboutPinterestPage';
import { HomePage } from './HomePage';
import { ProfilePage } from './ProfilePage';
import { FoodPage } from './FoodPage';
import { LogoutPage } from './LogoutPage';

test('1', async ({ page }) => {
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

test('2', async ({ page }) => {
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

test('3', async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  await login.goto();
  await login.loginFunc();
  await profile.questionBtn.click();
  await expect(profile.popover).toBeVisible();
  await profile.aboutUs.click();
  expect(page.url()).toBe(
    'https://help.pinterest.com/ru/guide/all-about-pinterest'
  );
});

test('4', async ({ page }) => {
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

test('5', async ({ page }) => {
  const login = new HomePage(page);
  login.goto();
  const about = new AllAboutPinterestPage(page);
  await about.getLink.click();
  expect(page.url()).toBe(
    'https://help.pinterest.com/en/guide/all-about-pinterest'
  );
});
