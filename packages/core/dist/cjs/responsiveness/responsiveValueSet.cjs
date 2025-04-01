/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var isTrulyResponsiveValue = require('./isTrulyResponsiveValue.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function responsiveValueSet(responsiveValue, deviceId, value, devices) {
  var trulyResponsive;
  if (isTrulyResponsiveValue.isTrulyResponsiveValue(responsiveValue)) {
    trulyResponsive = _objectSpread({}, responsiveValue);
  } else {
    trulyResponsive = {
      $res: true
    };
    devices.forEach(function (device) {
      trulyResponsive[device.id] = responsiveValue;
    });
  }
  return _objectSpread(_objectSpread({}, trulyResponsive), {}, _defineProperty__default["default"]({}, deviceId, value));
}

exports.responsiveValueSet = responsiveValueSet;
