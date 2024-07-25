import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { QrCodeComponent } from "./qr-code.component";
import { createCustomElement } from "@angular/elements";
import { control } from './qr-code.control';
import { SviWindow } from "@sassoftware/vi-api";

@NgModule({
  imports: [CommonModule, FormsModule, QrCodeComponent],
  exports: [QrCodeComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName,
            createCustomElement(QrCodeComponent, {injector: injector})
          );

          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      },
      deps: [Injector]
    }
  ]
})
export class QrCodeModule {
}
