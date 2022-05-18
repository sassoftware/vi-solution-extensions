# Guides

## Getting Started

To get started quickly, we have an executable that creates a new Angular project that is ready for you to use to start developing solution extensions.

Execute the following script in the command line wherever you want this new project to be created:

````shell
npx @sassoftware/vi-solution-extension-create
````

You are asked to enter the following information:

* **Hostname** - The host server that you want to deploy controls to. Use the following format: 
 `http://[host address]:[port number]`.
 For example: 
 `http://my-vi-deployment.my-org.com:1234`.
* **Username** - Username for the host above with access to SAS Visual Investigator's database tables.
* **Password** - Password for the username above.

**Note:** This information is stored in the `.env` file, and can be changed later as required. 
This creates your new project and installs all the appropriate dependencies.

## Creating a Solution Extension

We have schematics for multiple types of solution extension:

* **Page** - A control that can be added to object pages.
* **Home** - A control that can be added to Home pages.
* **Toolbar** - A control that can appear in an object's toolbar.
* **Property** - A property editor that can appear for page or Home page control properties.
* **ToolbarProperty** - A property editor that can appear for toolbar control properties.

If you set up an Angular project using the `@sassoftware/vi-solution-extension-create` script, you have access to an npm shorthand script for creating these solution extension types. Run this command in the root of the project:

````shell
npm run create:solution-control
````

Alternatively, you can use these schematics in any Angular project if have installed the schematics package, `@sassoftware/vi-solution-extension-angular-schematics`. In this case, run the following command:

````shell
ng g @sassoftware/vi-solution-extension-angular-schematics:wc
````

You are prompted to give your solution extension a name and select the type.

This script does the following:

* Creates the component, template, module, test file and `control.ts` file in the `components` project under `src > lib`.
* Uses the newly created solution extension's module to define a new custom element and uses SAS Visual Investigator's API to register it with SAS Visual Investigator.
* Imports the newly created module into `components > src > app.module.ts`.

The script creates the following files:

* `[name].component.html` - The template. This contains the HTML to be rendered for your solution extension.
* `[name].component.ts` - The Angular component that provides logic to the solution extension and passes data to the template.
* `[name].component.spec.ts` - A test file for unit testing your solution extension.
* `[name].component.module.ts` - The Angular module for your solution extension. This is pre-built to define a new custom element for the solution extension and uses SAS Visual Investigator's API to register it with SAS Visual Investigator.
* `[name].control.ts` - Configuration for the control. This is mostly preconfigured, but you might want to add additional attributes - for example, to customize which properties appear in SAS Visual Investigator's properties panel when designing a page.

## Deploying Solution Extensions

If you used the `@sassoftware/vi-solution-extension-create` script to set up your project, the following npm script makes deploying your solution extensions simple. Run this command in the root of the project:

````shell
npm run watch
````

This builds and deploys your solution extensions whenever you make changes, allowing you see the results on a server very quickly.

The script uses the properties in the `.env` file that were configured for you when the project was set up. You can change these properties if you want to deploy to a different server.

After a successful deployment, refresh SAS Visual Investigator to start using your new solution extensions.
