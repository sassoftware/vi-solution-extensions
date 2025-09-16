import { Injector, NgModule, inject, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { control } from './page-event-hooks-desktop.control';
import { SviWindow } from '@sassoftware/vi-api';
import { PageEventHooksComponent } from '../shared/page-event-hooks.component';

@NgModule({
  imports: [CommonModule, FormsModule, PageEventHooksComponent],
  exports: [PageEventHooksComponent],
  providers: [
    provideAppInitializer(() => {
        const initializerFn = ((injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName || '',
            createCustomElement(PageEventHooksComponent, {
              injector: injector,
            })
          );

          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      })(inject(Injector));
        return initializerFn();
      }),
  ],
})
export class PageEventHooksDesktopModule {}
