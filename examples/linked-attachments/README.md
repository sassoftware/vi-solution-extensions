# Attach as link solution

This is an example solution showcasing the addition of attachments as links to SAS Visual Investigator's attachments manager via an external document manager.

This example contains mocked functions returning data that is required by SAS Visual Investigator to be able to attach a link. Real life solutions must configure the data returned from the intended document manager's API to match the return types.

### Prerequisites

You must have access to a deployment of SAS Visual Investigator on SAS Viya 4 to use the documented tools.


### Example Files

* [document-manager-integration.ts](projects/components/src/lib/document-manager-integration.ts) - Contains three example methods detailing the objects required by SAS Visual Investigator to register and apply the document managers to the attachment manager's drop-down list, as well as the handling of linked attachments after they have been selected.

* [app.module.ts](projects/components/src/app.module.ts) - Details how the solution can register external document managers with SAS Visual Investigator. It uses the SAS Visual Investigator API to register any document managers configured in [document-manager-integration.ts](projects/components/src/lib/document-manager-integration.ts).


## How to  use
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 17.

# Setup
Rename `.env.example` to `.env` and populate it with your server address and login credentials. 

Finally, run `npm ci` to install the example project's dependencies.

### Development

Run `npm run watch` to watch for new builds and automatically upload them to the server.

### Build

Run `npm run watch` to build the project and upload it to the server.

### Further help

For more information about the Angular CLI use `ng help`, or see [Angular CLI Overview and Command Reference](https://angular.io/cli).
