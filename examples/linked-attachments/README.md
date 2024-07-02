# Attach as link solution

This is an example solution showcasing how to add attachments to Visual Investigators attachments manager via an external document manager as a link.

This example contains mocked functions returning data that is required by Visual Investigator to be able to attach as link. Real life solutions will need to configure the data returned from the intended document managers API to match the return types.

### Prerequisites

You must have access to a deployment of SAS Visual Investigator Viya 4 to use the documented tools.


### Example Files

* [document-manager-integration.ts](projects/components/src/lib/document-manager-integration.ts) - Contains 3 example methods detailing the objects required by VI to register and apply the document managers to the attachment managers dropdown list and the handling of linked attachments after they have been selected.

* [app.module.ts](projects/components/src/app.module.ts) - Details how the solution can register external document managers with VI. It uses the VI API to register any document managers configured in document-manager-integration.ts.


## How to  use
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.

# Setup
Rename `.env.example` to `.env` and populate it with your server address and login credentials. 

Finally, run `npm ci` to install the example project's dependencies.

### Development

Run `npm run watch` to watch for new builds and automatically upload them to the server.

### Build

Run `npm run watch` to build the project and upload it to the server.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
