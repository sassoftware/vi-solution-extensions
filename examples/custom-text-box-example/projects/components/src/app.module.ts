import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomTextboxDesktopModule } from './lib/custom-textbox-desktop/custom-textbox-desktop.module';

@NgModule({
  imports: [
    CustomTextboxDesktopModule
  ],
  providers: [],
})
export class ComponentsAppModule {
}
