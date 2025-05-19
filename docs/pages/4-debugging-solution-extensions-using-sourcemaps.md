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

# Debugging Solution Extensions Using Sourcemaps

You can upload solution extensions with sourcemaps to allow debugging on your server.

To upload your solution extension with sourcemaps you must ensure that your tooling packages meet the following minimum requirements:
| Package Name | Minimum Version |
| -------------| --------------- |
| @sassoftware/vi-solution-extension-create | 1.1 |
| @sassoftware/vi-solution-extension-angular-schematics | 1.3 |
| @sassoftware/vi-solution-extension-upload | 0.5 |

To upload your solution extension with sourcemaps run the following commands:

#### Desktop

```shell
npm run watch:debug
```

#### Mobile

```shell
npm run watch:mobile-debug
```

_Note: This script does not work if uploading mobile solution extensions to a Viya 3.5 (10.8) server._

**SAS recommends that you re-upload your solution extension using the regular commands (shown below) after debugging is complete. This removes the sourcemaps from the uploaded bundle and optimizes the code.**

#### Desktop

```shell
npm run watch
```

#### Mobile

```shell
npm run watch:mobile
```

# Missing Debug Scripts

If the current workspace was scaffolded out using an older version of the tooling packages the required scripts to upload sourcemaps as part of the bundle may be missing. In this case make sure all tooling packages match the versions listed previously and add the following commands to the workspace's package.json under scripts:

#### Desktop

```javascript
"watch:debug": "env-cmd ng build --configuration development --project elements --output-hashing none --single-bundle --watch --plugin @sassoftware/vi-solution-extension-upload/src/upload-bundle.ngx-plugin"
```

#### Mobile

```javascript
"watch:mobile-debug": "env-cmd ng build --configuration development --project mobile-elements --output-hashing none --single-bundle --watch --plugin @sassoftware/vi-solution-extension-upload/src/upload-bundle.ngx-plugin"
```
