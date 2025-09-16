import { Injector, NgModule, inject, provideAppInitializer } from "@angular/core";
import { CustomTextboxMobileComponent } from "./custom-textbox-mobile.component";
import { createCustomElement } from "@angular/elements";
import { control } from "./custom-textbox-mobile.control";
import { SmiWindow, isSasMobileWindowApi } from "@sassoftware/mobile-investigator";

@NgModule({
  imports: [CustomTextboxMobileComponent],
  exports: [CustomTextboxMobileComponent],
  providers: [
    provideAppInitializer(() => {
        const initializerFn = ((injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName || "",
            createCustomElement(CustomTextboxMobileComponent, { injector: injector })
          );

          const smiWindow = window as SmiWindow;
          if (isSasMobileWindowApi(smiWindow.sas)) {
            smiWindow.sas.smi.config.registerSolutionExtension(control);
          } else {
            smiWindow.sas.vi.config.registerSolutionExtension(control);
          }
        };
      })(inject(Injector));
        return initializerFn();
      })
  ]
})
export class CustomTextboxMobileModule {}
