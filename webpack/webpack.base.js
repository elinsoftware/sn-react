const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const servicenowConfig = require('./servicenow.config')

const ROOT_PATH = path.join(__dirname, '../')

const DEFAULTS = { ASSET_SIZE_LIMIT: 10000 }
const CONFIG = { ...DEFAULTS, ...servicenowConfig }

module.exports = {
  entry: {
    [CONFIG.JS_API_PATH + 'app']: ['./src/index.js'],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          minChunks: 1,
          maxSize: 0,
          name: 'vendor',
          test: /([\\/]node_modules[\\/])|(assets\/)/,
          priority: -10,
        },
      },
    },
  },

  output: {
    publicPath: '/',
    path: path.join(ROOT_PATH, 'dist/'),
    filename: '[name]-[hash]-js',
    chunkFilename: CONFIG.JS_API_PATH + '[name]-[chunkhash]-js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  rules: {
    svg: {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        noquotes: true,
      },
      exclude: /node_modules/,
    },

    css: {
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader'],
    },
  
    img: {
      test: /\.(png|jpg|gif|)$/,
      loader: 'url-loader',
      options: {
        limit: CONFIG.ASSET_SIZE_LIMIT,
        name: CONFIG.IMG_API_PATH + '[name]-[hash:6]-[ext]',
      },
    },
    assets: {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'url-loader',
      options: {
        limit: CONFIG.ASSET_SIZE_LIMIT,
        name: CONFIG.ASSETS_API_PATH + '[name]-[hash:6]-[ext]',
      },
    },

    jsx(args) {
      args = args || {}
      var emitWarning = false
      if (args.withHot) {
        // report eslint errors as warnings so hot reloads are not prevented
        emitWarning = true
      }

      return {
        include: [path.join(ROOT_PATH, 'src')],
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning,
            },
          },
        ],
      }
    },
  },

  plugins: {
    createIndexHtml() {
      return createHtmlPluginInstance({
        filename: 'index.html',
        title: '',
        chunks: 'app',
        template: 'src/index.html',
      })
    },
  },
}

function createHtmlPluginInstance(cfg) {
  cfg.inject = true
  return new HtmlWebPackPlugin(cfg)
}
