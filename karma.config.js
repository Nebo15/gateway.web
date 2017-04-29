const webpack = require('webpack');

const karmaWebpack = require('karma-webpack');
const karmaMocha = require('karma-mocha');
const karmaCoverage = require('karma-coverage');
const karmaPhantomjsLauncher = require('karma-phantomjs-launcher');
const karmaSourcemapLoader = require('karma-sourcemap-loader');
const karmaSpecReporter = require('karma-spec-reporter');
const karmaCoveralls = require('karma-coveralls');

const webpackConfig = require('./webpack.config')[0];

const IS_COVERALLS = process.env.COVERAGE === 'coveralls';

const plugins = [
  karmaWebpack,
  karmaMocha,
  karmaCoverage,
  karmaPhantomjsLauncher,
  karmaSourcemapLoader,
  karmaSpecReporter,
];

const reporters = [
  'spec',
  'coverage',
];

if (IS_COVERALLS) {
  plugins.push(karmaCoveralls);
  reporters.push('coveralls');
}

module.exports = (config) => {
  config.set({
    basePath: '.',

    reporters,
    plugins,

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'app/**/*.spec.js',
    ],


    frameworks: ['mocha'],

    preprocessors: {
      'app/**/*.spec.js': ['webpack'],
    },

    webpack: {
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      plugins: [
        new webpack.DefinePlugin({
          __CLIENT__: true,
        }),
      ],
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|.*\.spec.js)/,
            loader: 'isparta',
          },
          {
            test: /\.scss/,
            loaders: [
              'nebo15-isomorphic-style-loader',
              'css?modules&importLoaders=1&sourceMap',
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
            loader: 'svg-inline',
          },
          {
            test: /\.json/i,
            loader: 'json-loader',
          },
        ],
      },
      postcss: webpackConfig.postcss,
    },

    webpackMiddleware: {
      noInfo: true,
    },

    browsers: ['PhantomJS'],

    coverageReporter: {
      type: 'lcov',
      dir: './coverage',
    },
  });
};
