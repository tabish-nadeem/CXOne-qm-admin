const niceHybridWebpackUtils = require('hybrid-webpack-utils');
const LastCallWebpackPlugin = require('last-call-webpack-plugin');
const path = require('path');

module.exports = {
  externals: {
    angular: 'angular',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        exclude: [/\.(po|spec)\.js$/, /node_modules/],
        include: path.resolve(__dirname, 'src/ng1')
      }
    ]
  },
  plugins: [
    new niceHybridWebpackUtils.NiceTranslationsPlugin({
      baseFolder: 'src/assets/strings/'
    }),
    new niceHybridWebpackUtils.NiceTemplateCachePlugin({
      base: 'src/ng1/app/',
      moduleName: 'templates-app',
      baseFolder: 'src/ng1/app/',
      outputFileName: 'templates.js'
    }),
    new niceHybridWebpackUtils.NiceTemplateCachePlugin({
      base: 'src/ng1/common/',
      moduleName: 'templates-common',
      baseFolder: 'src/ng1/common/',
      outputFileName: 'templatesCommon.js'
    }),
    new LastCallWebpackPlugin(niceHybridWebpackUtils.getLastCallPluginParams('TEST'))
  ]
};
