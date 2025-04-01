/* with love from shopstory */
import React from 'react';

var easyblocksStitchesInstances = [];
function easyblocksGetCssText() {
  return easyblocksStitchesInstances.map(function (stitches) {
    return stitches.getCssText();
  }).join(" ");
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
