import { ControlType } from "@sassoftware/vi-api/config";

export const control = {
    category: "Fields",
    controlDescription: {
        defaultText: "Custom Textbox Desktop Example"
    },
    directiveName: "sol-desktop-custom-textbox",
    displayName: {
        defaultText: "Custom Textbox Desktop Example"
    },
    name: "Custom Textbox Desktop Example",
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
                    defaultText: "Custom Text Box Desktop Example"
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
            height: {
                defaultValue: "100px",
                disabledExpression: "!multiLine",
                displayName: {
                    defaultText: "Height"
                },
                states: {
                    hideResizeByContent: true
                },
                type: "HeightEditor"
            },
            inputWidthCSSClass: {
                displayName: {
                    defaultText: "Width"
                },
                picklistName: "INPUT_LENGTH_OPTIONS",
                type: "Picklist"
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
