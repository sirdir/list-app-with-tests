import { test, expect } from '@playwright/test';
import { setTimeout } from 'timers/promises';
import { readFileSync } from 'fs';
import { AppMainPage } from './pages';

test('navigation to login page', async ({ page, context }) => {
  // 1. Login to Evernote:
  // I have skip login part, just think that creating authorization for local app is overkill
  // app saves notes to localstorage, that is enouth to close and reload the page with state persisted
  const mainPage = new AppMainPage(page);
  await mainPage.goto();

  // 2. Create a New Note:
  // AND
  // 3. Save the Note:
  const noteText = readFileSync('./tests/fixtures/note.txt', 'utf-8');
  const noteTitle = 'my note';
  await mainPage.createNewNote(noteTitle, noteText);

  await expect(mainPage.noteTitle).toHaveText(noteTitle);
  await expect(mainPage.noteText).toHaveText(noteText);
  await expect(mainPage.page).toHaveScreenshot({ fullPage: true });

  // 4. Close and Reopen the Page:
  await mainPage.page.close();
  await setTimeout(1_000);

  const newPage = await context.newPage();
  const mainPageAfterReload = new AppMainPage(newPage);
  await mainPageAfterReload.goto();

  // 5. Verify the Note's Persistence and Format:
  await expect(mainPageAfterReload.noteTitle).toHaveText(noteTitle);
  await expect(mainPageAfterReload.noteText).toHaveText(noteText);
  await expect(mainPageAfterReload.page).toHaveScreenshot({ fullPage: true });
});
