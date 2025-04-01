/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var buttonOptionalIconSchemaProp = {
  prop: "symbol",
  label: "Symbol",
  type: "component",
  accepts: ["symbol"],
  visible: true,
  group: "Properties"
};
var buttonRequiredIconSchemaProp = _objectSpread(_objectSpread({}, buttonOptionalIconSchemaProp), {}, {
  required: true
});

exports.buttonOptionalIconSchemaProp = buttonOptionalIconSchemaProp;
exports.buttonRequiredIconSchemaProp = buttonRequiredIconSchemaProp;
