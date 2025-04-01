/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { getDeviceWidthPairs } from '../compiler/getDeviceWidthPairs.js';
import { isTrulyResponsiveValue } from './isTrulyResponsiveValue.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function responsiveValueFill(value, devices, widths) {
  if (!isTrulyResponsiveValue(value)) {
    return value;
  }
  var componentWidths = getDeviceWidthPairs(widths, devices);
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

export { responsiveValueFill };
