import { BasePage } from "./BasePage";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

export class FileUploadPage extends BasePage {
  private fileInput = "#file-upload";
  private uploadButton = "#file-submit";
  private dropZone = "#drag-drop-upload";


  async openFileUploaderPage() {
    await this.openApplication("/upload");
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles(this.fileInput, filePath);
    await this.page.click(this.uploadButton);
  }

  async createAndUploadTextFile(fileName: string, content: string) {
    const filePath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(filePath, content);
    await this.uploadFile(filePath);
    return filePath;
  }

  async uploadWithoutSelectingFile() {
    await this.page.click(this.uploadButton);
  }

  async uploadWithDragAndDrop(fileName: string, content: string) {
    // Create file to upload
    const filePath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(filePath, content);

    const dropZoneElement = this.page.locator(this.dropZone);

    await dropZoneElement.evaluate((element) => {
      element.classList.add("hover");
    });

    // Simulate drag and drop by setting input files
    await this.page.setInputFiles(this.fileInput, filePath);

    await dropZoneElement.evaluate((element) => {
      element.classList.remove("hover");
    });

    await this.page.click(this.uploadButton);
    return filePath;
  }

  async setupNetworkInterruption() {
    // Setup network interception to simulate connection interruption
    await this.page.route("**/upload", (route) => {
      route.abort("failed");
    });
  }
}
