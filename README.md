<!-- Automatically generated table of contents -->

# SAS Visual Investigator Solution Extensions

# Table of Contents

1. [Home](README.md)
2. [Getting Started](./docs/pages/1-getting-started.md)
3. [Adding Mobile Solution Extensions](./docs/pages/2-mobile-solutions.md)
4. [Manually Uploading Bundles](./docs/pages/3-manual-uploading.md)
5. [Debugging Solution Extensions Using Sourcemaps](./docs/pages/4-debugging-solution-extensions-using-sourcemaps.md)
6. [Using Existing Bearer Token For Upload](./docs/pages/5-using-existing-auth-token-for-upload.md)

<!-- toc_end -->

# Overview

Solution extensions enable you to deploy new controls with custom functionality to an existing SAS Visual Investigator deployment. There are multiple tools available to ease the development and deployment of these solution extensions.

See the documentation and examples provided here for help with these tools.

## Prerequisites

### Desktop Solution Extensions

You must have access to a deployment of SAS Visual Investigator 10.8 or later to use the documented tools.

### Mobile Solution Extensions

SAS Mobile Investigator does not support custom controls in 10.8. You must have access to a deployment of SAS Visual Investigator on Viya 4 to use the documented tools.

## Installation

### NPM

SAS has published several packages to npm that are referenced and used in this guide.

Use the `@sassoftware/vi-solution-extension-create` package to create a workspace that downloads and installs the required packages. For more information, see [Getting Started](./docs/pages/1-getting-started.md).

See our packages below:

-   [`@sassoftware/vi-solution-extension-create`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create)
-   [`@sassoftware/vi-solution-extension-angular-schematics`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-angular-schematics)
-   [`@sassoftware/vi-solution-extension-upload`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-upload)
-   [`@sassoftware/vi-api`](https://www.npmjs.com/package/@sassoftware/vi-api)
-   [`@sassoftware/mobile-investigator`](https://www.npmjs.com/package/@sassoftware/mobile-investigator)

# Getting Started

For more information, see [Getting Started](./docs/pages/1-getting-started.md).

# Contributing

This project is not open for external contributions.

# License

This project is licensed under this commercial [license](LICENSE.txt).

# Additional Resources

-   SAS Visual Investigator API on [developer.sas.com](https://developer.sas.com/sdk/vi/apiDocs/).
