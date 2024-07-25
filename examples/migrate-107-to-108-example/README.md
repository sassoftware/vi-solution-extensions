# QR Component Update

This example updates the example SAS Visual Investigator 10.7 QR component into a project that can be deployed to a SAS Visual Investigator 10.8 server.

# Create a solution extension for 10.8+

Follow the steps from the [Getting Started](../../docs/pages/1-getting-started.md) guide to create a new SAS Visual Investigator 10.8 (or later) solution extension project, and then create a new page control called "QrCode".

On completion, you must update the files in the projects/components/src/lib/qr-code folder.

> The command "npx @sassoftware/vi-solution-extension-create" will remain at the final stage even though the process completed. "Nothing to be done" means the process is complete.

> Solution extensions are cached for 12 hours on a deployment. Every time a change is made you must empty your browser's cache and hard reload your browser to see your changes.

> If clearing the cache and performing a hard refresh does not work, updates will not be uploaded if there are any errors. Check the terminal which is running "npm run watch" for errors.

# Migrating the old QR component

The example QR component from the [example QR component documentation](https://go.documentation.sas.com/doc/en/vicdc/10.7/visgatorcc/p0d6r08hq9mbxyn1gamsmi90t9l6.htm) is upgraded in this project, the original files can be found [here](projects/components/src-old/qr-code).

This is an AngularJS component that was also upgraded to Angular to be suitable for SAS Visual Investigator 10.8 and later.

If we don't have access to the original files, we are able to access the code via PostgreSQL - as the definition of the old controls will be visible as a row in the `fdhmetadata.dh_control` table on our database.

In this case, you must copy the following attributes:

* directive_nm - this is moved to `directiveName: "qr-code"` in [qr-code.control.ts](projects/components/src/lib/qr-code/qr-code.control.ts).
* control_attribute_json_doc - this becomes our `control.metadata` and `control.controlAttributes` in the control in [qr-code.control.ts](projects/components/src/lib/qr-code/qr-code.control.ts)
* template_html_doc - this becomes the HTML and CSS to move into in [qr-code.component.html](projects/components/src/lib/qr-code/qr-code.component.html) and [qr-code.component.scss](projects/components/src/lib/qr-code/qr-code.component.scss)
* directive_txt - this represents the JavaScript logic to move into [qr-code.component.ts](projects/components/src/lib/qr-code/qr-code.component.ts)

## Step 1 - Move the metadata

From SAS Visual Investigator 10.8, metadata must be present in the project itself, rather than being manually added to the database, and it is uploaded using the `npm run watch` command.

The [qr-code.control.ts](projects/components/src/lib/qr-code/qr-code.control.ts) file contains the copied metadata that would usually be entered manually into the [control_attribute_json_doc](projects/components/src-old/qr-code/qr_table_data.txt) column. As such the `control.metadata` and `control.controlAttributes` properties are updated.

In the [qr-code.component.ts](projects/components/src/lib/qr-code/qr-code.component.ts) file, ensure that the `"selector"` in the `@Component` decorator matches the directive_nm from the [directive_nm](projects/components/src-old/qr-code/qr_table_data.txt) column.

## Step 2 - Move the JavaScript logic

The [old JavaScript](projects/components/src-old/qr-code/QRCode-component.js) contains a variety of logic that is useful to the component, but only works in AngularJS. However, most of this can be converted into the [new JavaScript](projects/components/src/lib/qr-code/qr-code.component.ts)

For example:

    ctrl.inDesignMode = function() {
      return ctrl.pageModel.mode === spbPageModes.DESIGN;
    };

Becomes:

    get inDesignMode(): boolean {
      return this.pageModel.mode === PageMode.Design;
    }

Similarly, `getDataSourceValue` is simplified to `get value()`, while `getOptions` is made into the constant `options`.

## Step 3 - Move the HTML

The [old HTML](projects/components/src-old/qr-code/QRCode-component.html) contains AngularJS style markdown as well as AngularJS Kendo (JQuery).

### Update the 3rd Party Library Support
Depending on the complexity of the SAS Visual Investigator 10.7 component, you might also have 3rd party libraries extending the functionality of your code. If you do not, then this step is not as applicable.

In this example, you must add support for Kendo Angular by adding the following lines to [package.json](package.json) under the "dependencies" block:

    "@progress/kendo-angular-common": "14.3.0",
    "@progress/kendo-angular-barcodes": "14.3.0",
    "@progress/kendo-ui": "2021.1.224",
    "@progress/kendo-drawing": "1.17.2",
    "@progress/kendo-licensing": "1.3.5"

And then run `npm i` the root of the project. This adds all the libraries to the project at once. Alternatively, each library can be added one by one. For example, `npm i @progress/kendo-angular-common`.

Kendo is a library that requires a license, and as such any public facing product will require that you pay for such. The command `npx kendo-ui-license activate` will validate the license present in [kendo-ui-license.txt](kendo-ui-license.txt), otherwise a Kendo watermark will be present on each Kendo component.

When converting different types of controls, different libraries might be required.

### Update the HTML
Updates in the [qr-code.component.html](projects/components/src/lib/qr-code/qr-code.component.html) from the [qr-code.html](projects/components/src-old/qr-code/QRCode-component.html) file

* the `<style>` block is ignored, this is covered in the next step.
* any `$ctrl.` is removed, such as `$ctrl.value.length` and becomes `value.length`.
* AngularJS `ng-if` is replaced for Angular `*ngIf`.
* AngularJS `ng-show` is replaced for `*ngIf`, and this is wrapped in `<ng-container>` instead.
* the `kendo-qrcode` widget is replaced by `<kendo-qrcode>...</kendo-qrcode>` and the inputs are updated to match the new API of Kendo Angular.

Updates in the [qr-code.component.ts](projects/components/src/lib/qr-code/qr-code.component.ts) file:
* The `@Component` decorator is updated with an `"imports"` property, including the `NgIf` and `QRCodeModule` which are added as imports.

## Step 4 - Move the CSS

The [old CSS](projects/components/src-old/qr-code/QRCode-component.html) was baked in to the HTML but this has changed now with the following in [qr-code.component.ts](projects/components/src/lib/qr-code/qr-code.component.ts):

    styleUrls: ["./qr-code.component.scss"],

The above line enables us to refer to the [qr-code.component.scss](projects/components/src/lib/qr-code/qr-code.component.scss) file instead, which can be multiple files if CSS from other sources such as a shared file is required.

> A notable update with Angular is that any styling that is in the SCSS file applies only to the components that refer to it directly. In Angular this is covered under the term [ViewEncapsulation](https://angular.dev/guide/components/styling#style-scoping). This is a substantial change from AngularJS so be aware that styling is no longer applied globally by default.

## Step 5 - Clean up the old data

After the component has been upgraded and is working as expected, the old control's row can be deleted from the `fdhmetadata.dh_control` table.

In place of each control (for example, the qr-control) you will instead see a "qr-update" row, which contains all the data for our solution extension and will not require any manual updating. Instead, the `npm run watch` command will be used to update this code.

> Additionally, the solution itself can be deleted from this table; it shows as <project_name> and represents all the of the controls defined in the project. Be aware that to fully delete a toolbar action, there will be an additional row in the fdhmetadata.dh_control table which must be removed manually. Any toolbar actions that are defined in the solution will show up in this table as well - this is to support 10.8 functionality.

## Additional steps

The following steps are optional, but can improve the usability of the component.

### Additional step 1 - Add ChangeDetectionStrategy OnPush

The following code in the QrCodeComponent stops the component from automatically refreshing when anything happens, and instead makes it only refresh when told.

    changeDetection: ChangeDetectionStrategy.OnPush

> More detail on Change Detection in Angular can be found at  [angular.dev](https://angular.dev/guide/components/advanced-configuration#changedetectionstrategy).

With this enabled, you won't see the component update without adding the following lines:

    constructor(
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      if (this.inDesignMode) {
        // markForCheck is used in design mode, because changes happen in this component
        this.controlApi.page.onPropertyChange(() => this.cdr.markForCheck())
      } else {
        // detectChanges is used in other modes, because changes happen in this component and the child component <kendo-qrcode>
        this.controlApi.page.onChange(() => this.cdr.detectChanges())
      }
    }

Using the ControlApi, you ensure that the component only redraws on page.onPropertyChange (which is the side panel during Design Mode) as well on page.onChange (which is when the data in the page changes in View/Edit/Create mode).

The result of this code changes addresses the following issues:

* If you had a `console.log("Get Value")` in `get value()` you would see `console.log` trigger many times as you hover over the QR code; the OnPush strategy stops the QR Component refreshing itself, and enables you to control when this happens instead.
* Fixes a bug in the Page Designer area, where the title of the QR Component wouldn't update immediately.
* Fixes a bug in the User area, where the QR code itself won't update if the data source is changed.

### Additional step 2 - Using Typescript

One of the primary benefits from moving away from AngularJS and into Angular is Typescript's strong typing versus JavaScript's weak typing.

One such example of this is the [QrCodeAttributes](projects/components/src/lib/qr-code/qr-code.component.ts) being used as a generic in the `QrCodeComponent`:

    @Input() childNode!: Control<QrCodeAttributes>;

Which we will be validated in HTML files:

    <h2 *ngIf="childNode.typeAttributes.title?.text">
      {{childNode.typeAttributes.title?.text}}
    </h2>

Or in TS files:

    return metadata?.fields?.find(field => field.name === this.childNode.typeAttributes.dataSource);

The result of this code change means that: if typeAttributes used an Interface from the SAS Visual Investigator API package, and there is an update to that package, then a compile error will display immediately upon updating it instead of being unaware until it is discovered by a developer or tester.

This also helps IDEs provide support to you such as through VSCode's Intellisense or JetBrains' Code Completion, both of which will discover APIs defined in the TypeScript and offer up suggestions and warnings in real time before compiling any code. 

## Using the SAS VI API

Lastly, the [SAS VI API](https://developer.sas.com/apis/vi/apiDocs/) is available on the window for any control to use, and enables you to find a variety of useful functions and features of the SAS Visual Investigator user and administrator applications.

You can access the SAS Visual Investigator API via the following:

    (window as SviWindow).sas.vi

With a basic example of this being used to access the metadata of the relevant data source in the QR Component:

    getDataSourceMetadata = async () => {
      const currentEntity = this.pageModel.type
      if (!currentEntity) {
        return undefined;
      }
      const metadataAPI = (window as SviWindow).sas.vi.metadata as MetadataApi;
      const metadata = await metadataAPI.getEntity(currentEntity);
      return metadata?.fields?.find(field => field.name === this.childNode.typeAttributes.dataSource);
    }
