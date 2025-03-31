'use client';
/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@stitches/core');
var index = require('../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');
var ssr = require('./ssr.cjs');
var index$1 = require('../_virtual/index.cjs');

const EasyblocksMetadataContext = /*#__PURE__*/index$1.react.exports.createContext(undefined);
const EasyblocksMetadataProvider = _ref => {
  let {
    meta,
    children
  } = _ref;
  // Let's load stitches instance
  if (ssr.easyblocksStitchesInstances.length === 0) {
    ssr.easyblocksStitchesInstances.push(core.createStitches({}));
  }
  return /*#__PURE__*/index.createElement(EasyblocksMetadataContext.Provider, {
    value: {
      ...meta,
      stitches: ssr.easyblocksStitchesInstances[0]
    }
  }, children);
};
function useEasyblocksMetadata() {
  const context = index$1.react.exports.useContext(EasyblocksMetadataContext);
  if (!context) {
    throw new Error("useEasyblocksMetadata must be used within a EasyblocksMetadataProvider");
  }
  return context;
}

exports.EasyblocksMetadataProvider = EasyblocksMetadataProvider;
exports.useEasyblocksMetadata = useEasyblocksMetadata;
