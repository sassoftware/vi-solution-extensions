# Guides

## Getting started (creating an Angular project)

To get started quickly, we have an executable that will create a new Angular project for you that is ready to start developing solution extensions in.

This should be as simple as executing the following script in the command line wherever you want this new project to be created.

````shell
npx @sassoftware/vi-solution-extension-create
````

You will be asked to enter the following (these can all be changed later in the `.env` file):

* **Hostname** - The host that you would like to eventually deploy controls to. `http://[host address]:[port number]`, e.g. `http://my-vi-deployment.my-org.com:1234`
* **Username** - Username for the host above with access to Visual Investigator's database tables
* **Password** - Password for the username above

This should then create your new project and install all appropriate dependencies.

## Creating a solution extension

We have schematics for multiple solution extension types:

* **Page** - A control that can be added to object pages
* **Home** - A control that can be added to homepages
* **Toolbar** - A control that can appear in the toolbar for objects
* **Property** - A property editor that can appear for page or homepage control properties
* **ToolbarProperty** - A property editor that can appear for toolbar control properties

If you have set up an Angular project using the above `@sassoftware/vi-solution-extension-create` script then you will have access to an npm shorthand script for creating these extension types. Run the following in the root of the project:

````shell
npm run create:solution-control
````

Otherwise, you can use these schematics in any Angular project as long as you have installed the schematics `@sassoftware/vi-solution-extension-angular-schematics`. Then you can run the following instead:

````shell
ng g @sassoftware/vi-solution-extension-angular-schematics:wc
````

You will be prompted to give your solution extension a name and select the type.

This will do multiple things:

* Create the component, template, module, test file and `control.ts` file in the `components` project under `src > lib`.
* Use the newly created solution extension's module to define a new custom element and use Visual Investigator's API to register it with Visual Investigator.
* Import the newly created module in `components > src > app.module.ts`.

The newly created files are as follows:

* `[name].component.html` - The template. The HTML that will be rendered for your solution extension.
* `[name].component.ts` - The angular component to provide logic to the solution extension and pass data to the template.
* `[name].component.spec.ts` - A test file for unit testing your solution extension.
* `[name].component.module.ts` - The angular module for your solution extension. This will be prebuilt to define a new custom element for the solution extension and use Visual Investigator's API to register it with Visual Investigator.
* `[name].control.ts` - Config for the control. This will mostly be preconfigured but you may wish to add additional attributes; for example to customize what properties appear in Visual Investigator's properties panel when designing a page.

## Deploying solution extensions

If you have set up your project using the above `@sassoftware/vi-solution-extension-create` script then we have an npm script that makes this fairly simple. Run the following in the root of the project:

````shell
npm run watch
````

This will build and deploy your solution extensions and continue to do so whenever you make changes, allowing you to make changes and see the result on a server very quickly.

This uses the properties in the `.env` file that should have been configured for you when setting up the project. But you can change these if you wish to deploy to a different server.

Refresh Visual Investigator after a successful deployment and you should be able to start using your new solution extensions.
