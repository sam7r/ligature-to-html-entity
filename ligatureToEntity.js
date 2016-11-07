'use strict';


/**
 * traverses object and runs given function
 * 
 * @param {object} node object
 * @param {func} func callback function to run on node
 */
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
  // lib to traverse and replace ast nodes
  const estraverse = require('estraverse');

  // jsx node type keys
  const jsxKeys = require('estraverse-fb/keys');
  const keys = Object.assign({}, 
    jsxKeys,
    { JSXText: ['name', 'value'] },
    { ReturnStatement: ['type', 'argument'] }
  )

  // modified and skipped value trackers for debug
  const replacedValues = [];
  const skippedValues = [];

  // traverse ast code
  const result = estraverse.replace(ast, {
    keys, // append JSX keys
    enter: (node) => {
      // node copy to perform mutations on
      const nodeCpy = Object.assign({}, node);
      
      // check for tag (es5)
      const ES5TagMatch = (
        node.type === 'CallExpression' && 
        node.arguments[0].value === tag &&
        node.arguments[2].type === 'Literal' &&
        node.callee.property.name === 'createElement'
      );

      const JSXTagMatch = (
        node.type === 'JSXElement' && 
        (node.openingElement.name && node.openingElement.name.name === tag) &&
        node.children.length === 1
      );

      const findAttr = (nodeToTraverse, attr, name, value) => {
        let found = 0;
        traverse(nodeToTraverse, (child) => {

          if(child[name] && child[name] === attr ||
            child[value] && child[value] === attr) found++ ;

          else if (child[name] && child[name][name] === attr ||
            child[value] && child[value][value] === attr) found++ ; 
        });

        return found;
      }

      const replaceVal = (ligature, callback) => {
        // get html entity from ligature
        const replaceValue = entityList[ligature];
        // if replaceValue exists replace ligature
        if(replaceValue) {
          const htmlEntity = '&#x' + replaceValue + ';';
          if(debug) replacedValues.push({ 
            ligature, 
            match: htmlEntity
          });
          // apply entity to nodes in callback
          if(typeof callback === 'function') callback(htmlEntity);
        }
      }

      if (ES5TagMatch) {
        // if attr given, check for attr
        let foundAttr = false;
        if(attr && node.arguments[1].type ==='ObjectExpression') {
          foundAttr = findAttr(node.arguments[1].properties, attr, 'name', 'value');
        }
        
        if(attr && foundAttr) {
          // get html entity from ligature
          const ligature = node.arguments[2].value;
          replaceVal(ligature, (htmlEntity) => {
            nodeCpy.arguments[2].value = htmlEntity;
            nodeCpy.arguments[2].raw = htmlEntity;
          });
        }

        return nodeCpy;
      } 
      
      if (JSXTagMatch) {
        // if attr given, check for attr
        let foundAttr = false;
        if(attr && node.openingElement.attributes.type === 'JSXAttribute' ) {
          foundAttr = findAttr(node.openingElement.attributes, attr, 'name', 'value');
        }

        if(attr && foundAttr) {
          // get html entity from ligature
          const ligature = node.children[0].value;
          replaceVal(ligature, (htmlEntity) => {
            nodeCpy.children[0].value = htmlEntity;
            nodeCpy.children[0].raw = htmlEntity;
          });
        }

        return nodeCpy;
      }

      return nodeCpy;
    }
  });

  // in debug mode print all replaced values, modified count, found but not modified count
  if(debug) {
    const replCnt = replacedValues.length;
    const skipCnt = skippedValues.length;
    
    if(replCnt) {
      console.log('\n')
      console.log('> OK: ' + replCnt + ' values found and REPLACED');
      console.log(JSON.stringify(replacedValues, null, 2));
    }
    if(skipCnt) {
      console.log('\n')
      console.log('> NotOK ' + skipCnt + ' matches found but NOT modified');
      console.log(JSON.stringify(skippedValues, null, 2));
    }
  }

  return result;

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
 * @param {object} config
 * @return {object}
 */
module.exports.sourceToAst = (source, config) => {
  // ast parser
  const esprima = require('esprima');
  // return parsed AST
  return esprima.parse(source, config);
};

/**
 * converts ast of source code back to string source 
 * 
 * @param {string} source
 * @return {object}
 */
module.exports.astToSource = (ast) => {
  // code generator
  const escodegen = require('escodegen');
  // return generated javascript code
  return escodegen.generate(ast);
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