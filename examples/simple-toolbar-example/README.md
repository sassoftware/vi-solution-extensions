# Simple Toolbar Action

This is an example solution showcasing how to add your own toolbar action to SAS Visual Investigator

This example create a new toolbar action that administrators can add to an entity. The action itself will enable users to duplicate the entity

This example also covers adding Resource Keys to the application, which can be used to localise the strings provided as part of the Action.

### Prerequisites

You must have access to a deployment of SAS Visual Investigator on SAS Viya 4 to use the documented tools.

### Example Files

* [duplicate-toolbar-action.control.ts](projects/components/src/lib/duplicate-toolbar-action/duplicate-toolbar-action.control.ts) - Represents the definition of the metadata for the action that gets uploaded. This contains the optional configuration properties "newTitleKey" and ""showAlertBeforeClone", set by an administrator, that either creates the cloned object automatically, or prompts the user to enter a name for the cloned object when the toolbar action is clicked.
* [duplicate-toolbar-action.module.ts](projects/components/src/lib/duplicate-toolbar-action/duplicate-toolbar-action.module.ts) - Is expanded with the command [registerResourceBundle](https://developer.sas.com/apis/vi/apiDocs/ResourceApi.html#registerResourceBundle) to set the resource keys for the above metadata options and title. This is required for the RadioChooser property type.
* [duplicate-toolbar-action.component.html](projects/components/src/lib/duplicate-toolbar-action/duplicate-toolbar-action.component.html) - Contains the HTML which represents a simple button to trigger the clone function.
* [duplicate-toolbar-action.component.ts](projects/components/src/lib/duplicate-toolbar-action/duplicate-toolbar-action.component.ts) - With the function cloneCurrentObject, this file shows how to use the "showAlertBeforeClone" property defined in [duplicate-toolbar-action.control.ts](projects/components/src/lib/duplicate-toolbar-action/duplicate-toolbar-action.control.ts), using SviClientApi to get the current entity's metadata and cloning it with the page data, and then using the ObjectAPI to create a new object from that clone, and finally using the ShellTabsAPI to open the tab for the new object.   

## How to  use
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 17.

# Setup
Rename `.env.example` to `.env` and populate it with your server address and login credentials.

Finally, run `npm ci` to install the example project's dependencies.

### Development

Run `npm run watch` to watch for new builds and automatically upload them to the server.

### Build

Run `npm run build` to build the project.

### Further help

For more help on the Angular CLI use `ng help` or see the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
