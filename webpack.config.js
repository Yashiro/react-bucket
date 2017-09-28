const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (webpackConfig, env) {
  webpackConfig.output.devtoolModuleFilenameTemplate = info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');

  webpackConfig.module.rules.forEach(function(loader, index) {
    if (index >= 2) {
      if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
        loader.include = /node_modules/;
        loader.test = /\.less$/;
      }
      if (loader.test.toString() === '/\\.module\\.less$/') {
        loader.exclude = /node_modules/;
        loader.test = /\.less$/;
      }
      if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
        loader.include = /node_modules/;
        loader.test = /\.css$/;
      }
      if (loader.test.toString() === '/\\.module\\.css$/') {
        loader.exclude = /node_modules/;
        loader.test = /\.css$/;
      }
    }
  });

  if (env === 'development') {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      config: path.resolve(__dirname, 'src/utils/dev.config.js')
    };
  } else if (env === 'production') {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      config: path.resolve(__dirname, 'src/utils/prod.config.js')
    };
  }

  return webpackConfig;
};