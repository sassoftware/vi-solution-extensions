import { ControlType } from "@sassoftware/vi-api/config";

export const control = {
  category: "Fields",
  controlDescription: {
    defaultText: "QR Code Example"
  },
  directiveName: "qr-code",
  displayName: {
    defaultText: "QR Code Example"
  },
  name: "qrCode",
  controlAttributes: {
    attributes: {
      "title.text": {
        "displayName": {
          "defaultText": "Title:",
          "resourceKey": "qr.prop.title.label"
        },
        "defaultValue": "QR Code",
        "order": 0,
        "type": "TextInput"
      },
      "dataSource": {
        "displayName": {
          "defaultText": "Data Source:",
          "resourceKey": "qr.prop.dataSource.label"
        },
        "order": 1,
        "type": "DataSource",
        "required": true
      }
    },
    metadata: {
      iconClass: "appChooserIcon",
      renderAs: ControlType.WebComponent,
      states: {
        readOnly: true,
        required: true
      }
    }
  }
};
