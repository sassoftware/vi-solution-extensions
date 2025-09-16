import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule, inject, provideAppInitializer } from '@angular/core';
import { SviWindow } from '@sassoftware/vi-api';
import GoogleDocsIntegration from "./lib/document-manager-integration";

@NgModule({
  imports: [BrowserModule],
  providers: [
    provideAppInitializer(() => {
      const sviWindow = window as SviWindow;
      const google = new GoogleDocsIntegration();
      const docManagers = google.getDocumentManagers();
      docManagers.forEach((manager) => {
        // VI api method to register each document manager
        sviWindow.sas.vi.config.registerDocumentManager(manager);
      });
    })
  ],
})
export class ComponentsAppModule {}
