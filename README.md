# React boilerplate

This is a custom boilerplate for React applications for easy deploys inside ServiceNow scoped apps.

## Development

#### Environment

1. Standard React loaders/processors
2. Proxy support
3. Hot reloading

#### To run a local development server:

1. Update `webpack/servicenow.config.js` for you ServiceNow instance.

```js
const servicenowConfig = {
  SERVICENOW_INSTANCE: 'https://<instance-name>.service-now.com',
  REACT_APP_USER: '<username>',
  REACT_APP_PASSWORD: '<password>',
  REST_API_PATH: '/api',
}

module.exports = servicenowConfig
```

2. Start the development server

```
$ npm start
```

## Production build

To create a production build for deployment inside a ServiceNow scoped application:

1. Specify the [dist folder structure](#dist-folder-structure)
2. Run `npm run build`
3. Find the production build in the `dist/` directory 🎉

##### Chunks and assets

> **Note** Instead of '.' (dots) in file names, all chunks and assets use '-' (dash), so build files don't have typical extensions.

Apart from your application source code, the  **JS bundle** includes , images (png, jpg, gif) and fonts below the size limit (10kB by default) and all CSS styles.

Files larger than the size limit and other file types are saved as separate files under the assets directory.

To _change the size limit_, set the `ASSET_SIZE_LIMIT` config property (in bytes).

```js
const servicenowConfig = {
  /* ... */
  ASSET_SIZE_LIMIT: 10000,
}
```

##### Build folder structure

The build folder structure is fully customizable and is specified in the `webpack/servicenow.config.js` file.

The structure should mirror the ServiceNow scoped app Scripted REST API paths.

```js
const servicenowConfig = {
  /* ... */
  JS_API_PATH: 'api/<scoped_app_name>/<rest_entrypoint>/bundle/',
  IMG_API_PATH: 'api/<scoped_app_name>/<rest_entrypoint>/img/',
  ASSETS_API_PATH: 'api/<scoped_app_name>/<rest_entrypoint>/assets/',
}
```
