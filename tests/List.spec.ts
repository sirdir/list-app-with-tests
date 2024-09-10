import { test, expect } from '@playwright/test';
import { setTimeout } from 'timers/promises';
import { readFileSync } from 'fs';

test('navigation to login page', async ({ page, context }) => {
  // 1. Login to Evernote:
  // I have skip login part, just think that creating authorization for local app is overkill
  // app saves notes to localstorage, that is enouth to close and reload the page with state persisted
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Create a New Note:
  const noteText = readFileSync('./tests/fixtures/note.txt', 'utf-8');
  const noteTitle = 'my note';
  await page.locator('#new-note-title').fill(noteTitle);
  await page.locator('#new-text-area').fill(noteText);

  // 3. Save the Note:
  await page.locator('#new-note-submit').click();
  await expect(page.locator('#completed h3.title-article')).toHaveText(noteTitle);
  await expect(page.locator('#completed p.text-article')).toHaveText(noteText);
  await expect(page).toHaveScreenshot({ fullPage: true });

  // 4. Close and Reopen the Page:
  await page.close();
  await setTimeout(1_000);

  const pageAfterReload = await context.newPage();
  await pageAfterReload.goto('/');

  // 5. Verify the Note's Persistence and Format:
  await expect(pageAfterReload.locator('#completed h3.title-article')).toHaveText(noteTitle);
  await expect(pageAfterReload.locator('#completed p.text-article')).toHaveText(noteText);
  await expect(pageAfterReload).toHaveScreenshot({ fullPage: true });
});
