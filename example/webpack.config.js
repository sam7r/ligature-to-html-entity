'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {};

config.devtool = 'false';
config.mode = 'development';

config.entry = path.join(__dirname, 'app');

config.entry = {
  bundle: path.join(__dirname, 'app'),
  vendor: ['react', 'react-dom']
};

config.output = {
  path: path.join(__dirname, 'js'),
  publicPath: '/js/',
  filename: '[name].js'
};

config.module = {
  rules: [
    {
      test: /\.js$/,
      exclude: path.resolve(__dirname, '../', 'node_modules'),
      use: [
        {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        {
          loader: path.resolve(__dirname, '../', 'index.js')+'?debug',
        }
      ]
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    }
  ]
};

config.optimization = {
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}

module.exports = config;
