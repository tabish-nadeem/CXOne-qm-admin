const fs = require('fs');
var userConfig = require('./legacyDependencies.js');

var externalDependencies = {
  vendor_files: {
    js: [],
    css: []
  },
  vendor_nice_files: {
    js: [],
    css: []
  }
};

function addDependency(path, isNiceScript) {
  if (!fs.existsSync(path)){
    return;
  }
  var type = isNiceScript ? 'vendor_nice_files': 'vendor_files';
  var extension = path.split('.').pop();
  var pathWithMin = path.slice().replace('.' + extension, '.min.' + extension);
  var userConfigProperty = (extension === 'js' || extension === 'css') ? extension : 'assets';
  var userConfigObj = externalDependencies[type][userConfigProperty];
  if (userConfigObj) {
    if (externalDependencies['vendor_files'][userConfigProperty].indexOf(path) < 0 &&
        externalDependencies['vendor_files'][userConfigProperty].indexOf(pathWithMin) < 0 &&
        externalDependencies['vendor_nice_files'][userConfigProperty].indexOf(path) < 0 &&
        externalDependencies['vendor_nice_files'][userConfigProperty].indexOf(pathWithMin) < 0) {
      userConfigObj.push(path);
    }
  }
}

function handleNiceComponentExternalDependencies(bowerConfig) {
  if (bowerConfig.externalDependencies && bowerConfig.externalDependencies.constructor === Array) {
    bowerConfig.externalDependencies.forEach(function (externalDependency) {
      var path = userConfig.bower_components + '/' + externalDependency;
      addDependency(path);
    });
  }
}

function handleNiceComponentMainFiles(bowerConfig, componentDir) {

  if (bowerConfig.main.constructor === Array) {
    bowerConfig.main.forEach(function (item) {
      var path = userConfig.bower_components + '/' + componentDir + '/' + item;
      addDependency(path, true);
    });
  } else {
    var path = userConfig.bower_components + '/' + componentDir + '/' + bowerConfig.main;
    addDependency(path, true);
  }
}

function getDependencies() {
  var bowerDirPath = __dirname + '/vendor';

  var componentDirs = fs.readdirSync(bowerDirPath);
  var successCount = 0;

  externalDependencies.vendor_files = userConfig.vendor_files;

  componentDirs.forEach(function (componentDir) {
    try {
      var bowerPath = bowerDirPath + '/' + componentDir + '/bower.json';

      fs.accessSync(bowerPath, fs.F_OK);
      var bowerConfig = JSON.parse(fs.readFileSync(bowerPath, 'utf8'));

      if (bowerConfig.niceComponent) {
        handleNiceComponentExternalDependencies(bowerConfig);
        handleNiceComponentMainFiles(bowerConfig, componentDir);
        successCount += 1;
      }
    } catch (e) {
      console.log('Error handling Bower component at ', bowerDirPath + '/' + componentDir);
      console.log(e);
    }
  });

  console.log('>> ' + successCount + ' Nice Bower components handled');
  return {
    js: externalDependencies.vendor_files.js.concat(externalDependencies.vendor_nice_files.js.map(path => ({input: path, bundleName: 'ng1Code'}))),
    css: externalDependencies.vendor_files.css.concat(externalDependencies.vendor_nice_files.css)
  };
}


module.exports = {
  getDependencies: getDependencies
};
