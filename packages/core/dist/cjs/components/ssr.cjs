/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');

const easyblocksStitchesInstances = [];
function easyblocksGetCssText() {
  return easyblocksStitchesInstances.map(stitches => stitches.getCssText()).join(" ");
}
function easyblocksGetStyleTag() {
  return /*#__PURE__*/index.createElement("style", {
    id: "stitches",
    dangerouslySetInnerHTML: {
      __html: easyblocksGetCssText()
    }
  });
}

exports.easyblocksGetCssText = easyblocksGetCssText;
exports.easyblocksGetStyleTag = easyblocksGetStyleTag;
exports.easyblocksStitchesInstances = easyblocksStitchesInstances;
