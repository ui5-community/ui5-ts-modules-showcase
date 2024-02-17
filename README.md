# UI5 Showcase OSS Libraries From NPM Packages For TypeScript

This project demonstrates how to use OSS libraries from NPM packages for external libraries, use them at runtime in UI5 applications and to benefit from the TypeScript support for code completion.

In order to use OSS libraries from NPM packages at development time with code completion and finally at runtime you need to know the following UI5 tooling extension:

* [ui5-tooling-modules](https://www.npmjs.com/package/ui5-tooling-modules)

With this tooling extensions you can include many OSS libraries available as NPM package which are useful for the client-side applications. The tooling extension ensures that you can use the OSS library at development time and include them into the application bundle at build time.

This works with and without TypeScript as you access the modules from the OSS library with their NPM package name as prefix. For TypeScript the type definitions provided by the library or by [DefinitelyTyped](https://definitelytyped.org/) work seamlessly as the import path of the OSS library matches to the expected path:

```js
 // JavaScript define/require
sap.ui.define(["lodash"], function(lodash) {
  const { reverse } = lodash;
  ...
});

// TypeScript import (code completion works!)
import { reverse } from "lodash";
```

## How-To Use OSS Libraries

The following steps will explain how you can use OSS libraries in a *standalone* UI5 applications. The solution is not possible for *non-standalone* scenarios as you are most probably not allowed to configure the loader there.

For the showcase we are including `lodash` as a OSS library into the UI5 application.

### Preparation

The project has been created using the [easy-ui5](https://github.com/SAP/generator-easy-ui5) generator by using the [generator-ui5-ts-app](https://github.com/ui5-community/generator-ui5-ts-app).

```sh
> ~  % yo easy-ui5 ts-app

     _-----_     
    |       |    ╭──────────────────────────╮
    |--(o)--|    │  Welcome to the easy-ui5 │
   `---------´   │     3.8.0 generator!     │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 
                                   
? Enter your application id (namespace)? my.tsapp.showcase
? Which framework do you want to use? OpenUI5
? Which framework version do you want to use? 1.120.7
? Who is the author of the application? Peter Muessig
? Would you like to create a new directory for the application? Yes
? Would you like to initialize a local git repository for the application? Yes
```

### Step 1: Install and configure the tooling extension `ui5-tooling-modules`

Run the following commands to install `ui5-tooling-modules` (as dev dependency):

```sh
npm i ui5-tooling-modules -D
```

In your `ui5.yaml` you need to add the `ui5-tooling-modules-task` in the `customTasks` section and the `ui5-tooling-modules-middleware` in the `customMiddleware` section:

```yaml
specVersion: "3.0"
[...]
builder:
  customTasks:
    - name: ui5-tooling-transpile-task
      afterTask: replaceVersion
    - name: ui5-tooling-modules-task
      afterTask: ui5-tooling-transpile-task
      configuration:
        addToNamespace: true
server:
  customMiddleware:
    - name: ui5-tooling-transpile-middleware
      afterMiddleware: compression
    - name: ui5-tooling-modules-middleware
      afterMiddleware: ui5-tooling-transpile-middleware
    - name: ui5-middleware-livereload
      afterMiddleware: compression
```

When using the `ui5-tooling-transpile` in combination with the `ui5-tooling-modules` we need to ensure a proper execution order which requires to run the transpile before the module generation. With the usage of the `afterTask` and `afterMiddleware` configuration options this can be achieved.

The configuration option `addToNamespace` for the `ui5-tooling-modules-task` is important to use since it ensures to include the OSS modules into the namespace of your application or library (e.g. in this example into the namespace `my/tsapp/showcase/thirdparty`). Once you build your application, you will find the OSS modules there. This will safeguard you from deployment issues or conflicts with other similar OSS modules.

### Step 2: Install the OSS depencencies

Run the following commands to install `lodash` (as dependency) and the type definitions for `lodash` from DefinitelyTyped (as dev dependency):

```sh
npm i lodash

npm i @types/lodash -D
```

### Step 3: Add lodash as a dependency to your tsconfig.json

To get code completion support for `lodash` in TypeScript, you need to add the `@types/lodash` as type in your `tsconfig.json` in the section `types`:

```json
{
  ...
  "types": ["@openui5/types", "@types/qunit", "@types/lodash"],
  ...
}
```

### Step 4: Using the OSS Library and Benefit from Code Completion

Now it's time to use `lodash` in your UI5 application. Just import lodash functions from the lodash module as follows and you will get proper support

```js
import { reverse } from "lodash";

reverse("Hello World!".split("")).join(""));
```

### Wrap up

That's it. Enjoy...

## How to obtain support

Please use the GitHub bug tracking system to post questions, bug reports or to create pull requests.

## Contributing

Any type of contribution (code contributions, pull requests, issues) to this showcase will be equally appreciated.

## License

This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
