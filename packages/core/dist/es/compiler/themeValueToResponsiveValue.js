/* with love from shopstory */
import { isTrulyResponsiveValue } from '../responsiveness/isTrulyResponsiveValue.js';

function themeScalarValueToResponsiveValue(input, devices) {
  if (!isTrulyResponsiveValue(input)) {
    return input;
  }
  var output = {
    $res: true
  };
  devices.forEach(function (device) {
    var val = input[device.id];
    if (val !== undefined) {
      output[device.id] = val;
    }
  });
  return output;
}

export { themeScalarValueToResponsiveValue };
