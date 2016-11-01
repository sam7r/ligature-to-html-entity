const loaderUtils = require('loader-utils');

const findAndReplaceLigatures = require('./ligatureToEntity').findAndReplaceLigatures;
const codepointsToObject = require('./ligatureToEntity').codepointsToObject;
const generateRegEx = require('./ligatureToEntity').generateRegEx;
const getFile = require('./ligatureToEntity').getFile;

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
  if(!isLoaderFirst) {
    this.emitError(
      'ligature-to-entity expects to be loaded first (end of list), ' +
      'to work properly: \n' +
      'loaders: [\n' +
      '  react-hot\n' +
      '  babel?presets[]=es2015,presets[]=react\n' +
      "  ligature-to-entity \n" +
      "]"
    );
  }

  // format query
  const query = loaderUtils.parseQuery(this.query);

  // define tag and attr values
  const tag = (!query.tag) ? 'i' : query.tag ;
  const attr = (typeof query.attr !== 'undefined') ? query.attr : 'material-icons' ;
  
  // is debug active?
  const debug = (!query.debug) ? false : true ;

  // map codepoints file to js object
  const codepointsDir = require.resolve('material-design-icons/iconfont/codepoints');
  const codepoints = codepointsToObject(getFile(codepointsDir));

  // modify source replacing ligatures
  const content = findAndReplaceLigatures(tag, attr, source, codepoints, debug);

  // return transformed source
  return content;
};