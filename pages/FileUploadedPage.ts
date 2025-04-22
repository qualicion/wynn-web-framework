import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FileUploadedPage extends BasePage {
  // Assertions
  async verifySuccessMessage() {
    await expect(this.page.locator("text=File Uploaded!")).toBeVisible({
      timeout: 10000,
    });
  }

  async verifyFileUploaded(fileName: string) {
    await expect(this.page.locator(`text=${fileName}`)).toBeVisible();
  }

  async verifyErrorMessage(message: string) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible({
      timeout: 5000,
    });
  }

  async verifyNetworkFailure() {
    const currentUrl = this.page.url();

    // To handle chrome error
    if (currentUrl.includes('chrome-error://chromewebdata/')) {
      console.log('Chrome-specific network error page detected');
      return;
    }
    
    expect(currentUrl).toContain("/upload");
    await expect(this.page.locator("text=File Uploaded!")).not.toBeVisible({
      timeout: 2000,
    });
  }
}
