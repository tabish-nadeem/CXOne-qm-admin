const niceHybridWebpackUtils = require('hybrid-webpack-utils');
const LastCallWebpackPlugin = require('last-call-webpack-plugin');

module.exports = {
  externals: {
    angular: 'angular',
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
    new niceHybridWebpackUtils.NiceNgAnnotatePlugin(),
    new LastCallWebpackPlugin(niceHybridWebpackUtils.getLastCallPluginParams('BUILD'))
  ]
};
