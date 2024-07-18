import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DuplicateToolbarActionComponent } from "./duplicate-toolbar-action.component";
import { createCustomElement } from "@angular/elements";
import { control } from './duplicate-toolbar-action.control';
import { SviWindow } from "@sassoftware/vi-api";

@NgModule({
  imports: [CommonModule, FormsModule, DuplicateToolbarActionComponent],
  exports: [DuplicateToolbarActionComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName!,
            createCustomElement(DuplicateToolbarActionComponent, {injector: injector})
          );

          const sviWindow = window as SviWindow;
          sviWindow.sas.viInit.registerResourceBundle("duplicateToolbar", {"showAlert": {
            header: {txt: "Allow custom name during creation:"},
            true: {label: "True"},
            false: {label: "False"}
          },
            "titleKey": {
              header: {txt: "Title Key to update with new title"},
            }
          });
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      },
      deps: [Injector]
    }
  ]
})
export class DuplicateToolbarActionModule {
}
