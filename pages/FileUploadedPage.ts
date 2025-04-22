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
    // If page doesn't navigate to success page
    const currentUrl = this.page.url();
    expect(currentUrl).toContain("chrome-error://chromewebdata/");

    // If no success message is shown
    await expect(this.page.locator("text=File Uploaded!")).not.toBeVisible({
      timeout: 2000,
    });
  }
}
