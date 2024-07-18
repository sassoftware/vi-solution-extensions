# Page Event Hooks Solution

This is an example solution showcasing the use of [Page Event Hooks](https://developer.sas.com/apis/vi/apiDocs/PageEventsApi.html). This example demonstrates how to add pre-event and post-event hooks for broadcasted SaveObject events. 

Three `SaveObject` event hooks have been implemented:
- [setAddTextHook](./projects/components/src/lib/page-event-hooks-desktop/page-event-hooks-desktop.component.ts#L149) - Inserts the value of the control's `addText` property into the fieldValue before saving (if not already present).
- [setValidationHook](./projects/components/src/lib/page-event-hooks-desktop/page-event-hooks-desktop.component.ts#L127) - Aborts the save if the value of the control's `addRequiredPrefix` property is not present in the fieldValue.
- [setPostSaveHook](./projects/components/src/lib/page-event-hooks-desktop/page-event-hooks-desktop.component.ts#L107) - Shows a success message after a successful save if the control's `showSuccess` property is set. If the `showFail` property is set, an error message is shown instead.

### Prerequisites

You must have access to a deployment of SAS Visual Investigator on SAS Viya 4 to use the documented tools.

## How to use

This project was generated using [@sassoftware/vi-solution-extension-create](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create) and [@sassoftware/vi-solution-extension-angular-schematics](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-angular-schematics).

# Setup

Rename `.env.example` to `.env` and populate it with your server address and login credentials.

Finally, run `npm ci` to install the example project's dependencies.

### Development

Run `npm run watch` for desktop and `npm run watch:mobile` for mobile to watch for new builds and automatically upload them to the server.

### Build

Run `npm run build` for desktop and `npm run build:mobile` for mobile to build the project.
