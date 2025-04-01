/* with love from shopstory */
function responsiveValueGetHighestDefinedDevice(input, devices) {
  var highestDefinedDevice;
  for (var i = devices.length - 1; i >= 0; i--) {
    var device = devices[i];
    if (input[device.id] !== undefined) {
      highestDefinedDevice = device;
      break;
    }
  }
  if (highestDefinedDevice === undefined) {
    throw new Error("highest defined value doesn't exist");
  }
  return highestDefinedDevice;
}

export { responsiveValueGetHighestDefinedDevice };
