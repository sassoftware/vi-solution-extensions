import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { IdentitySelectionExampleComponent } from "./identity-select.component";
import { createCustomElement } from "@angular/elements";
import { control } from "./identity-select.control";
import { SviWindow } from "@sassoftware/vi-api";

@NgModule({
  imports: [IdentitySelectionExampleComponent],
  exports: [IdentitySelectionExampleComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName,
            createCustomElement(IdentitySelectionExampleComponent, { injector: injector })
          );

          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      },
      deps: [Injector]
    }
  ]
})
export class IdentitySelectionExampleModule {}
