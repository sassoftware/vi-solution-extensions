import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { CustomTextboxDesktopComponent } from "./custom-textbox-desktop.component";
import { createCustomElement } from "@angular/elements";
import { control } from "./custom-textbox-desktop.control";
import { SviWindow } from "@sassoftware/vi-api";

@NgModule({
  imports: [CustomTextboxDesktopComponent],
  exports: [CustomTextboxDesktopComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName,
            createCustomElement(CustomTextboxDesktopComponent, { injector: injector })
          );

          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      },
      deps: [Injector]
    }
  ]
})
export class CustomTextboxDesktopModule {}
