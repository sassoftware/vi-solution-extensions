import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CustomTextboxMobileModule } from './lib/custom-textbox-mobile/custom-textbox-mobile.module';

@NgModule({
    imports: [
    CustomTextboxMobileModule
  ],
    providers: []
})
export class MobileComponentsAppModule {}
