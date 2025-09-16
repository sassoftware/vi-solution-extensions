import { Injector, NgModule, inject, provideAppInitializer } from "@angular/core";
import { CustomTextboxDesktopComponent } from "./custom-textbox-desktop.component";
import { createCustomElement } from "@angular/elements";
import { control } from "./custom-textbox-desktop.control";
import { SviWindow } from "@sassoftware/vi-api";

@NgModule({
  imports: [CustomTextboxDesktopComponent],
  exports: [CustomTextboxDesktopComponent],
  providers: [
    provideAppInitializer(() => {
        const initializerFn = ((injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName,
            createCustomElement(CustomTextboxDesktopComponent, { injector: injector })
          );

          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      })(inject(Injector));
        return initializerFn();
      })
  ]
})
export class CustomTextboxDesktopModule {}
