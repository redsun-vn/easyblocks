'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.cjs');

function deepCompare() {
  for (var index = 0; index < arguments.length - 1; index++) {
    var currentObject = sortObject(index < 0 || arguments.length <= index ? undefined : arguments[index]);
    var nextObject = sortObject(index + 1 < 0 || arguments.length <= index + 1 ? undefined : arguments[index + 1]);
    var areObjectsHashesEqual = JSON.stringify(currentObject) === JSON.stringify(nextObject);
    if (!areObjectsHashesEqual) {
      return false;
    }
  }
  return true;
}
function sortObject(value) {
  if (_rollupPluginBabelHelpers["typeof"](value) !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return _rollupPluginBabelHelpers.toConsumableArray(value).sort();
  }
  if (value === null) {
    return null;
  }
  var sortedObject = {};
  var objectKeys = Object.keys(value).sort();
  objectKeys.forEach(function (key) {
    sortedObject[key] = sortObject(value[key]);
  });
  return sortedObject;
}

exports.deepCompare = deepCompare;
exports.sortObject = sortObject;
