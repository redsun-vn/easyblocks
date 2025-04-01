'use client';
/* with love from shopstory */
import React, { useContext, createContext } from 'react';

var EasyblocksExternalDataContext = /*#__PURE__*/createContext(null);
function useEasyblocksExternalData() {
  var context = useContext(EasyblocksExternalDataContext);
  if (!context) {
    throw new Error("useEasyblocksExternalData must be used within a EasyblocksExternalDataProvider");
  }
  return context;
}
function EasyblocksExternalDataProvider(_ref) {
  var children = _ref.children,
    externalData = _ref.externalData;
  return /*#__PURE__*/React.createElement(EasyblocksExternalDataContext.Provider, {
    value: externalData
  }, children);
}

export { EasyblocksExternalDataProvider, useEasyblocksExternalData };
