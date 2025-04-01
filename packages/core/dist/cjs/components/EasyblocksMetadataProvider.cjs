'use client';
/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var core = require('@stitches/core');
var React = require('react');
var ssr = require('./ssr.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var EasyblocksMetadataContext = /*#__PURE__*/React.createContext(undefined);
var EasyblocksMetadataProvider = function EasyblocksMetadataProvider(_ref) {
  var meta = _ref.meta,
    children = _ref.children;
  // Let's load stitches instance
  if (ssr.easyblocksStitchesInstances.length === 0) {
    ssr.easyblocksStitchesInstances.push(core.createStitches({}));
  }
  return /*#__PURE__*/React__default["default"].createElement(EasyblocksMetadataContext.Provider, {
    value: _objectSpread(_objectSpread({}, meta), {}, {
      stitches: ssr.easyblocksStitchesInstances[0]
    })
  }, children);
};
function useEasyblocksMetadata() {
  var context = React.useContext(EasyblocksMetadataContext);
  if (!context) {
    throw new Error("useEasyblocksMetadata must be used within a EasyblocksMetadataProvider");
  }
  return context;
}

exports.EasyblocksMetadataProvider = EasyblocksMetadataProvider;
exports.useEasyblocksMetadata = useEasyblocksMetadata;
