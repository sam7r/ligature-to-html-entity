'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {};

config.devtool = 'false',

config.entry = path.join(__dirname, 'app');

config.entry = {
  bundle: path.join(__dirname, 'app'),
  vendor: ['react', 'react-dom']
};

config.output = {
  path: path.join(__dirname, 'js'),
  publicPath: '/js/',
  filename: 'output.js'
};

config.module = {
  loaders: [
    {
      test: /\.js$/,
      exclude: path.resolve(__dirname, '../', 'node_modules'),
      loaders: [
        'babel?presets[]=es2015,presets[]=react',
        path.resolve(__dirname, '../', 'index.js')
        ]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }
  ]
};

config.plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  })
];

module.exports = config;
