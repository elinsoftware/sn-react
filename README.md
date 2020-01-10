# React boilerplate for ServiceNow applications

This is a React boilerplate that is specifically designed to build ServiceNow-ready web applications.

The boilerplate includes a minimalistic example of a ServiceNow scoped app, which serves as a container for a web application. Update set `react-container-servicenow.xml` can be found in a root folder.

This boilerplate supports all of the modern web development features and capabilities:

- Standard React loaders/processors
- Proxy requests
- Chunks and lazy loading optimizations
- CSS-in-JS
- Hot reloading etc.

The key feature is the ability to build the web application ServiceNow-ready, so it can be deployed simply by uploading bundle files to ServiceNow.

It's assumed that you already have an app container (Scripted REST API) ready on a ServiceNow side, that is the place where files need to be uploaded. If you don't have it yet then you can use the `react-container-servicenow.xml` app as an example and build your own containers.

## 1. Configuration

To run a local development server you need to update ServiceNow configuration in `./webpack/servicenow.config.js`. Proper configuration is required to proxy REST calls to the ServiceNow instance and to build the application package.

#### Configuration Settings Overview

These are the available configuration settings.

**`REST_API_PATH`** - `'/api'`

This is a default prefix for all ServiceNow APIs and should not be changed.

---

**`SERVICENOW_INSTANCE`** - `'https://<instance-name>.service-now.com'`

ServiceNow instance URL for REST calls

- it is being used in Development mode only
- this should be the instance where React application will be deployed to

---

**`REACT_APP_USER`** - `'<username>'`

ServiceNow username for API requests

- it is being used for sending REST calls in Development mode only
- no need to provide credentials for Production

---

**`REACT_APP_PASSWORD`** - `'<password>'`

ServiceNow user password, for Development mode only

---

**`JS_API_PATH`** - `'api/<scoped_app_name>/container/js/'`

ServiceNow path to the GET resource which serves JavaScript files

- Current configuration does not produce CSS files
- CSS code will be embedded into javascript files

---

**`IMG_API_PATH`** - `'api/<scoped_app_name>/container/img/'`

ServiceNow path to the GET resource which serves Image files (png, jpg, gif)

- SVG files will be embedded into JavaScript files

---

**`ASSETS_API_PATH`** - `'api/<scoped_app_name>/container/other_assets/'`

ServiceNow path to the GET resource which serves other files like fonts etc.

---

**`ASSET_SIZE_LIMIT`** - `10000`

Fonts and images below this size (in bytes) will be put inside JS chunks, instead of being saved as separate files.

## 2. Development

Development of a ServiceNow application with React is no different from any other stuff you would do in modern web development — component libraries, routing, CSS-in-JS, lazy loading, optimization, etc. Everything supported, there are no limits!

Start the development server

```
$ npm start
```

## 3. Production build

To create a production build for ServiceNow deployment:

1. Make sure you provided correct API paths to your REST resources (JS/IMG/ASSETS) in `./webpack/servicenow.config.js`
2. Run `npm run build`
3. Find the production build in the `dist/` directory 🎉

##### Chunks and assets

> **Note** Instead of '.' (dots) in file names, all chunks and assets use '-' (dash), so build files don't have typical extensions.

Apart from your application source code, the **JS bundle** includes images (png, jpg, gif) and fonts below the size limit (10kB by default) and all CSS styles.

Files larger than the size limit and other file types are saved as separate files under the assets directory.

To change the size limit, set the `ASSET_SIZE_LIMIT` config property.

## 4. Deployment

Once the application is built, the package files will be located in the folders you specified in `./dist` folder:

1. Copy `index.html` code into a UI page. HTML code is ServiceNow-ready, so you don't need to make any changes.
2. Drag-n-drop JavaScript files from `./dist/api/.../js` folder to the corresponding REST API resource. Do the same with image and asset files.

That would conclude the deployment process. Open the application by navigating to the UI page URL.
