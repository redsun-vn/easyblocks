/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var devices = require('../compiler/devices.cjs');
var isTrulyResponsiveValue = require('./isTrulyResponsiveValue.cjs');
var responsiveValueGetDefinedValue = require('./responsiveValueGetDefinedValue.cjs');
var responsiveValueGetHighestDefinedDevice = require('./responsiveValueGetHighestDefinedDevice.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

// Flattens recursively (max 2 levels)
function responsiveValueFlatten(resVal, devices$1) {
  if (!isTrulyResponsiveValue.isTrulyResponsiveValue(resVal)) {
    return resVal;
  }
  var result = {
    $res: true
  };
  var activeNestedValue = undefined;

  // resValCopy has maximum breakpoint always set correctly, otherwise if we have b1, ..., b5 and responsive value is set to b4, then values ABOVE b4 won't be set.
  var resValCopy = _objectSpread({}, resVal);
  var maxDeviceInValue = responsiveValueGetHighestDefinedDevice.responsiveValueGetHighestDefinedDevice(resValCopy, devices$1);
  var maxBreakpoint = devices$1[devices$1.length - 1].id;

  // Important condition. Sometimes if b5 is missing, b3 can be responsive and have b5 inside. Then b5 is defined.
  if (!resValCopy[maxBreakpoint] && isTrulyResponsiveValue.isTrulyResponsiveValue(resValCopy[maxDeviceInValue.id])) {
    activeNestedValue = resValCopy[maxDeviceInValue.id];
  }
  for (var i = devices$1.length - 1; i >= 0; i--) {
    var breakpoint = devices$1[i].id;
    var value = resValCopy[breakpoint];
    if (value === undefined) {
      // If active nested value, we take from nested value;
      if (activeNestedValue !== undefined && activeNestedValue[breakpoint] !== undefined) {
        result[breakpoint] = responsiveValueGetDefinedValue.responsiveValueGetDefinedValue(activeNestedValue, breakpoint, devices$1, devices.getDevicesWidths(devices$1) /** FOR NOW TOKENS ARE ALWAYS RELATIVE TO SCREEN WIDTH */);
      }
      continue;
    } else if (!isTrulyResponsiveValue.isTrulyResponsiveValue(value)) {
      activeNestedValue = undefined;
      result[breakpoint] = value;
    } else {
      activeNestedValue = value;
      result[breakpoint] = responsiveValueGetDefinedValue.responsiveValueGetDefinedValue(activeNestedValue, breakpoint, devices$1, devices.getDevicesWidths(devices$1) /** FOR NOW TOKENS ARE ALWAYS RELATIVE TO SCREEN WIDTH */);
    }
  }
  return result;
}

exports.responsiveValueFlatten = responsiveValueFlatten;
