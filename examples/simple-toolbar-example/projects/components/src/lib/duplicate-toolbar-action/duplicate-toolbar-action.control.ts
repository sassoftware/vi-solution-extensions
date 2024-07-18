import { ControlType, SolutionExtension } from "@sassoftware/vi-api/config";
import { SolutionExtensionAttribute } from "@sassoftware/vi-api/config/config-api";

export const control: SolutionExtension = {
  category: "ToolbarItems",
  controlDescription: {
    defaultText: "Example Toolbar Control - Duplicate Object"
  },
  directiveName: "sol-duplicate-toolbar-action",
  displayName: {
    defaultText: "Example Toolbar Control - Duplicate Object"
  },
  name: "Duplicate",
  controlAttributes: {
    attributes: {
      newTitleKey: {
        required: false,
        displayName: {
          defaultText: "Field name which will be renamed (leave blank for no renaming):",
          resourceKey: "duplicateToolbar.titleKey.header.txt"
        },
        type: "TextInput",
        order: 1
      },
      showAlertBeforeClone: {
        disabledExpression: "!newTitleKey",
        displayName: {
          defaultText: "Allow custom name during creation:",
          resourceKey: "duplicateToolbar.showAlert.header.txt"
        },
        defaultValue: true,
        type: "RadioChooser",
        radioConfig: {
          inline: false,
          options: [
            {
              value: false,
              resourceKey: "duplicateToolbar.showAlert.false.label"
            },
            {
              value: true,
              resourceKey: "duplicateToolbar.showAlert.true.label"
            }
          ]
        },
        order: 2
        // SolutionExtensionAttribute API will be improved at a later version to understand type:"RadioChooser" has .radioConfig.
      } as SolutionExtensionAttribute & {radioConfig: any}
    },
    metadata: {
      renderAs: ControlType.WebComponent,
      states: {
        readOnly: true,
        required: true
      }
    }
  }
};
