import { test } from "@playwright/test";
import { FileUploadPage } from "../pages/FileUploadPage";
import { FileUploadedPage } from "../pages/FileUploadedPage";
import * as path from 'node:path';

test.describe("File Upload Tests", () => {
  test("should upload a text file successfully", async ({ page }) => {
    const fileUploaderPage = new FileUploadPage(page);
    const fileUploadedPage = new FileUploadedPage(page);
    
    await fileUploaderPage.openFileUploaderPage();
    await fileUploaderPage.createAndUploadTextFile("test-file.txt", "This is a test file");
    
    await fileUploadedPage.verifySuccessMessage();
    await fileUploadedPage.verifyFileUploaded("test-file.txt");
  });

  test("should upload an image file successfully", async ({ page }) => {
    const fileUploaderPage = new FileUploadPage(page);
    const fileUploadedPage = new FileUploadedPage(page);
    
    await fileUploaderPage.openFileUploaderPage();
    
    const imagePath = path.join(process.cwd(), 'fixtures', 'tunde.jpg');
    await fileUploaderPage.uploadFile(imagePath);
    
    await fileUploadedPage.verifySuccessMessage();
    await fileUploadedPage.verifyFileUploaded("tunde.jpg");
  });
  
  test("should upload by drag and drop", async ({ page }) => {
    const fileUploaderPage = new FileUploadPage(page);
    const fileUploadedPage = new FileUploadedPage(page);
    
    await fileUploaderPage.openFileUploaderPage();
    await fileUploaderPage.uploadWithDragAndDrop("drag-drop.txt", "This is a drag and drop test file");
    
    await fileUploadedPage.verifySuccessMessage();
    await fileUploadedPage.verifyFileUploaded("drag-drop.txt");
  });

  // Negative Tests
  test("should show error when uploading without selecting a file", async ({ page }) => {
    const fileUploaderPage = new FileUploadPage(page);
    const fileUploadedPage = new FileUploadedPage(page);
    
    await fileUploaderPage.openFileUploaderPage();
    await fileUploaderPage.uploadWithoutSelectingFile();
    
    await fileUploadedPage.verifyErrorMessage("Internal Server Error");
  });

  test("should handle network interruption gracefully", async ({ page }) => {
    const fileUploaderPage = new FileUploadPage(page);
    const fileUploadedPage = new FileUploadedPage(page);
    
    await fileUploaderPage.openFileUploaderPage();
    
    // Set up network interruption before upload
    await fileUploaderPage.setupNetworkInterruption();
    
    // Create and upload a file
    await fileUploaderPage.createAndUploadTextFile(
      "network-test.txt", 
      "This upload will be interrupted"
    );
    
    // Verify error message shown to user
    await fileUploadedPage.verifyNetworkFailure();
  });
});