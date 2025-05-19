<!-- Automatically generated table of contents -->

# SAS Visual Investigator Solution Extensions

# Table of Contents

1. [Home](../../README.md)
2. [Getting Started](./1-getting-started.md)
3. [Adding Mobile Solution Extensions](./2-mobile-solutions.md)
4. [Manually Uploading Bundles](./3-manual-uploading.md)
5. [Debugging Solution Extensions Using Sourcemaps](./4-debugging-solution-extensions-using-sourcemaps.md)
6. [Using Existing Bearer Token For Upload](./5-using-existing-auth-token-for-upload.md)
7. [Mobile Solution Extensions On Viya 3.5 (10.8)](./6-mobile-solution-extensions-10.8.md)

<!-- toc_end -->

# Mobile Solution Extensions On Viya 3.5 (10.8)

There are extra steps to follow if you are uploading mobile solution extensions to a Viya 3.5 server.

## Setting Up "Empty Control"

First create a SAS Mobile Investigator Home page control by running this script

```bash
create:solution-control-mobile
```

The name of the control can be anything, in this example it is `emptyControl` and then select `MobileHomepageControls` from the options. This will create the control.

Next find the created control's metadata, in the instance it will be at `projects/components/src/lib/empty-control/empty-control.control.ts`. The name property will need to be changed to `<workspace-name>-mobile`. The `workspace-name` can be found in the repositories package.json under the name property. By default this will be the same as what the workspace was named when running

```bash
npx @sassoftware/vi-solution-extension-create
```

In this instance it is `mobile-ten-eight` so the name property in the control file would be changed to `mobile-ten-eight-mobile`. You will also need to add

```json
showInToolbox: "true" as const
```

to the metadata object.

The control file in this example now looks like this

```ts
import { ControlType } from "@sassoftware/vi-api/config";

export const control = {
    category: "MobileHomepageControls",
    controlDescription: {
        defaultText: "emptyControl"
    },
    directiveName: "mobile-sol-empty-control",
    displayName: {
        defaultText: "emptyControl"
    },
    name: "mobile-ten-eight-mobile",
    controlAttributes: {
        attributes: {},
        metadata: {
            renderAs: ControlType.WebComponent,
            states: {
                readOnly: true,
                required: true
            },
            showInToolbox: "true" as const
        }
    }
};
```

This control should always be present on the mobile Home page. This is required due to the way that the tooling defines the control containing the bundle in the database and the way that mobile controls are fetched in Viya 3.5. The bundle control's name is defined in the database as `<workspace-name>-mobile`, therefore there needs to be a Home page control present with the same name in order to register the controls in the bundle. If this control is not on the Home page when SAS Mobile Investigator loads, then none of the controls in this workspace will be registered.

When this process is complete, then mobile solution extensions can be created and uploaded the same way as detailed [here](./1-getting-started.md#mobile-solution-extensions).

## Styling "Empty Control"

You will also want to style the control as hidden when in mobile. This can be done in a variety of ways, but here is an example of using inline styles to do this.

In the component file for the "empty control" add a getter like this

```ts
get inAdmin(){
  return (window as any).sas.smi?.environment.inAdmin ?? true;
}
```

Then in the template for the "empty component", add conditional styling

```html
<p [style.display]="!inAdmin ? 'none' : ''">empty-control works!</p>
```

This means the control will be visible in Manage Investigate and Search interface, but not in the SAS Mobile Investigator interface. The control will still be registered in mobile.

## Troubleshooting

### Missing Control API Features

As part of the scaffolding process, mobile solution extensions are scaffolded with the controlApi as a typed input which enhances the developer experience. However, the version of the Mobile Investigator API and Visual Investigator API packages installed are the latest versions which are not the versions being used on Viya 3.5 servers. This means that not all features will be available on the Viya 3.5 server that appear using intellisense. This is something to be mindful of when developing.

### Debug Mobile Solution Extensions On Viya 3.5

The script to upload mobile solution extensions with sourcemaps to allow debugging (detailed [here](./4-debugging-solution-extensions-using-sourcemaps.md#mobile)) does not work on Viya 3.5.
