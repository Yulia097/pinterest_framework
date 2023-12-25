import { test, expect } from '@playwright/test';

// YTTFPadsxLv8btr;
// -pass;
// foxmargaret4811@gmail.com - gmail
//input[@id='email'] (//input[@id='email'])[1]
//input[@id='password'])[1]
//input[@id='birthdate'])[1]

test('has title', async ({ page }) => {
  await page.goto('https://www.pinterest.com/');
});
