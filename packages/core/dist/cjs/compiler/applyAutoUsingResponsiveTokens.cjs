/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isTrulyResponsiveValue = require('../responsiveness/isTrulyResponsiveValue.cjs');
var responsiveValueGetHighestDefinedDevice = require('../responsiveness/responsiveValueGetHighestDefinedDevice.cjs');
var responsiveValueGet = require('../responsiveness/responsiveValueGet.cjs');

function applyAutoUsingResponsiveTokens(input, compilationContext) {
  if (!isTrulyResponsiveValue.isTrulyResponsiveValue(input)) {
    return input;
  }
  var highestDefinedDevice = responsiveValueGetHighestDefinedDevice.responsiveValueGetHighestDefinedDevice(input, compilationContext.devices);
  var highestDefinedValue = responsiveValueGet.responsiveValueForceGet(input, highestDefinedDevice.id);
  var inputAfterAuto = {
    $res: true
  };
  for (var i = compilationContext.devices.length - 1; i >= 0; i--) {
    var device = compilationContext.devices[i];
    var value = responsiveValueGet.responsiveValueGet(input, device.id);
    if (value === undefined && isTrulyResponsiveValue.isTrulyResponsiveValue(highestDefinedValue.value)) {
      inputAfterAuto[device.id] = highestDefinedValue;
    }
    if (value !== undefined) {
      inputAfterAuto[device.id] = value;
      highestDefinedValue = input[device.id];
    }
  }
  return inputAfterAuto;
}

exports.applyAutoUsingResponsiveTokens = applyAutoUsingResponsiveTokens;
