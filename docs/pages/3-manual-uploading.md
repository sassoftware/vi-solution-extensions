<!-- Automatically generated table of contents -->

# SAS Visual Investigator Solution Extensions

# Table of Contents

1. [Home](../../README.md)
2. [Getting Started](./1-getting-started.md)
3. [Adding Mobile Solution Extensions](./2-mobile-solutions.md)
4. [Manually Uploading Bundles](./3-manual-uploading.md)
5. [Debugging Solution Extensions Using Sourcemaps](./4-debugging-solution-extensions-using-sourcemaps.md)

<!-- toc_end -->
# Manually Uploading Bundles

The [@sassoftware/vi-solution-extension-upload](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-upload) package enables developers to upload a bundled collection of solution extensions to a deployed instance of SAS Visual Investigator.

## Prerequisites
- A deployed instance of SAS Visual Investigator 10.8 or later (SAS Viya 4 for Mobile development).
- A JavaScript bundle containing solution extensions to upload.

## Use cases
- Writing solution extensions across various JavaScript frameworks.
- Manually creating and registering solution extensions as [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) within the DOM.

#### Vue Example
For a detailed example of how to create and upload a solution extension written in [VueJS](https://vuejs.org/), refer to the [Vue Example](../../examples/vue-solution/) in the [examples](../../examples) directory.

## Setup
The upload tool requires specific environment variables to be set in order to upload solutions to a remote server. In order to specify the login credentials, server address, and bundle path, you must create and populate an `.env` file with the following environment variables:

```env
SVI_HOSTNAME=http://example-host.na.sas.com
SVI_USERNAME=username
SVI_PASSWORD=password
SVI_BUNDLE_PATH=./dist/elements/main.js
SMI_BUNDLE_PATH=./dist/mobile-elements/main.js
```
> **NOTE**: The variables `SVI_BUNDLE_PATH` and `SMI_BUNDLE_PATH`, if it is included, must point to the relative path of a valid JavaScript bundle.

## Uploading to SAS Visual Investigator
You can now upload solution extensions to your own deployed instance of SAS Visual Investigator.

### via Package Script
1. Install the [@sassoftware/vi-solution-extension-upload](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-upload) and [env-cmd](https://www.npmjs.com/package/env-cmd) package(s) as dev dependencies:
    ```js
    npm install --save-dev env-cmd @sassoftware/vi-solution-extension-upload
    ```
2. Add the upload script to your `package.json` file:
    ```json
    "scripts": {
        "upload": "env-cmd node -e \"require('@sassoftware/vi-solution-extension-upload/src/uploader').upload()\"",
        ...
    }
    ```
3. Run the upload script:
    ```bash
    npm run upload
    ```
If unsuccessful, check that the bundle path, login credentials, and server address that you have provided are correct.

### via the CLI
You can also run the solution extension upload script directly from the CLI by adding the environment variables in `.env` to your environment and running the upload script directly via `node`:
```bash
# Export .env to local environment
export $(grep -v '^#' .env | xargs)

# Install upload tooling globally
npm i -g @sassoftware/vi-solution-extension-upload

# Run the upload script directly
node -e "require('@sassoftware/vi-solution-extension-upload/src/uploader').upload()"
```

## Additional resources
For more information about the vi-solution-extension-upload package, see https://www.npmjs.com/package/@sassoftware/vi-solution-extension-upload.
