'use client';
/* with love from shopstory */
import React from '../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js';
import { r as react } from '../_virtual/index.js';

const EasyblocksExternalDataContext = /*#__PURE__*/react.exports.createContext(null);
function useEasyblocksExternalData() {
  const context = react.exports.useContext(EasyblocksExternalDataContext);
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
  return /*#__PURE__*/React.createElement(EasyblocksExternalDataContext.Provider, {
    value: externalData
  }, children);
}

export { EasyblocksExternalDataProvider, useEasyblocksExternalData };
