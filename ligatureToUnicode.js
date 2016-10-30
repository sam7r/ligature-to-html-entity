const loaderUtils = require('loader-utils');
const path = require('path');
var fs = require('fs');

/**
 * replace all instances of regEx in source
 * 
 * @param {string} regEx
 * @param {string} source
 * @returns string
 */
function findAndReplaceLigatures(regEx, sourcecode, replaceValueList) {

  return sourcecode.replace(regEx, function(match, p1) {
    // expect p1 to be ligature
    const m1 = p1.trim();
    // if matched element is not a material icon return
    if(!match.includes('material-icons')) return match; 
    // if p1 return match with replaced ligature   
    if (p1) return match.replace(m1, '&#x' + replaceValueList[m1]);
    
    return match;
  });
}

/**
 * lookup google material icon unicode value for given ligature
 * 
 * @param {string} ligature
 */
function getCodepoints(file) {
  // codepoints container
  const codepointsObj = {};

  // split file by line, then [ligature : unicode] 
  file.split("\n")
  .filter((line) => line !== '')
  .map((line) => {
    const item = line.split(' ');
    codepointsObj[item[0]] = item[1]
  });

  return codepointsObj;
}

/**
 * transforms source code replacing google material icon ligatures
 * with unicode value equivalent
 * 
 * @param {string} source
 * @returns string
 */
function ligatureTransform(source) {

  // resolve path to codepoints within material-design-icons lib
  const codepointsPath = path.join('node_modules', 'material-design-icons', 'iconfont', 'codepoints');
  const codepointsFile = fs.readFileSync(codepointsPath, 'utf-8');
  const codepoints = getCodepoints(codepointsFile); // extract 

    // catch all <i> DOM elements
  const iconRegEx = /<i[^>]*>([^<]*)<\/[i]>/ig;
  
  // modify source replacing ligatures
  return findAndReplaceLigatures(iconRegEx, source, codepoints)
}

module.exports = function(content) {
    return ligatureTransform(content);
};