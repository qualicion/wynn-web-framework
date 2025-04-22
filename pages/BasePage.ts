import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  protected baseURL = "https://the-internet.herokuapp.com";

  constructor(page: Page) {
    this.page = page;
  }
  // Navigate to URL
  async openApplication(path = "") {
    await this.page.goto(`${this.baseURL}${path}`);
  }
}
