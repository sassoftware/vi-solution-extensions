import { ControlType, SolutionExtension } from '@sassoftware/vi-api/config';

export const control: SolutionExtension = {
  category: 'Fields',
  controlDescription: {
    defaultText: 'PageEventHooks Desktop Example',
  },
  directiveName: 'page-event-hooks-desktop-example',
  displayName: {
    defaultText: 'PageEventHooks Desktop Example',
  },
  name: 'PageEventHooksDesktopExample',
  controlAttributes: {
    attributes: {
      dataSource: {
        displayName: {
          defaultText: 'Data Source',
        },
        order: 0,
        required: true,
        type: 'DataSource',
      },
      'title.text': {
        defaultValue: 'PageEventHooks Desktop Example',
        displayName: {
          defaultText: 'Label',
        },
        order: 1,
        type: 'TextInput',
      },
      addRequiredPrefix: {
        displayName: {
          defaultText: 'Require prefix',
        },
        order: 2,
        type: 'Checkbox',
      },
      requiredPrefix: {
        defaultValue: '',
        disabledExpression: '!addRequiredPrefix',
        displayName: {
          defaultText: 'Must include prefix',
        },
        localizable: false,
        order: 3,
        type: 'TextInput',
      },
      addText: {
        displayName: {
          defaultText: 'Insert prefix before save',
        },
        order: 4,
        type: 'Checkbox',
      },
      prefix: {
        disabledExpression: '!addText',
        displayName: {
          defaultText: 'Prefix',
        },
        localizable: false,
        order: 5,
        type: 'TextInput',
      },
      showSuccess: {
        displayName: {
          defaultText: 'Show message after save success',
        },
        order: 7,
        type: 'Checkbox',
      },
      showFail: {
        displayName: {
          defaultText: 'Show message after save fail',
        },
        order: 8,
        type: 'Checkbox',
      },
      inputWidthCSSClass: {
        displayName: {
          defaultText: 'Control size',
        },
        order: 10,
        picklistName: 'INPUT_LENGTH_OPTIONS',
        type: 'Picklist',
      },
    },
    metadata: {
      renderAs: ControlType.WebComponent,
      iconClass: 'textFieldIcon',
      states: {
        required: true,
      },
    },
  },
};
