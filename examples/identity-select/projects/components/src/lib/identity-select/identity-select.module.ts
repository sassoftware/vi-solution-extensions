import { Injector, NgModule, inject, provideAppInitializer } from "@angular/core";
import { IdentitySelectionExampleComponent } from "./identity-select.component";
import { createCustomElement } from "@angular/elements";
import { control } from "./identity-select.control";
import { SviWindow } from "@sassoftware/vi-api";

@NgModule({
  imports: [IdentitySelectionExampleComponent],
  exports: [IdentitySelectionExampleComponent],
  providers: [
    provideAppInitializer(() => {
        const initializerFn = ((injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName,
            createCustomElement(IdentitySelectionExampleComponent, { injector: injector })
          );

          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      })(inject(Injector));
        return initializerFn();
      })
  ]
})
export class IdentitySelectionExampleModule {}
