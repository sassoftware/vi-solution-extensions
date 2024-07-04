<!-- Automatically generated table of contents -->

# SAS Visual Investigator Solution Extensions

# Table of Contents

1. [Home](../../README.md)
2. [Getting Started](./1-getting-started.md)
3. [Adding Mobile Solution Extensions](./2-mobile-solutions.md)
4. [Manually Uploading Bundles](./3-manual-uploading.md)

<!-- toc_end -->
# Adding Mobile Solution Extensions

## Using Add-Mobile Script

When creating a new workspace using the [`@sassoftware/vi-solution-extension-create`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create) it will ask if the workspace will include mobile custom controls. If "y" is selected then the workspace will be scaffolded out to allow mobile solution extension development with all relevant files, the correct file structure and scripts, however if "n" is selected and at a later date you wish to develop solution extensions for mobile this is easily done. To do this, in the root of your workspace run:

```shell
npm run add-mobile
```

This will then scaffold out the workspace as if "y" had been selected at initialisation.

You can then create your mobile components, a guide for which can be found [here](./1-getting-started#mobile-solution-extensions).

## No Add-Mobile Script

It is possible that a workspace was scaffolded out with an older version of the[`@sassoftware/vi-solution-extension-create`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create) package which did not consider mobile solution extension development and therefore does not add the "add-mobile" script to the package.json automatically.

If this is the case then the first thing required is to make sure your dependencies are up to date. You should install the latest versions of:

-   [`@sassoftware/vi-solution-extension-angular-schematics`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-angular-schematics)
-   [`@sassoftware/vi-solution-extension-upload`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-upload)

Then at the root of your workspace run:

```shell
ng g @sassoftware/vi-solution-extension-angular-schematics:add-mobile
```

This will then scaffold out your existing workspace for mobile solution extension development.

## Existing Mobile Solution Extension Development Scaffolding

It may be the case when you run the either of these commands that you get a prompt saying.

```shell
It looks like this project has previously been set up for mobile development, are you sure you want to continue? (y/n):
```

This is due to the fact that some files from the mobile scaffolding already exist and if you continue then it will reset some files to an initialised state, eg: `mobile-elements > src > app > app.module.ts`.

This means that things like imports which previously existed may no longer be the same and cause errors so it is something to keep in mind.
