'use client';
/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { createStitches } from '@stitches/core';
import React, { useContext, createContext } from 'react';
import { easyblocksStitchesInstances } from './ssr.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var EasyblocksMetadataContext = /*#__PURE__*/createContext(undefined);
var EasyblocksMetadataProvider = function EasyblocksMetadataProvider(_ref) {
  var meta = _ref.meta,
    children = _ref.children;
  // Let's load stitches instance
  if (easyblocksStitchesInstances.length === 0) {
    easyblocksStitchesInstances.push(createStitches({}));
  }
  return /*#__PURE__*/React.createElement(EasyblocksMetadataContext.Provider, {
    value: _objectSpread(_objectSpread({}, meta), {}, {
      stitches: easyblocksStitchesInstances[0]
    })
  }, children);
};
function useEasyblocksMetadata() {
  var context = useContext(EasyblocksMetadataContext);
  if (!context) {
    throw new Error("useEasyblocksMetadata must be used within a EasyblocksMetadataProvider");
  }
  return context;
}

export { EasyblocksMetadataProvider, useEasyblocksMetadata };
