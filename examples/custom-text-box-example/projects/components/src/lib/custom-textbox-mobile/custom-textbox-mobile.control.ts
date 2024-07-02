import { Control } from "@sassoftware/mobile-investigator/src/app/mobile/api/config";
import { ControlType } from "@sassoftware/vi-api/config";

export const control: Control = {
    category: "MobileObjectControls",
    controlDescription: {
        defaultText: "customTextbox"
    },
    directiveName: "mobile-sol-custom-textbox",
    reInitializeBehaviour: { type: "never" },
    displayName: {
        defaultText: "Custom Text Box Mobile Example"
    },
    name: "Custom Text Box Mobile Example",
    controlAttributes: {
        attributes: {
            dataSource: {
                displayName: {
                    defaultText: "Data source:"
                },
                type: "DataSource",
                required: true
            },
            "title.text": {
                defaultValue: {
                    defaultText: "Custom Text Box Mobile Example"
                },
                displayName: {
                    defaultText: "Title text:"
                },
                type: "TextInput"
            },
            multiLine: {
                displayName: {
                    defaultText: "Multi-Line"
                },
                type: "Checkbox"
            },
            defaultValue: {
                disabledExpression: "!dataSource || readOnlyDataSourceExists",
                displayName: {
                    defaultText: "Default value:"
                },
                ...{ hideOnDisable: true }, // hideOnDisable is not on SolutionExtension type.
                ...{ multiLine: "{{multiLine}}" }, // multiLine is not on SolutionExtension type.
                type: "TextInput"
            }
        },
        metadata: {
            renderAs: ControlType.WebComponent,
            states: {
                readOnly: true,
                hidden: true,
                required: true,
                disabled: true
            },
            iconClass: "textFieldIcon"
        }
    }
};
