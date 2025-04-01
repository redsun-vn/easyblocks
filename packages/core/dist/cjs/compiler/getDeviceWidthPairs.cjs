/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var responsiveValueGet = require('../responsiveness/responsiveValueGet.cjs');

function getDeviceWidthPairs(widths, devices) {
  var componentWidths = [];
  for (var key in widths) {
    if (key === "$res") {
      continue;
    }
    componentWidths.push({
      width: responsiveValueGet.responsiveValueForceGet(widths, key),
      deviceId: key
    });
  }
  componentWidths.sort(function (x, y) {
    if (x.width === y.width) {
      var xDevicesIndex = devices.findIndex(function (d) {
        return d.id === x.deviceId;
      });
      var yDevicesIndex = devices.findIndex(function (d) {
        return d.id === y.deviceId;
      });
      return xDevicesIndex > yDevicesIndex ? 1 : -1;
    }
    return x.width === y.width ? 0 : x.width > y.width ? 1 : -1;
  });
  return componentWidths;
}
function getDeviceWidthPairsFromDevices(devices) {
  return devices.map(function (d) {
    return {
      width: d.w,
      deviceId: d.id
    };
  });
}

exports.getDeviceWidthPairs = getDeviceWidthPairs;
exports.getDeviceWidthPairsFromDevices = getDeviceWidthPairsFromDevices;
