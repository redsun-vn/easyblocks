/* with love from shopstory */
import { isTrulyResponsiveValue } from './isTrulyResponsiveValue.js';

function responsiveValueGet(value, deviceId) {
  if (isTrulyResponsiveValue(value)) {
    return value[deviceId];
  }
  return value;
}
function responsiveValueForceGet(value, deviceId) {
  if (isTrulyResponsiveValue(value)) {
    if (value[deviceId] === undefined) {
      var error = "You called responsiveValueForceGet with value ".concat(JSON.stringify(value), " and deviceId: ").concat(deviceId, ". Value undefined.");
      throw new Error(error);
    }
    return value[deviceId];
  }
  return value;
}

export { responsiveValueForceGet, responsiveValueGet };
