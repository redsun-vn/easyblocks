/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function areWidthsFullyDefined(widths, devices) {
  var areWidthsFullyDefined = true;
  devices.forEach(function (device) {
    if (widths[device.id] === -1) {
      areWidthsFullyDefined = false;
    }
  });
  return areWidthsFullyDefined;
}

exports.areWidthsFullyDefined = areWidthsFullyDefined;
