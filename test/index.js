'use strict';
const expect = require('expect');
const test = require('tape');
const codepointsToObject = require('../ligatureToEntity').codepointsToObject;
const getFile = require('../ligatureToEntity').getFile;
const ligatureToEntity = require('../index.js');

// get codepoints object
const codepointsDir = require.resolve('material-design-icons/iconfont/codepoints');
const codepoints = codepointsToObject(getFile(codepointsDir));

// mock webpack props
const loaderConfig = { loaderIndex: 0, loaders: [1], query: "?debug" };

/**
 * get html entity value of ligature
 * 
 * @param {string} ligature
 * @returns string entity value
 */
function getEntityVal(ligature) {
  return '&#x' + codepoints[ligature] + ';';
};

/**
 * expects array of icon ligatures to return concat'd string of <i> tags 
 * 
 * @param {array} icons
 * @returns string
 */
function generateIconHtml(config) {
  const tag = (config.tag) ? config.tag : 'i' ;
  const attr = (config.attr) ? config.attr : 'className="material-icons' ;
  const icons = config.icons;

  return icons.map(icon => {
    return `<${tag} ${attr}>${icon}</${tag}>`
  }).join('\n');
}

// tests main ligatureToEntity method
test('ligatureToEntity single icon replace in HTML', t => {
  const icon = generateIconHtml({ icons: ['zoom_in']});
  const source = ligatureToEntity.bind(loaderConfig)(icon);

  t.ok(expect(source).toNotContain('zoom_in'), 'ligature zoom_in no longer exists');
  t.ok(expect(source).toContain(getEntityVal('zoom_in')), 'entity for zoom_out_map has been inserted');

  t.end();
});

// tests main ligatureToEntity method
test('ligatureToEntity mulitple icon replace in HTML', t => {
  const iconsArr = ['face', 'zoom_in', 'zoom_out', 'zoom_out_map'];
  const icons = generateIconHtml({ icons: iconsArr });
  const source = ligatureToEntity.bind(loaderConfig)(icons);

  iconsArr.map((icon) => {
    t.ok(expect(source).toNotContain(icon), `ligature ${icon} no longer exists`);
    t.ok(expect(source).toContain(getEntityVal(icon)), `entity for ${icon} has been inserted`);
  });

  t.end();
});

test('ligatureToEntity with custom tag and default attr', t => {
  const icon = generateIconHtml({ tag: 'md-icon', icons: ['zoom_in']});
  const config = Object.assign({}, loaderConfig, { query: '?tag=md-icon' });
  const source = ligatureToEntity.bind(config)(icon);

  t.ok(expect(source).toNotContain('zoom_in'), 'ligature zoom_in no longer exists');
  t.ok(expect(source).toContain(getEntityVal('zoom_in')), 'entity for zoom_in has been inserted');

  t.end();
});

test('ligatureToEntity custom tag with attr disbaled', t => {
  const icon = generateIconHtml({ tag: 'md-icon', attr: '', icons: ['zoom_in']});
  const config = Object.assign({}, loaderConfig, { query: '?tag=md-icon&-attr' });
  const source = ligatureToEntity.bind(config)(icon);

  t.ok(expect(source).toNotContain('zoom_in'), 'ligature zoom_in no longer exists');
  t.ok(expect(source).toContain(getEntityVal('zoom_in')), 'entity for zoom_in has been inserted');

  t.end();
});

test('ligatureToEntity with custom attr and default tag', t => {
  const icon = generateIconHtml({ attr: 'customAttr="myAttr"', icons: ['zoom_in']});
  const config = Object.assign({}, loaderConfig, { query: '?attr=customAttr' });
  const source = ligatureToEntity.bind(config)(icon);

  t.ok(expect(source).toNotContain('zoom_in'), 'ligature zoom_in no longer exists');
  t.ok(expect(source).toContain(getEntityVal('zoom_in')), 'entity for zoom_in has been inserted');

  t.end();
});
