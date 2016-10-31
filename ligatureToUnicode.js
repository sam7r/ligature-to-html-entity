/**
 * replace p1 capture group in all instances of source
 * 
 * @param {string} regEx regular expression string
 * @param {string} source original source code to be parsed
 * @param {object} replaceValueList object containing replacement values
 * @returns string
 */
module.exports.findAndReplaceLigatures = function(regEx, sourcecode, replaceValueList) {
  return sourcecode.replace(regEx, function(match, p1) {
    // if matched element is not a material icon return
    if(!match.includes('material-icons')) return match; 
    // expect p1 to be ligature
    const ligature = p1.trim();
    // if m1 and ligature returns match, replaced value   
    if (ligature) {
      const replaceValue = replaceValueList[ligature];
      if (replaceValue) return match.replace(ligature, '&#x' + replaceValue);
    };
    // no match
    return match;
  });
}

/**
 * converts given codepoints file to object -> {ligature : unicode}
 * 
 * @param {string} ligature
 */
module.exports.codepointsToObject = function(file) {
  // codepoints container
  const codepointsObj = {};

  // split file by line
  file.split("\n")
  // filter empty (last line)
  .filter((line) => line !== '')
  // map to new object
  .map((line) => {
    const item = line.split(' ');
    codepointsObj[item[0]] = item[1]
  });

  return codepointsObj;
}

/**
 * converts given codepoints file to object -> {ligature : unicode}
 * 
 * @param {string} dir string path of file
 */
module.exports.getFile = function(dir) {
  const fs = require('fs');
  return fs.readFileSync(dir, 'utf-8');
}