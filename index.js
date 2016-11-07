const findAndReplaceLigatures = require('./ligatureToEntity').findAndReplaceLigatures;
const codepointsToObject = require('./ligatureToEntity').codepointsToObject;
const generateRegEx = require('./ligatureToEntity').generateRegEx;
const sourceToAst = require('./ligatureToEntity').sourceToAst;
const astToSource = require('./ligatureToEntity').astToSource;
const getFile = require('./ligatureToEntity').getFile;
const loaderUtils = require('loader-utils');

/**
 * transforms source code replacing google material icon ligatures
 * with unicode value equivalent
 * 
 * @param {string} source
 * @returns string
 */
module.exports = function(source) {

  // check if loader is first
  const isLoaderFirst = (this.loaders.length - 1) === this.loaderIndex;  
  
  // format query
  const query = loaderUtils.parseQuery(this.query);

  // define tag and attr values
  const tag = (!query.tag) ? 'i' : query.tag ;
  const attr = (typeof query.attr !== 'undefined') ? query.attr : 'material-icons' ;
  
  // is debug active?
  const debug = (!query.debug) ? false : true ;

  // convert source (string) to AST 
  const ast = sourceToAst(source, { 
    sourceType: 'module',
    jsx: true
  });

  // map codepoints file to js object
  const codepointsDir = require.resolve('material-design-icons/iconfont/codepoints');
  const codepoints = codepointsToObject(getFile(codepointsDir));

  // modify source replacing ligatures
  const astSource = findAndReplaceLigatures(tag, attr, ast, codepoints, debug);
  
  // generate source code from ast
  const content = astToSource(astSource);

  // return transformed source
  return content;
};