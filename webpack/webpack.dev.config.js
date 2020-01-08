const webpack = require('webpack')
const baseCfg = require('./webpack.base')
var path = require('path')
const servicenowConfig = require('./servicenow.config')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const cfg = {
  entry: {
    app: ['react-hot-loader/patch', './src/index.js'],
  },

  output: baseCfg.output,

  resolve: {
    ...baseCfg.resolve,
    alias: {
      ...baseCfg.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    },
  },

  devtool: false,

  mode: 'development',

  devServer: {
    contentBase: path.join(__dirname, '/../dist'),
    compress: false,
    disableHostCheck: true,
    port: 9000,
    hot: true,
    proxy: {
      [servicenowConfig.REST_API_PATH]: {
        target: servicenowConfig.SERVICENOW_INSTANCE,
        secure: false,
        changeOrigin: true,
      },
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false,
    },
  },

  module: {
    strictExportPresence: true,
    rules: [
      baseCfg.rules.svg,
      baseCfg.rules.assets,
      baseCfg.rules.css,
      baseCfg.rules.img,
      baseCfg.rules.jsx({ withHot: true }),
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    baseCfg.plugins.createIndexHtml(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_USER': JSON.stringify(
        servicenowConfig.REACT_APP_USER
      ),
      'process.env.REACT_APP_PASSWORD': JSON.stringify(
        servicenowConfig.REACT_APP_PASSWORD
      ),
    }),
  ],
}

module.exports = cfg
