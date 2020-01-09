# React boilerplate for ServiceNow applications

This is a React boilerplate which is specifically designed to build ServiceNow-ready web applications.

The boilerplate includes a minimalistic example of a ServiceNow scoped app, which serves as a container for web application. Update set `react-container-servicenow.xml` can be found in a root folder.

This boilerplate supports all of the modern web development features and capabilities:
 - Standard React loaders/processors 
 - Proxy requests
 - Chunks and lazy loading optimizations
 - Css-in-JS
 - Hot reloading etc.

 The key feature is the ability to build the web applicaiton ServiceNow-ready, so it can be deployed simply by uploading bundle files to ServiceNow.

It's assumed that you already have an app container (Scripted REST API) ready on a ServceNow side, that is the place where files need to be uploaded. If you don't have it yet then you can use `react-container-servicenow.xml` app as an example and build your own containers.

## 1. Configuration

To run a local development server you need to update ServiceNow configuration in `./webpack/servicenow.config.js`. Proper configuraiton required to proxy REST calls to the ServiceNow intance and to build the application package.

#### Configuration Settings Overview
---

 - HERE WE NEED TO PUT OVERVIEW OF ALL OF THE PARAMS - 

```js
const servicenowConfig = {
  SERVICENOW_INSTANCE: 'https://<instance-name>.service-now.com',
  REACT_APP_USER: '<username>',
  REACT_APP_PASSWORD: '<password>',
  REST_API_PATH: '/api',
}

module.exports = servicenowConfig
```
Build folder structure

The build folder structure is fully customizable and is specified in the `./webpack/servicenow.config.js` file.

The structure should mirror the ServiceNow scoped app Scripted REST API paths.

```js
const servicenowConfig = {
  /* ... */
  JS_API_PATH: 'api/<scoped_app_name>/<rest_entrypoint>/js/',
  IMG_API_PATH: 'api/<scoped_app_name>/<rest_entrypoint>/img/',
  ASSETS_API_PATH: 'api/<scoped_app_name>/<rest_entrypoint>/assets/',
}
```

---

## 2. Development
Development of a ServiceNow application with React is no different from any other stuff you would do in modern web development — component libraries, routing, CSS-in-JS, lazy loading, optimization etc. Everything supported, there are no limits!

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

Apart from your application source code, the  **JS bundle** includes , images (png, jpg, gif) and fonts below the size limit (10kB by default) and all CSS styles.

Files larger than the size limit and other file types are saved as separate files under the assets directory.

To change the size limit, set the `ASSET_SIZE_LIMIT` config property (in bytes).

```js
const servicenowConfig = {
  /* ... */
  ASSET_SIZE_LIMIT: 10000,
}
```
## 4. Deployment

Once the applicaiton is built, the package files will be located in the folders you specified in `./dist` folder:
1. Copy `index.html` code into a UI page. HTML code is ServiceNow-ready, so you don't need to make any changes.
2. Drag-n-drop javascript files from `./dist/api/.../js` folder to the corresponding REST API resource. Do the same with image and asset files. 

That would conclude the deployment process. Open the application by navigation UI page URL.







