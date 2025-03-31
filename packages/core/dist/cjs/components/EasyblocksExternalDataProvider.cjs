'use client';
/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');
var index = require('../_virtual/index.cjs');

const EasyblocksExternalDataContext = /*#__PURE__*/index.react.exports.createContext(null);
function useEasyblocksExternalData() {
  const context = index.react.exports.useContext(EasyblocksExternalDataContext);
  if (!context) {
    throw new Error("useEasyblocksExternalData must be used within a EasyblocksExternalDataProvider");
  }
  return context;
}
function EasyblocksExternalDataProvider(_ref) {
  let {
    children,
    externalData
  } = _ref;
  return /*#__PURE__*/index$1.createElement(EasyblocksExternalDataContext.Provider, {
    value: externalData
  }, children);
}

exports.EasyblocksExternalDataProvider = EasyblocksExternalDataProvider;
exports.useEasyblocksExternalData = useEasyblocksExternalData;
