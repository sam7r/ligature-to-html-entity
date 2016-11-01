'use strict';

/**
 * replace p1 capture group in all instances of source
 * 
 * @param {string} tag html element to target
 * @param {string} className css class name to identify correct element selection
 * @param {string} source original source code to be parsed
 * @param {object} replaceValueList object containing replacement values
 * @returns string
 */
module.exports.findAndReplaceLigatures = (tag, attr, source, entityList, debug) => {
  // build regular expression
  const escTag = tag.replace('-', '\\-');
  const regEx = new RegExp('<'+ escTag +'[^>]*>([^<]*)<\/'+ escTag +'>','ig');

  // vars to display stats if debugging 
  const replacedValues = [];
  const skippedValues = [];

  const content = source.replace(regEx, function(match, p1) {

    // if matched element has required attr and does not find a match return 
    if(attr && !match.includes(attr)) {
      skippedValues.push(match);
      return match;
    }

    // expect p1 to be ligature
    const ligature = p1.trim();
   
    if(ligature) {
      const replaceValue = entityList[ligature];
      // if replaceValue exists replace ligature
      if(replaceValue) {
        const htmlEntity = '&#x' + replaceValue + ';';
        if(debug) replacedValues.push(match);
        return match.replace(ligature, htmlEntity);
      }
    }

    // no match
    skippedValues.push(match);
    return match;

  });

  // in debug mode print all replaced values, modified count, found but not modified count
  if(debug) {
    console.log('\n------------------------------\n');
    console.log('# DEBUG: ligature-to-html-entity');
    console.log('\n')
    console.log('- tag: '+ tag);
    console.log('- attr: '+ attr);
    console.log('\n')
    console.log('> OK: ' + replacedValues.length + ' values found and REPLACED');
    console.log(replacedValues);
    console.log('\n')
    console.log('> NotOK ' + skippedValues.length + ' matches found but NOT modified');
    console.log(skippedValues);
    console.log('\n------------------------------\n');
  }

  return content;
};

/**
 * converts given codepoints file to object -> {ligature : unicode}
 * 
 * @param {string} ligature
 */
module.exports.codepointsToObject = (file) => {
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
};

/**
 * converts given codepoints file to object -> {ligature : unicode}
 * 
 * @param {string} dir string path of file
 */
module.exports.getFile = (dir) => {
  const fs = require('fs');
  return fs.readFileSync(dir, 'utf-8');
};