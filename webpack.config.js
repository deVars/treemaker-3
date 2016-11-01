'use strict'
const path = require(`path`),
      webpack = require(`webpack`);
const BANNER = `Simple Patcher Tree-maker 2\n` +
  `Roseller M. Velicaria, Jr.\n` +
  `github.com/devars\n` +
  `${new Date()}`;
const ROOT_PATH = path.resolve('./');
const BABEL_LOADER = 'babel?presets[]=es2015&plugins[]=babel-plugin-add-module-exports';
let watchPolling = false;
/**
 * workaround for windows subsystem for linux
 * https://github.com/Microsoft/BashOnWindows/issues/468
 **/
try {
  require('os').networkInterfaces();
} catch (e) {
  require('os').networkInterfaces = () => ([]);
  watchPolling = true;
}
/**
 * end of workaround
 */

let config = {
      entry: './src/index.ts',
      output: {
        path: __dirname,
        filename: 'dist/main.js'
      },
      module: {
        loaders: [
          getFontLoaders(),
          getCSSLoaders(),
          getTSLoaders(),
          getJSLoaders(),
          getJSONLoaders()
        ]
      },
      postcss: function() {
        return [require('postcss-cssnext')({
          features: {
            customProperties: {
              variables: {
                /* Using Cyan 700 and 400 as primary */
                /* Accent color is Amber 600 */
                'primary-color-1': '#0097a7',
                'primary-color-2': '#26c6da',
                'accent-color': '#ffb300',
                'gray-1': '#fafafa',
                'gray-2': '#f5f5f5',
                'gray-3': '#e0e0e0'
              }
            }
          }
        })];
      },
      plugins: [
        new webpack.BannerPlugin(BANNER, {entryOnly: true}),
        new webpack.DefinePlugin({
          DEV_MODE: JSON.stringify(process.env.NODE_ENV === `DEV`)
        })
      ],
      resolve: {
        extensions: [
          '',
          '.webpack.js',
          '.web.js',
          '.tsx',
          '.ts',
          '.js'
        ]
      },
      watchOptions: {
        poll: watchPolling
      },
      jshint: {
        node: true,
        predef: [`window`, `DEV_MODE`]
      }
    };

if (process.env.NODE_ENV === `PROD`) {
  config.plugins.push(new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress:{}})
  );
}

if (process.env.NODE_ENV === `DEV`) {
  config.devtool = `source-map`;
}

function getCSSLoaders() {
  return {
    test: /\.s?css$/,
    loaders: ['style', 'css', 'postcss']
  };
}

function getTSLoaders() {
  return {
    test: /\.ts$/,
    exclude: /node_modules/,
    loaders: ['mithril-objectify', 'ts']
  };
}

function getJSLoaders() {
  return {
    test: /\.js$/,
    loaders: ['mithril-objectify']
  };
}

function getJSONLoaders() {
  return {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: ['json']
  };
}

function getFontLoaders() {
  return {
    test: /\.(eot|woff2?|svg|ttf)(\?v=\d\.\d\.\d)?/,
    loaders: ['file?name=dist/[sha512:hash:base64].[ext]']
  }
}

module.exports = config;