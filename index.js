const findAndReplaceLigatures = require('./ligatureToEntity').findAndReplaceLigatures;
const codepointsToObject = require('./ligatureToEntity').codepointsToObject;
const generateRegEx = require('./ligatureToEntity').generateRegEx;
const sourceToAst = require('./ligatureToEntity').sourceToAst;
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

  // warn user: loader must be placed first (pre-transpiled) 
  // if(!isLoaderFirst) {
  //   this.emitError(
  //     'ligature-to-entity is not being loaded first, if you are converting ' +
  //     'to work properly: \n'
  //   );
  // }

  // format query
  const query = loaderUtils.parseQuery(this.query);

  // define tag and attr values
  const tag = (!query.tag) ? 'i' : query.tag ;
  const attr = (typeof query.attr !== 'undefined') ? query.attr : 'material-icons' ;
  
  // is debug active?
  const debug = (!query.debug) ? false : true ;

  // is debug active?
  const jsx = (!query.jsx) ? false : true ;

  const ast = sourceToAst(source, { 
    sourceType: 'module',
    range: true,
    jsx: true
  });

  // map codepoints file to js object
  const codepointsDir = require.resolve('material-design-icons/iconfont/codepoints');
  const codepoints = codepointsToObject(getFile(codepointsDir));

  // modify source replacing ligatures
  const content = findAndReplaceLigatures(tag, attr, ast, codepoints, debug);

  // return transformed source
  return content;
};