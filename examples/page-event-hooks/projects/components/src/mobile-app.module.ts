import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PageEventHooksMobileModule } from './lib/page-event-hooks-mobile/page-event-hooks-mobile.module';

@NgModule({
    imports: [
    PageEventHooksMobileModule
  ],
    providers: []
})
export class MobileComponentsAppModule {}
