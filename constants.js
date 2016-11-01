const path = require('path');

const constants = Object.freeze({
  JSX_REGEX: /<i[^>]*>([^<]*)<\/[i]>/ig,
  ES5_REGEX: /(?:createElement\()([\s\s]*'i'[\s\S.][^)]*)/ig,
  CODEPOINTS_DIR: path.join('node_modules', 'material-design-icons', 'iconfont', 'codepoints')
});

module.exports = constants;