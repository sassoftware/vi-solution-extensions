import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { control } from './page-event-hooks-mobile.control';
import {
  SmiWindow,
  isSasMobileWindowApi,
} from '@sassoftware/mobile-investigator';
import { PageEventHooksComponent } from '../shared/page-event-hooks.component';

@NgModule({
  imports: [CommonModule, FormsModule, PageEventHooksComponent],
  exports: [PageEventHooksComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName || '',
            createCustomElement(PageEventHooksComponent, {
              injector: injector,
            })
          );

          const smiWindow = window as SmiWindow;
          if (isSasMobileWindowApi(smiWindow.sas)) {
            smiWindow.sas.smi.config.registerSolutionExtension(control);
          } else {
            smiWindow.sas.vi.config.registerSolutionExtension(control);
          }
        };
      },
      deps: [Injector],
    },
  ],
})
export class PageEventHooksMobileModule {}
