import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageEventHooksDesktopModule } from './lib/page-event-hooks-desktop/page-event-hooks-desktop.module';

@NgModule({
  imports: [PageEventHooksDesktopModule],
  providers: [],
})
export class ComponentsAppModule {}
