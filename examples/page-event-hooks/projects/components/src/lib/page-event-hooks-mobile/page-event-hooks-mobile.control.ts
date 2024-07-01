import { Control } from '@sassoftware/mobile-investigator/src/app/mobile/api/config';
import { ControlType } from '@sassoftware/vi-api/config';

export const control: Control = {
  category: 'MobileObjectControls',
  controlDescription: {
    defaultText: 'pageEventHooks Mobile Example',
  },
  reInitializeBehaviour: { type: 'never' },
  directiveName: 'mobile-sol-page-event-hooks-mobile',
  displayName: {
    defaultText: 'PageEventHooks Mobile Example',
  },
  name: 'pageEventHooksMobileExample',
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
        defaultValue: 'PageEventHooks Mobile Example',
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
    },
    metadata: {
      renderAs: ControlType.WebComponent,
      iconClass: 'textFieldIcon',
      states: {
        readOnly: true,
        required: true,
      },
    },
  },
};
