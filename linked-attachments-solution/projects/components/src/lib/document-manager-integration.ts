import {
  SviAttachedFile,
  SviDocumentManager,
} from '@sassoftware/vi-api/config';

class DocumentManagerIntegration {

  /** 
   * Example of multiple document managers being added with the properties required by VI.
   * key - Not displayed on the UI but must be unique per document manager as it is used as an identifier.
   * displayName - The name of the document manager. This will be displayed in the dropdown list of the VI attachments manager.
   * onClick - The method triggered when clicking the dropdown item. Requires a callback method param accepting a list of files.
   * This callback will contain the VI method of adding the files to the attachments manager
   */ 

  getDocumentManagers(): SviDocumentManager[] {
    const docManagers: SviDocumentManager[] = [
      {
        key: 'docManager1',
        displayName: 'Document manager 1',
        onClick: (onFilesAdded: (files: SviAttachedFile[]) => void) =>
          this.onSingleClick(onFilesAdded),
      },
      {
        key: 'docManager2',
        displayName: 'Document manager 2',
        onClick: (onFilesAdded: (files: SviAttachedFile[]) => void) =>
          this.onMultipleClick(onFilesAdded),
      }
    ];

    return docManagers;
  }

  /** 
   * Example of single linked attachment returned
   * fileName - The name of the file. This will be displayed on the attachments grid unless edited in VI. Its will also be saved as the original file name.
   * link - The link to be accessed when a linked attachment is opened.
   * type - The media type of the file
   * content - Any content that has to be added for indexing and search purposes. This is an optional property.
   * size - The size of the attachment
   */
  private onSingleClick(onFilesAdded: (files: SviAttachedFile[]) => void) {

    /**
     * Launch UI for document manager selection here and have it return the correct JSON
     */

    // Mock JSON expected to be returned from document manager UI selection when one file is selected.
    const file: SviAttachedFile[] = [{
        fileName: "test_file_1.txt",
        link: "https://drive.google.com/file/d/1CrDON-qBaAWgHUhERRsdelYbKSNzymX8/view?usp=sharing",
        type: "text/plain",
        content: 'This is a text file',
        size: 4,
      }];

    onFilesAdded(file);
  }

  // Example of multiple linked attachments returned
  private onMultipleClick(onFilesAdded: (files: SviAttachedFile[]) => void) {

    /**
     * Launch UI for document manager selection here and have it return the correct JSON
     */

    // Mock JSON expected to be returned from document manager UI selection when multiple files are selected.
    const files: SviAttachedFile[] = [
      {
        fileName: "test_file_1.txt",
        link: "https://drive.google.com/file/d/1CrDON-qBaAWgHUhERRsdelYbKSNzymX8/view?usp=sharing",
        type: "text/plain",
        content: 'This is a text file',
        size: 4
      },
      {
        fileName: "test_file_2.docx",
        link: "https://docs.google.com/document/d/1Sf94fpDtyBNcYzGrgHAKQ-3K8mKdBOqM/edit?usp=sharing&ouid=116453983377682866866&rtpof=true&sd=true",
        type: "application/vnd.openxmlformats",
        content: 'This is a word document',
        size: 11.8
      },
      {
        fileName: "test_file_3.png",
        link: "https://drive.google.com/file/d/14tWl8mzGc4rR0RJeUQq8RuPPt-1W0wtx/view?usp=sharing",
        type: "image/png",
        content: 'This is an image',
        size: 17.2
      },
    ];

    onFilesAdded(files);
  }
}

export default DocumentManagerIntegration;
