import { expect, type Locator, type Page } from '@playwright/test';

export class AppMainPage {
  readonly page: Page;
  readonly addNoteTitle: Locator;
  readonly addNoteText: Locator;
  readonly addNoteButton: Locator;
  readonly noteTitle: Locator;
  readonly noteText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNoteTitle = page.locator('#new-note-title');
    this.addNoteText = page.locator('#new-text-area');
    this.addNoteButton = page.locator('#new-note-submit');
    this.noteTitle = page.locator('#completed h3.title-article');
    this.noteText = page.locator('#completed p.text-article');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async createNewNote(title: string, text: string): Promise<void> {
    await this.addNoteTitle.fill(title);
    await this.addNoteText.fill(text);
    await this.addNoteButton.click();
  }
}
