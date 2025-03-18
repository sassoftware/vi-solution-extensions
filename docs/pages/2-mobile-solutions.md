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
# Adding Mobile Solution Extensions

## Using Add-Mobile Script

When creating a new workspace using the [`@sassoftware/vi-solution-extension-create`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create), you are prompted to specify if the workspace will include mobile custom controls. If you select "y", then the workspace will be scaffolded out to enable mobile solution extension development containing the relevant files, the correct file structure, and scripts. However, if you select "n", you can develop mobile solution extensions at a later date. To do this, in the root of your workspace run the following command:

```shell
npm run add-mobile
```

This then scaffolds out the workspace as if "y" had been selected at initialization.

You can then create your mobile components. For more information, see [Mobile Solution Extensions](./1-getting-started.md#mobile-solution-extensions).

## No Add-Mobile Script

It is possible that a workspace was scaffolded out with an older version of the [`@sassoftware/vi-solution-extension-create`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-create) package that did not consider mobile solution extension development and therefore does not add the "add-mobile" script to the package.json automatically.

If this is the case, then you must ensure that your dependencies are up to date. Install the latest versions of the following packages:

-   [`@sassoftware/vi-solution-extension-angular-schematics`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-angular-schematics)
-   [`@sassoftware/vi-solution-extension-upload`](https://www.npmjs.com/package/@sassoftware/vi-solution-extension-upload)

Then at the root of your workspace run:

```shell
ng g @sassoftware/vi-solution-extension-angular-schematics:add-mobile
```

This will then scaffold out your existing workspace for mobile solution extension development.

## Existing Mobile Solution Extension Development Scaffolding

Running either of these commands might display the following prompt:

```shell
It looks like this project has previously been set up for mobile development, are you sure you want to continue? (y/n):
```

This is because some files from the mobile scaffolding already exist and continuing might reset some files to an initialized state - for example, `mobile-elements > src > app > app.module.ts`.

This means that items like imports, that previously existed, might no longer be the same and cause errors.
