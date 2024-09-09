import { test, expect } from '@playwright/test';

test('navigation to login page', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'image.png', fullPage: true });

  // await page.getByRole('button', { name: 'Accept all cookies' }).click();
  // await page.getByRole('navigation').getByRole('link', { name: 'Log in' }).click();

  // await expect(page).toHaveURL('https://accounts.evernote.com/login');
  // await page.locator('#email').pressSequentially(process.env.TEST_USER!);
  // const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  // await expect(continueButton).toBeEnabled();
  // await continueButton.click();

  // await expect(page).toHaveURL('https://accounts.evernote.com/login-with-password');

  // await page.getByPlaceholder('Password').pressSequentially(process.env.TEST_PASSWORD!);
  // await page.getByRole('img').nth(3).click();
  // await expect(continueButton).toBeEnabled();

  // await continueButton.click();

  // await page.waitForLoadState('domcontentloaded');
  // await page.waitForTimeout(1_000);
  // await expect(page).toHaveURL('https://www.evernote.com/client/web');
});
