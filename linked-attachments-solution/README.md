# Attach as link solution

This is an example solution detailing the basic set up for solutions to implement adding attachments to Visual Investigators attachments manager via an external document manager as a link.

This example contains mocked funtions returning data that is required by Visual Investigator to be able to attach as link. Real life solutions will need to configure the data returned from the indended document managers API to match the return types

### Prerequisites

You must have access to a deployment of SAS Visual Investigator Viya 4 to use the documented tools.

### Setup

1. Edit the .env file with the details of the server you wish to deploy the solution.
2. Implement any document manager APIs to retrieve selected files and map the returned data corresponding to the return types in the example.

### Example Files

1. [document-manager-integration.ts](projects/components/src/lib/document-manager-integration.ts)

This file contains 3 example methods detailing the objects required by VI to register and apply the document managers to the attachment managers dropdown list and the handling of linked attachments after they have been selected.

2. [app.module.ts](projects/elements/src/app/app.module.ts)

This file details how the soultion can register external document managers with VI. It uses the VI API to register any document managers configured in document-manager-integration.ts

