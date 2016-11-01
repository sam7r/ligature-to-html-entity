const constants = require('./constants');
const findAndReplaceLigatures = require('./ligatureToEntity').findAndReplaceLigatures;
const codepointsToObject = require('./ligatureToEntity').codepointsToObject;
const getFile = require('./ligatureToEntity').getFile;

/**
 * transforms source code replacing google material icon ligatures
 * with unicode value equivalent
 * 
 * @param {string} source
 * @returns string
 */
module.exports = function(source) {
  // format query
  const query = (this.query) ? this.query.replace('?', '') : null ;

  // check if loader is first
  const isLoaderFirst = (this.loaders.length - 1) === this.loaderIndex;

  // check if babel enabled
  const isBabel = query === 'babel';

  // warn user loader may not work properly
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

  // map codepoints file to js object
  const codepointsDir = require.resolve('material-design-icons/iconfont/codepoints');
  const codepoints = codepointsToObject(getFile(codepointsDir));

  // set correct REG EXP 
  const REG_EXP = !isBabel ? constants.JSX_REGEX : constants.ES5_REGEX ;

  // modify source replacing ligatures
  const content = findAndReplaceLigatures(constants.JSX_REGEX, source, codepoints, isBabel);

  // return transformed source
  return content;
};