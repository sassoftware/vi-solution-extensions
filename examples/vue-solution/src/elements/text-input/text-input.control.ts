import { ControlType } from "@sassoftware/vi-api/config/config-api";

export const control = {
    name: "vueTextInputExample",
    category: "Fields",
    directiveName: "vue-text-input-exmaple",
    customControl: true,
    displayName: {
        defaultText: "Vue Text Input"
    },
    controlDescription: {
        defaultText: "An example labelled text box solution extension control written in Vue"
    },
    controlAttributes: {
        attributes: {
            dataSource: {
                displayName: {
                    defaultText: "Data Source",
                    resourceKey: "controlTextInputAttrDataSource.txt"
                },
                order: 0,
                required: true,
                type: "DataSource"
            },
            multiLine: {
                displayName: {
                    defaultText: "Multi-line",
                    resourceKey: "controlAttrMultiLine.label.txt"
                },
                order: 2,
                type: "Checkbox"
            },
            "title.text": {
                displayName: {
                    defaultText: "Title Text",
                    resourceKey: "controlAttrTitleText.txt"
                },
                order: 1,
                type: "TextInput"
            },
            vueBorder: {
                displayName: {
                    defaultText: "Vue Border"
                },
                order: 3,
                type: "Checkbox"
            }
        },
        metadata: {
            iconClass: "textFieldIcon",
            renderAs: ControlType.WebComponent,
            states: {
                readOnly: true,
                required: true,
                disabled: true
            }
        }
    }
};