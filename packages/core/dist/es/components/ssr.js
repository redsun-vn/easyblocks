/* with love from shopstory */
import React from '../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js';

const easyblocksStitchesInstances = [];
function easyblocksGetCssText() {
  return easyblocksStitchesInstances.map(stitches => stitches.getCssText()).join(" ");
}
function easyblocksGetStyleTag() {
  return /*#__PURE__*/React.createElement("style", {
    id: "stitches",
    dangerouslySetInnerHTML: {
      __html: easyblocksGetCssText()
    }
  });
}

export { easyblocksGetCssText, easyblocksGetStyleTag, easyblocksStitchesInstances };
