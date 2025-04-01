/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { isTrulyResponsiveValue } from './isTrulyResponsiveValue.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function responsiveValueSet(responsiveValue, deviceId, value, devices) {
  var trulyResponsive;
  if (isTrulyResponsiveValue(responsiveValue)) {
    trulyResponsive = _objectSpread({}, responsiveValue);
  } else {
    trulyResponsive = {
      $res: true
    };
    devices.forEach(function (device) {
      trulyResponsive[device.id] = responsiveValue;
    });
  }
  return _objectSpread(_objectSpread({}, trulyResponsive), {}, _defineProperty({}, deviceId, value));
}

export { responsiveValueSet };
