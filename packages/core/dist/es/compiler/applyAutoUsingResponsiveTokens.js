/* with love from shopstory */
import { isTrulyResponsiveValue } from '../responsiveness/isTrulyResponsiveValue.js';
import { responsiveValueGetHighestDefinedDevice } from '../responsiveness/responsiveValueGetHighestDefinedDevice.js';
import { responsiveValueForceGet, responsiveValueGet } from '../responsiveness/responsiveValueGet.js';

function applyAutoUsingResponsiveTokens(input, compilationContext) {
  if (!isTrulyResponsiveValue(input)) {
    return input;
  }
  var highestDefinedDevice = responsiveValueGetHighestDefinedDevice(input, compilationContext.devices);
  var highestDefinedValue = responsiveValueForceGet(input, highestDefinedDevice.id);
  var inputAfterAuto = {
    $res: true
  };
  for (var i = compilationContext.devices.length - 1; i >= 0; i--) {
    var device = compilationContext.devices[i];
    var value = responsiveValueGet(input, device.id);
    if (value === undefined && isTrulyResponsiveValue(highestDefinedValue.value)) {
      inputAfterAuto[device.id] = highestDefinedValue;
    }
    if (value !== undefined) {
      inputAfterAuto[device.id] = value;
      highestDefinedValue = input[device.id];
    }
  }
  return inputAfterAuto;
}

export { applyAutoUsingResponsiveTokens };
