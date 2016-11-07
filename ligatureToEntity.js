'use strict';

function traverse(node, func) {
  func(node);
  for (var key in node) {
    if (node.hasOwnProperty(key)) {
      const child = node[key];
      if (typeof child === 'object' && child !== null) {
        if (Array.isArray(child)) child.forEach((node) => { 
          traverse(node, func) });
        else traverse(child, func);
      }
    }
  }
}

/**
 * replace p1 capture group in all instances of source
 * 
 * @param {string} tag html element to target
 * @param {string} className css class name to identify correct element selection
 * @param {object} ast abstract syntax tree object of parsed source code
 * @param {object} replaceValueList object containing replacement values
 * @returns string
 */
module.exports.findAndReplaceLigatures = (tag, attr, ast, entityList, debug) => {
  const estraverse = require('estraverse');
  // const parsed = JSON.stringify(syntax, null, 2);

  // console.log('\b ----------------------------------------')
  // console.log(JSON.stringify(syntax, null, 2));
  // console.log('\b ----------------------------------------')

  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (node.type === 'CallExpression' && node.arguments[0].value === tag) {
        console.log(JSON.stringify(node.arguments, null, 4));
      }
    }
  });


  const escodegen = require('escodegen');
  return escodegen.generate(ast);

  // // build regular expression
  // const escTag = tag.replace('-', '\\-');
  // const regEx = new RegExp('(<'+ escTag +'[^>]*>)([^<]*)(<\/'+ escTag +'>)','ig');

  // // vars to display stats if debugging 
  // const replacedValues = [];
  // const skippedValues = [];

  // const content = source.replace(regEx, function(match, p1, p2, p3) {
  //   // if matched element has required attr and does not find a match return 
  //   if(attr && !match.includes(attr)) {
  //     skippedValues.push(match);
  //     return match;
  //   }

  //   // expect p2 to be ligature
  //   const ligature = p2.trim();
   
  //   if(ligature) {
  //     const replaceValue = entityList[ligature];
  //     // if replaceValue exists replace ligature
  //     if(replaceValue) {
  //       const htmlEntity = '&#x' + replaceValue + ';';
  //       // rebuild match
  //       const result = p1 + htmlEntity + p3;
  //       if(debug) replacedValues.push({ ligature, match, result });
  //       // return new string
  //       return result;
  //     }
  //   }

  //   // no match
  //   skippedValues.push(match);
  //   return match;

  // });

  // // in debug mode print all replaced values, modified count, found but not modified count
  // if(debug) {
  //   const colors = require('colors');
  //   const replCnt = replacedValues.length;
  //   const skipCnt = skippedValues.length;
    
  //   if(replCnt) {
  //     console.log('\n')
  //     console.log(colors.green('> OK: ' + replCnt) + ' values found and REPLACED');
  //     console.log(replacedValues);
  //   }
  //   if(skipCnt) {
  //     console.log('\n')
  //     console.log(colors.red('> NotOK ' + skipCnt) + ' matches found but NOT modified');
  //     console.log(skippedValues);
  //   }
  // }

  // return content;
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
 * converts source code (string) to an object using esprima 
 * 
 * @param {string} source
 * @return {object}
 */
module.exports.sourceToAst = (source, config) => {
  // ast parser
  const esprima = require('esprima');
  // return parsed AST
  return esprima.parse(source, config);
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