/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getDeviceWidthPairs = require('../compiler/getDeviceWidthPairs.cjs');

function responsiveValueFindHigherDeviceWithDefinedValue(value, breakpoint, devices, widths) {
  var componentWidths = widths ? getDeviceWidthPairs.getDeviceWidthPairs(widths, devices) : getDeviceWidthPairs.getDeviceWidthPairsFromDevices(devices);
  var componentWidthIndex = componentWidths.findIndex(function (x) {
    return x.deviceId === breakpoint;
  });
  var componentWidth = devices[componentWidthIndex];
  if (!componentWidth) {
    throw new Error("undefined breakpoint");
  }

  //
  // if (device.breakpoint === null) {
  //   return;
  // }
  var _loop = function _loop() {
      var deviceId = componentWidths[i].deviceId;
      if (value[deviceId] !== undefined) {
        return {
          v: devices.find(function (d) {
            return d.id === deviceId;
          })
        };
      }
    },
    _ret;
  for (var i = componentWidthIndex + 1; i <= componentWidths.length - 1; i++) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
  return undefined;
}
function responsiveValueFindLowerDeviceWithDefinedValue(value, breakpoint, devices, widths) {
  var componentWidths = widths ? getDeviceWidthPairs.getDeviceWidthPairs(widths, devices) : getDeviceWidthPairs.getDeviceWidthPairsFromDevices(devices);
  var componentWidthIndex = componentWidths.findIndex(function (x) {
    return x.deviceId === breakpoint;
  });
  var componentWidth = devices[componentWidthIndex];
  if (!componentWidth) {
    throw new Error("undefined breakpoint");
  }
  var _loop2 = function _loop2() {
      var deviceId = componentWidths[i].deviceId;
      if (value[deviceId] !== undefined) {
        return {
          v: devices.find(function (d) {
            return d.id === deviceId;
          })
        };
      }
    },
    _ret2;
  for (var i = componentWidthIndex - 1; i >= 0; i--) {
    _ret2 = _loop2();
    if (_ret2) return _ret2.v;
  }
  return undefined;
}
function responsiveValueFindDeviceWithDefinedValue(value, breakpoint, devices, widths) {
  if (value[breakpoint] !== undefined) {
    return devices.find(function (x) {
      return x.id === breakpoint;
    });
  }
  var higherDevice = responsiveValueFindHigherDeviceWithDefinedValue(value, breakpoint, devices, widths);
  if (higherDevice !== undefined) {
    return higherDevice;
  }
  var lowerDevice = responsiveValueFindLowerDeviceWithDefinedValue(value, breakpoint, devices, widths);
  if (lowerDevice !== undefined) {
    return lowerDevice;
  }
  return undefined;
}

exports.responsiveValueFindDeviceWithDefinedValue = responsiveValueFindDeviceWithDefinedValue;
exports.responsiveValueFindHigherDeviceWithDefinedValue = responsiveValueFindHigherDeviceWithDefinedValue;
exports.responsiveValueFindLowerDeviceWithDefinedValue = responsiveValueFindLowerDeviceWithDefinedValue;
