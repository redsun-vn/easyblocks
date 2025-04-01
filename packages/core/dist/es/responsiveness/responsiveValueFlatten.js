/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { getDevicesWidths } from '../compiler/devices.js';
import { isTrulyResponsiveValue } from './isTrulyResponsiveValue.js';
import { responsiveValueGetDefinedValue } from './responsiveValueGetDefinedValue.js';
import { responsiveValueGetHighestDefinedDevice } from './responsiveValueGetHighestDefinedDevice.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

// Flattens recursively (max 2 levels)
function responsiveValueFlatten(resVal, devices) {
  if (!isTrulyResponsiveValue(resVal)) {
    return resVal;
  }
  var result = {
    $res: true
  };
  var activeNestedValue = undefined;

  // resValCopy has maximum breakpoint always set correctly, otherwise if we have b1, ..., b5 and responsive value is set to b4, then values ABOVE b4 won't be set.
  var resValCopy = _objectSpread({}, resVal);
  var maxDeviceInValue = responsiveValueGetHighestDefinedDevice(resValCopy, devices);
  var maxBreakpoint = devices[devices.length - 1].id;

  // Important condition. Sometimes if b5 is missing, b3 can be responsive and have b5 inside. Then b5 is defined.
  if (!resValCopy[maxBreakpoint] && isTrulyResponsiveValue(resValCopy[maxDeviceInValue.id])) {
    activeNestedValue = resValCopy[maxDeviceInValue.id];
  }
  for (var i = devices.length - 1; i >= 0; i--) {
    var breakpoint = devices[i].id;
    var value = resValCopy[breakpoint];
    if (value === undefined) {
      // If active nested value, we take from nested value;
      if (activeNestedValue !== undefined && activeNestedValue[breakpoint] !== undefined) {
        result[breakpoint] = responsiveValueGetDefinedValue(activeNestedValue, breakpoint, devices, getDevicesWidths(devices) /** FOR NOW TOKENS ARE ALWAYS RELATIVE TO SCREEN WIDTH */);
      }
      continue;
    } else if (!isTrulyResponsiveValue(value)) {
      activeNestedValue = undefined;
      result[breakpoint] = value;
    } else {
      activeNestedValue = value;
      result[breakpoint] = responsiveValueGetDefinedValue(activeNestedValue, breakpoint, devices, getDevicesWidths(devices) /** FOR NOW TOKENS ARE ALWAYS RELATIVE TO SCREEN WIDTH */);
    }
  }
  return result;
}

export { responsiveValueFlatten };
