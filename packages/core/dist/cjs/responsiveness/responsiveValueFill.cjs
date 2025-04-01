/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var getDeviceWidthPairs = require('../compiler/getDeviceWidthPairs.cjs');
var isTrulyResponsiveValue = require('./isTrulyResponsiveValue.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function responsiveValueFill(value, devices, widths) {
  if (!isTrulyResponsiveValue.isTrulyResponsiveValue(value)) {
    return value;
  }
  var componentWidths = getDeviceWidthPairs.getDeviceWidthPairs(widths, devices);
  var result = _objectSpread({}, value);
  componentWidths.forEach(function (_ref, index) {
    _ref.width;
      var deviceId = _ref.deviceId;
    if (result[deviceId] === undefined) {
      // Let's look for a value up
      for (var i = index + 1; i < componentWidths.length; i++) {
        var valueForHigherWidth = result[componentWidths[i].deviceId];
        if (valueForHigherWidth !== undefined) {
          result[deviceId] = valueForHigherWidth;
          break;
        }
      }

      // If still undefined, let's look for a value down
      if (result[deviceId] === undefined) {
        for (var _i = index - 1; _i >= 0; _i--) {
          var valueForLowerWidth = result[componentWidths[_i].deviceId];
          if (valueForLowerWidth !== undefined) {
            result[deviceId] = valueForLowerWidth;
            break;
          }
        }
      }
      if (result[deviceId] === undefined) {
        throw new Error("Can't fill");
      }
    }
  });
  return result;
}

exports.responsiveValueFill = responsiveValueFill;
