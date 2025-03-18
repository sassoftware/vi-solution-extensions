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

# Using Existing Bearer Token For Upload

If you already have access to a bearer token then you can use this token instead of supplying an admin username and password to upload the solution extension to the server.

To upload your solution extension using an existing bearer token you must ensure that your tooling packages meet the following minimum requirements:
| Package Name | Minimum Version |
| -------------| --------------- |
| @sassoftware/vi-solution-extension-upload | 0.7 |

If you have created your workspace using the command

```shell
npx @sassoftware/vi-solution-extension-create
```

and have chosen the option to use your own bearer token for upload then the `.env` file in the workspace should look like this

```
SVI_HOSTNAME=http://server-name.com
SVI_USERNAME=
SVI_PASSWORD=
SVI_BUNDLE_PATH=./dist/elements/main.js
SVI_BEARER_TOKEN=
```

Add the existing bearer token to the `.env` file and this will be used in the bundle upload process.

## No Bearer Token Environment Variable In .env File

If the workspace has been created using an older version of the `@sassoftware/vi-solution-extension-create` create script then the SVI_BEARER_TOKEN variable may not be present in the `.env` file. This can be manually added at any point. As long as the `@sassoftware/vi-solution-extension-upload` package in the workspace is version 0.7 or higher, then the solution extension will work as expected.
