const path = require('path');

module.exports = function (webpackConfig, env) {
  webpackConfig.devtool = 'source-map';
  webpackConfig.output.devtoolModuleFilenameTemplate = info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');

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