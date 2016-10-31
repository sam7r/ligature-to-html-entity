const path = require('path');

const constants = Object.freeze({
  ICON_REGEX: /<i[^>]*>([^<]*)<\/[i]>/ig,
  CODEPOINTS_DIR: path.join('node_modules', 'material-design-icons', 'iconfont', 'codepoints')
});

module.exports = constants;