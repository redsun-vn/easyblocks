/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * This function is necessary because if we have Stitches styles object, its breakpoint values should be only on the top level.
 * We can have them nested so we need to transform styles object so that responsive styles goes to the top level.
 */

function flattenResponsiveStyles(styles) {
  var result = {};
  for (var key in styles) {
    var value = styles[key];
    if (key.startsWith("@")) {
      if (!result[key]) {
        result[key] = {};
      }
      result[key] = _objectSpread(_objectSpread({}, result[key]), value);
      continue;
    }
    if (_typeof__default["default"](value) === "object" && value !== null) {
      var flattenedValue = flattenResponsiveStyles(value);

      // MERGE

      var nonResponsiveValues = {};
      var responsiveValues = {};
      for (var key2 in flattenedValue) {
        var value2 = flattenedValue[key2];
        if (key2.startsWith("@")) {
          responsiveValues[key2] = value2;
        } else {
          nonResponsiveValues[key2] = value2;
        }
      }
      result[key] = nonResponsiveValues;
      for (var breakpoint in responsiveValues) {
        if (!result[breakpoint]) {
          result[breakpoint] = {};
        }
        result[breakpoint] = _objectSpread(_objectSpread({}, result[breakpoint]), {}, _defineProperty__default["default"]({}, key, responsiveValues[breakpoint]));
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

exports.flattenResponsiveStyles = flattenResponsiveStyles;
