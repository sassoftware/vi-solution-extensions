# Solution Extension - Vue.js Example

<img src="https://blog.vuejs.org/logo.svg" style="display: block; margin: auto; " width="200" height="200" />

This project serves as an example of how to create SAS Visual Investigator solution extensions using the JavaScript framework [Vue.js](https://vuejs.org/). For examples of solution extensions created using [@sassoftware/vi-solution-extension-create](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create) visit the [examples](../) page. The example project itself was created using the [Vite Template Scaffold](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) `vue-ts`. This example contains a simple labeled text-input control that hooks onto various page and control `onChange` event hooks provided by [@sassoftware/vi-api](https://www.npmjs.com/package/@sassoftware/vi-api).

## Getting Started

Copy the contents of `.env.example` to a new file named `.env` and populate the included environment variable fields with the path to your server running SAS Visual Investigator and sufficient login credentials for uploading your solution extension.

After configuring the environment file, run the following:

```sh
# Install dependencies
npm ci

# Init dev server that watches for changes and auto-uploads bundle
npm run watch

# OR perform one-time compilation and upload bundle
npm run build
```

> **NOTE**: Both `watch` and `build` scripts perform vite builds which, upon success, will generate a javascript bundle at `./dist/elements/main.js` that is then automatically uploaded to the server using the publicly available npm package [@sassoftware/vi-solution-extension-upload](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-upload).

## Points of interest

-   [./vite.config.ts](./vite.config.ts) - The config for the Vite JavaScript Compiler. Here, Vite has been configured to automatically upload a single javascript bundle after each successful build. Using scss preprocessorOptions, Vite also automatically imports a shared stylesheet hosted externally on the server running SAS Visual Investigator.
-   [./src/main.ts](./src/main.ts) - The entry-point for the solution extension. This contains the text-input example control and is registered as a solution extension using the vi-api.
-   [./src/elements/text-input/index.ts](./src/elements/text-input) - The Solution Extension Control Metadata used to register the control with SAS Visual Investigator. Here, we can define a number of configurable TypeAttributes our control will use, as well as label resource strings, and other necessary properties required when registering a Solution Extension.
-   [./src/elements/text-input/index.ts](./src/elements/text-input) - A basic text-input example component written in Vue using the [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq.html). When mounted, this component registers a number of event hooks via the vi-api, including page and control state onChange hooks. The component HTML template uses classes available in the sas-shared-styles stylesheet.

### Recommended Setup

-   [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur.
-   Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.
-   [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Vue tooling for VS Code.
