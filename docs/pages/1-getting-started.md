<!-- Automatically generated table of contents -->

# SAS Visual Investigator Solution Extensions

# Table of Contents

1. [Home](../../README.md)
2. [Getting Started](./1-getting-started.md)
3. [Adding Mobile Solution Extensions](./2-mobile-solutions.md)
4. [Manually Uploading Bundles](./3-manual-uploading.md)
5. [Debugging Solution Extensions Using Sourcemaps](./4-debugging-solution-extensions-using-sourcemaps.md)
6. [Using Existing Bearer Token For Upload](./5-using-existing-auth-token-for-upload.md)

<!-- toc_end -->

# Getting Started

To start developing solution extensions, SAS provides an executable that creates a new Angular workspace that is ready for you to use. Execute the following command line script inside the directory where you want the new workspace to be created:

```shell
npx @sassoftware/vi-solution-extension-create
```

You are prompted to enter the following information:

-   **Name** - The name of the solution that you want to create. This is the name of the created workspace.
    For example: "my-new-solution-extension"
-   **Hostname** - The host server to which you want to deploy controls. Use the following format:
    `http://[host address]:[port number]`.
    For example:
    `http://my-vi-deployment.my-org.com:1234`.
-   **Use Existing Bearer Token** - Choose to use a pre-existing token to upload the solution extension to the server. This defaults to false (n). If true (y) then this will add SVI_BEARER_TOKEN to the workspace's `.env` file and you will not be required to provide a username or password. If this is set to true then you will need to manually paste your token into the `.env` file. For more details, refer to [Using Existing Bearer Token For Upload](./5-using-existing-auth-token-for-upload.md).
-   **Username** - Username for the host above with access to SAS Visual Investigator's database tables. (You won't be prompted for this if you have selected true to using a pre-existing bearer token.)
-   **Password** - Password for the username above. (You won't be prompted for this if you have selected true to using a pre-existing bearer token.)
-   **Include Mobile** - Will this workspace include mobile solution extensions? This defaults to false (n). You can add scaffolding for developing mobile solution extensions later, so it is not crucial to make this decision at initialization.

**Note:** Some of this information is stored in the `.env` file, and can be changed later as required.
This creates your new workspace and installs the required dependencies.

## Creating a Solution Extension

### Desktop Solution Extensions

SAS provides schematics for multiple types of solution extension:

-   **Page** - A control that can be added to object pages.
-   **Home** - A control that can be added to Home pages.
-   **Toolbar** - A control that can appear in an object's toolbar.
-   **Property** - A property editor that can appear for page or Home page control properties.
-   **ToolbarProperty** - A property editor that can appear for toolbar control properties.

After creating an Angular workspace using the `@sassoftware/vi-solution-extension-create` script, you can access an npm shorthand script for creating these solution extension types. Run the following command in the root of the workspace:

```shell
npm run create:solution-control
```

You are prompted to name your solution extension in PascalCase and select the type.

For example, naming the control "MyNewControl" creates a new component in the components directory named "my-new-control".

This script does the following:

-   Creates the component, template, module, test file, and `control.ts` file in the `components` workspace under `src > lib`.
-   Uses the newly created solution extension's module to define a new custom element and uses SAS Visual Investigator's API to register it with SAS Visual Investigator.
-   Imports the newly created module into `components > src > app.module.ts`.

The script creates the following files:

-   `[name].component.html` - The template. This contains the HTML to be rendered for your solution extension.
-   `[name].component.ts` - The Angular component that provides logic to the solution extension and passes data to the template.
-   `[name].component.spec.ts` - A test file for unit testing your solution extension.
-   `[name].component.module.ts` - The Angular module for your solution extension. This is pre-built to define a new custom element for the solution extension and uses SAS Visual Investigator's API to register it with SAS Visual Investigator.
-   `[name].control.ts` - Configuration for the control. This is pre-configured, but you might want to add additional attributes - for example, to customize which properties appear in SAS Visual Investigator's properties panel when designing a page.

### Mobile Solution Extensions

SAS provides schematics for multiple types of mobile solution extension:

-   **MobileObjectControls** - A control that can be added to mobile object pages.
-   **MobileHomepageControls** - A control that can be added to mobile Home pages.

After creating an Angular workspace using the `@sassoftware/vi-solution-extension-create` script, you can access an npm shorthand script for creating these solution extension types. Run the following command in the root of the workspace:

```shell
npm run create:solution-control-mobile
```

You are prompted to name your solution extension in PascalCase and select the type.

This script does the same as the [desktop command](#desktop-solution-extensions), but it imports the newly created module into `components > src > mobile-app.module.ts`.

## Deploying Solution Extensions

After creating an Angular workspace using the `@sassoftware/vi-solution-extension-create` script, the following npm script makes deploying your solution extensions simple. Run the following command in the root of the workspace:

### Desktop Solution Extensions

```shell
npm run watch
```

### Mobile Solution Extensions

```shell
npm run watch:mobile
```

Depending on which script you run, all desktop or mobile solution extensions are built and deployed, enabling you to quickly see the results on a server. If you have multiple solution extensions of a given type, then all of them are uploaded as part of a single bundle when you run the command.

The script uses the properties in the `.env` file that were configured for you when the workspace was set up. You can change these properties if you want to deploy to a different server. After a successful deployment, clear your browser cache and refresh SAS Visual Investigator to start using your new solution extensions.

After a successful deployment, refresh SAS Visual Investigator to start using your new solution extensions.
