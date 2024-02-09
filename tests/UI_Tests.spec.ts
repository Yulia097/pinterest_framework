import { test, expect, chromium } from '@playwright/test';
import { HomePage } from '../tests-examples/page-examples/HomePage';
import { ProfilePage } from '../tests-examples/page-examples/ProfilePage';
import { FoodPage } from '../tests-examples/page-examples/FoodPage';
import { LogoutPage } from '../tests-examples/page-examples/LogoutPage';
import { NewsPage } from '../tests-examples/page-examples/NewsPage';
import { RegistrationPage } from '../tests-examples/page-examples/RegistationPage';
import { WelcomePage } from '../tests-examples/page-examples/WelcomePage';
import { MessagesPage } from '../tests-examples/page-examples/Messages';
import { NotificationPage } from '../tests-examples/page-examples/NotificationsPage';
import { FeedSettingsePage } from '../tests-examples/page-examples/Feed Settings';
import { AllAboutPinterestPage } from '../tests-examples/page-examples/AllAboutPinterestPage'
import { AccountSettings } from '../tests-examples/page-examples/AccountSettengs';
import { ProfileVisibility } from '../tests-examples/ProfileVisibility';


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
  const expectedTitleSubstring = "Pinterest Predicts 2024: Today's 'cheat sheet' for tomorrow's trend";
  const newPageTitle = await newPage.title();
  expect(newPageTitle).toContain(expectedTitleSubstring);
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
  const expectedTitleSubstring = "Get back to inspiration";
  const newPageTitle = await newPage.title();
  expect(newPageTitle).toContain(expectedTitleSubstring);
  console.log('Title of the new tab:', newPageTitle);
  await newPage.close();
});

test('Registration', async ({ page }) => {
  const registration = new RegistrationPage(page);
  const welcome = new WelcomePage(page);
  await registration.goto();
  await registration.signUpFunc();

  await expect(welcome.welcomePopUp).toBeVisible();
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

test('Writing the message to the no user. Error message should be shown', async ({ page }) => {
  const login = new HomePage(page);
  const message = new MessagesPage(page);
  await login.goto();
  await login.loginFunc();
  await message.getPic.click();
  await expect(message.writeMessage).toBeVisible();
  await message.writeMessage.click();
  await message.messageText.fill("Kate");
  await expect(message.sendMessage).toBeVisible();
  await message.sendMessage.click();
  await expect(message.errorPopUp).toBeVisible();
});

test('Sending the message to the specific user.', async ({ page }) => {
  const login = new HomePage(page);
  const message = new MessagesPage(page);
  await login.goto();
  await login.loginFunc();
  await message.getPic.click();
  await expect(message.writeMessage).toBeVisible();
  await message.search.click();
  await message.search.fill('Cake');
  await expect(message.cakeBtn).toBeVisible();
  await message.cakeBtn.click();
  await message.messageText.fill("Tasty cakes");
  await expect(message.sendMessage).toBeVisible();
  await message.sendMessage.click();
  await expect(message.startConv).toBeVisible();

});

test("Adding the info in the user's profile", async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  await login.goto();
  await login.loginFunc();
  await profile.myProfileBtn.click();
  await profile.changeProfile.click();
  await profile.descriptionBtn.fill('This is my channel');
  await profile.saveChanges.click();
  await expect(profile.saveChanges).toBeDisabled();

});


test("Unsubsribing the channel", async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  const feed = new FeedSettingsePage(page);
  await login.goto();
  await login.loginFunc();
  await profile.params.click();
  await feed.feed.click();
  await feed.subscriptions.click();
  await expect(feed.unsubscribtions).toBeVisible()

});

test('Decline the message', async ({ page }) => {
  const login = new HomePage(page);
  const message = new MessagesPage(page);

  await login.goto();
  await login.loginFunc();
  await message.getPic.click();
  await expect(message.writeMessage).toBeVisible();
  await message.cakeBtn.click();
  await message.messageText.fill("Tasty cakes");
  await message.declineMsg.click();
  await expect(message.writeMessage).toBeVisible();
});

test('Dropdown Test', async ({ page }) => {
  const login = new HomePage(page);
  const accountSettings = new AccountSettings(page);
  const profile = new ProfilePage(page);

  await login.goto();
  await login.loginFunc();
  await profile.params.click();
  await expect(profile.settingsLine).toBeVisible();
  await profile.settingsLine.click();
  await accountSettings.accountManagement.click();

  const selectedCountry = 'Италия';
  await accountSettings.selectCountry(selectedCountry);

  const selectedOptionText = await page.evaluate(() => {
    const selectedOption = document.querySelectorпшеммкомсмс
    ('option[selected]');
    return selectedOption?.textContent?.trim();

});
expect(selectedOptionText).toBe(selectedCountry);
});


test('Checkboxes for privacy', async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  const profileVisibility = new ProfileVisibility(page)

  await login.goto();
  await login.loginFunc();
  await profile.params.click();
  await expect(profile.settingsLine).toBeVisible();
  await profile.settingsLine.click();
  await profileVisibility.profileVisiblity.click();
await profileVisibility.privateProfileSwitch.check();
await profileVisibility.notNowBtn.click();
expect(profileVisibility.privateProfileSwitch).toBeChecked();
await profileVisibility.searchPrivacySwitch.check();
await profileVisibility.iUnderstandBtn.click();
expect(profileVisibility.searchPrivacySwitch).toBeChecked();
await profileVisibility.saveBtn.click();
await expect(profileVisibility.saveBtn).toBeDisabled();
});


test('Edit notifications', async ({ page }) => {
  const login = new HomePage(page);
  const profile = new ProfilePage(page);
  const notificationPage = new NotificationPage(page)

  await login.goto();
  await login.loginFunc();
  await profile.params.click();
  await expect(profile.settingsLine).toBeVisible();
  await profile.settingsLine.click();
  
  await notificationPage.notificationsPage.click();
  await notificationPage.changeNotifications.click();
  await notificationPage.mentions.uncheck();
  await notificationPage.comments.uncheck();

  expect(notificationPage.comments).not.toBeChecked();
  expect(notificationPage.mentions).not.toBeChecked();
  
});