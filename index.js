const loaderUtils = require('loader-utils');
const constants = require('./constants');
const findAndReplaceLigatures = require('./ligatureToUnicode').findAndReplaceLigatures;
const codepointsToObject = require('./ligatureToUnicode').codepointsToObject;
const getFile = require('./ligatureToUnicode').getFile;

/**
 * transforms source code replacing google material icon ligatures
 * with unicode value equivalent
 * 
 * @param {string} source
 * @returns string
 */
module.exports = function(source) {
  // map codepoints file to js object
  const codepoints = codepointsToObject(getFile(constants.CODEPOINTS_DIR));
  // modify source replacing ligatures
  const content = findAndReplaceLigatures(constants.ICON_REGEX, source, codepoints)
  // return transformed source
  return content;
};