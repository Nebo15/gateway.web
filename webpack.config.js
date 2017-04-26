require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const precss = require('precss');
const postCssNested = require('postcss-nested');
const postCssApply = require('postcss-apply');
const postCssVariables = require('postcss-css-variables');
const postCssImport = require('postcss-import');
const postCssMath = require('postcss-math');

const merge = require('lodash/merge');

const DEBUG = process.env.NODE_ENV !== 'production';

const options = {
  localIdentName: DEBUG ? '[local]__[path][name]__[hash:base64:5]' : '[hash:base64]',
};

const genConfig = {
  devtool: DEBUG ? 'eval' : false,
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        loaders: [
          'nebo15-isomorphic-style-loader',
          `css?localIdentName=${options.localIdentName}&modules&importLoaders=1&sourceMap`,
          'postcss',
        ],
      },
      {
        test: /\.css/,
        loaders: [
          'nebo15-isomorphic-style-loader',
          'css',
          'postcss',
        ],
      },
      {
        test: /\.font\.(js|json)$/,
        loaders: [
          'nebo15-isomorphic-style-loader',
          `css?localIdentName=${options.localIdentName}&modules&importLoaders=1&sourceMap`,
          'fontgen?embed',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'file',
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        loaders: [
          'file?name=[name].[ext]?[hash]',
        ],
      },
      {
        test: /\.svg/i,
        loaders: [
          'file-loader',
        ],
      },
      {
        test: /\.json/i,
        loader: 'json-loader',
      },
    ],
  },
  postcss(webpackObj) {
    return [
      postCssImport({
        addDependencyTo: webpackObj,
        path: [
          path.resolve(`${__dirname}/assets/styles`),
        ],
      }),
      precss,
      autoprefixer,
      postCssNested,
      postCssVariables,
      postCssMath,
      postCssApply,
    ];
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  resolve: {
    packageAlias: 'browser',
  },
};

const config = merge({
  devtool: DEBUG ? 'eval' : false,
  entry: {
    app: './app/client',
  },
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: '[name].js?[hash]',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: process.env.NODE_ENV,
      }),
      __DEV__: DEBUG,
      __CLIENT__: true,
    }),
    new AssetsPlugin({
      path: path.join(__dirname, 'static'),
    }),
  ],
  node: {
    fs: 'empty',
    file: 'empty',
    system: 'empty',
  },
}, genConfig);

const serverConfig = merge({
  entry: {
    server: './app/server/server.js',
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/static/',
    libraryTarget: 'commonjs2',
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: DEBUG,
      __CLIENT__: false,
    }),
  ],

  externals: [
    /^[a-z\/\-0-9]+$/i,
  ],
}, genConfig);

if (DEBUG) {
  config.output.publicPath = 'http://localhost:3030/static/';
  config.entry.app = [
    'webpack-dev-server/client?http://localhost:3030', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    config.entry.app,
  ];
  config.module.loaders[0].loaders.unshift('react-hot-loader/webpack');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  const concatedPlugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ];

  config.plugins = config.plugins.concat(concatedPlugins);
  serverConfig.plugins = serverConfig.plugins.concat(concatedPlugins);
}

module.exports = [
  config,
  serverConfig,
];
