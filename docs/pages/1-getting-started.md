<!-- Automatically generated table of contents -->

# SAS Visual Investigator Solution Extensions

# Table of Contents

1. [Home](../../README.md)
2. [Getting Started](./1-getting-started.md)
3. [Adding Mobile Solution Extensions](./2-mobile-solutions.md)
4. [Manually Uploading Bundles](./3-manual-uploading.md)

<!-- toc_end -->
# Getting Started

To get started quickly, we have an executable that creates a new Angular workspace that is ready for you to use and start developing solution extensions.

Execute the following script in the command line inside the directory where you want this new workspace to be created:

```shell
npx @sassoftware/vi-solution-extension-create
```

You are asked to enter the following information:

- **Name** - The name of the solution you want to create. This will be the name of the created workspace.
  For example: "my-new-solution-extension"
- **Hostname** - The host server that you want to deploy controls to. Use the following format:
  `http://[host address]:[port number]`.
  For example:
  `http://my-vi-deployment.my-org.com:1234`.
- **Username** - Username for the host above with access to SAS Visual Investigator's database tables.
- **Password** - Password for the username above.
- **Include Mobile** - Will this workspace include mobile solution extensions? This defaults to false (n). It is possible to add scaffolding for developing mobile solution extensions later so it is not crucial to make this decision at initialisation.

**Note:** Some of this information is stored in the `.env` file, and can be changed later as required.
This creates your new workspace and installs all the appropriate dependencies.

## Creating a Solution Extension

### Desktop Solution Extensions

We have schematics for multiple types of solution extension:

- **Page** - A control that can be added to object pages.
- **Home** - A control that can be added to home pages.
- **Toolbar** - A control that can appear in an object's toolbar.
- **Property** - A property editor that can appear for page or Home page control properties.
- **ToolbarProperty** - A property editor that can appear for toolbar control properties.

Once you have set up an Angular workspace using the `@sassoftware/vi-solution-extension-create` script, you have access to an npm shorthand script for creating these solution extension types. Run this command in the root of the workspace:

```shell
npm run create:solution-control
```

You are prompted to give your solution extension a name and select the type.

This script does the following:

- Creates the component, template, module, test file and `control.ts` file in the `components` workspace under `src > lib`.
- Uses the newly created solution extension's module to define a new custom element and uses SAS Visual Investigator's API to register it with SAS Visual Investigator.
- Imports the newly created module into `components > src > app.module.ts`.

The script creates the following files:

- `[name].component.html` - The template. This contains the HTML to be rendered for your solution extension.
- `[name].component.ts` - The Angular component that provides logic to the solution extension and passes data to the template.
- `[name].component.spec.ts` - A test file for unit testing your solution extension.
- `[name].component.module.ts` - The Angular module for your solution extension. This is pre-built to define a new custom element for the solution extension and uses SAS Visual Investigator's API to register it with SAS Visual Investigator.
- `[name].control.ts` - Configuration for the control. This is mostly pre-configured, but you might want to add additional attributes - for example, to customize which properties appear in SAS Visual Investigator's properties panel when designing a page.

### Mobile Solution Extensions

We have schematics for multiple types of mobile solution extension:

- **MobileObjectControls** - A control that can be added to mobile object pages.
- **MobileHomepageControls** - A control that can be added to mobile home pages.

Once you have set up an Angular workspace using the `@sassoftware/vi-solution-extension-create` script, you have access to an npm shorthand script for creating these solution extension types. Run this command in the root of the workspace:

```shell
npm run create:solution-control-mobile
```

You are prompted to give your solution extension a name and select the type.

This script does the same as the [desktop command](#desktop-solution-extensions) other than it imports the newly created module into `components > src > mobile-app.module.ts`.

## Deploying Solution Extensions

Once you have used the `@sassoftware/vi-solution-extension-create` script to set up your workspace, the following npm script makes deploying your solution extensions simple. Run this command in the root of the workspace:

### Desktop Solution Extensions

```shell
npm run watch
```

### Mobile Solution Extensions

```shell
npm run watch:mobile
```

This builds and deploys all your desktop or mobile solution extensions dependant on which script you run whenever you make changes, allowing you to see the results on a server very quickly. If you have multiple solution extensions of a given type then all of them will be uploaded as part of a single bundle when the command is run.

The script uses the properties in the `.env` file that were configured for you when the workspace was set up. You can change these properties if you want to deploy to a different server.

After a successful deployment, refresh SAS Visual Investigator to start using your new solution extensions.
