/* with love from shopstory */
function areWidthsFullyDefined(widths, devices) {
  var areWidthsFullyDefined = true;
  devices.forEach(function (device) {
    if (widths[device.id] === -1) {
      areWidthsFullyDefined = false;
    }
  });
  return areWidthsFullyDefined;
}

export { areWidthsFullyDefined };
