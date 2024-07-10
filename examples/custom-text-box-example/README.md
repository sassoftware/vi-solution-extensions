# Custom Textbox Solution

This is an example solution showcasing the creation of a textbox, using data binding, conditional classes and attributes, as well as using the control API for both desktop and mobile.

### Prerequisites

You must have access to a deployment of SAS Visual Investigator Viya 4 to use the documented tools.

## How to use

This project was generated with [@sassoftware/vi-solution-extension-create](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create) and [@sassoftware/vi-solution-extension-angular-schematics](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-angular-schematics).

# Setup

Rename `.env.example` to `.env` and populate it with your server address and login credentials.

Finally, run `npm ci` to install the example project's dependencies.

### Development

Run `npm run watch` for desktop and `npm run watch:mobile` for mobile to watch for new builds and automatically upload them to the server.

### Build

Run `npm run build` for desktop and `npm run build:mobile` for mobile to build the project and upload it to the server.
