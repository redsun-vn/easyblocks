/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isTrulyResponsiveValue = require('./isTrulyResponsiveValue.cjs');

function responsiveValueGet(value, deviceId) {
  if (isTrulyResponsiveValue.isTrulyResponsiveValue(value)) {
    return value[deviceId];
  }
  return value;
}
function responsiveValueForceGet(value, deviceId) {
  if (isTrulyResponsiveValue.isTrulyResponsiveValue(value)) {
    if (value[deviceId] === undefined) {
      var error = "You called responsiveValueForceGet with value ".concat(JSON.stringify(value), " and deviceId: ").concat(deviceId, ". Value undefined.");
      throw new Error(error);
    }
    return value[deviceId];
  }
  return value;
}

exports.responsiveValueForceGet = responsiveValueForceGet;
exports.responsiveValueGet = responsiveValueGet;
