const editJsonFile = require("edit-json-file");
const glob = require('glob');
var angularJSResolver = require('./angularJsDependenciesResolver');

let angularJsonFile = editJsonFile('./angular.json');
let projectName = angularJsonFile.get('defaultProject');
let buildOptionsPath = `projects.${projectName}.architect.build.options`;
let testOptionsPath = `projects.${projectName}.architect.test.options`;
let buildScriptsPath = `${buildOptionsPath}.scripts`;
let buildStylesPath = `${buildOptionsPath}.styles`;
let testScriptsPath = `${testOptionsPath}.scripts`;

let projectScripts = glob.sync('src/ng1/**/!(*.spec|*.po).js')
  .sort((a, b) => b.toLowerCase().indexOf('module') - a.toLowerCase().indexOf('module'))
  .map((path) => ({input: path, bundleName: 'ng1Code'}));
let projectGlobalStyles = glob.sync('src' + '/**/main.less');
let externalDependencies = angularJSResolver.getDependencies();

angularJsonFile.set(buildScriptsPath, externalDependencies.js.concat(projectScripts));
angularJsonFile.set(buildStylesPath, externalDependencies.css.concat(projectGlobalStyles));
angularJsonFile.set(testScriptsPath, externalDependencies.js.map(p =>{
  return p.input ? p.input : p;
}));

angularJsonFile.save();
