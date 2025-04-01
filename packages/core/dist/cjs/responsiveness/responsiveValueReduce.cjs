/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isTrulyResponsiveValue = require('./isTrulyResponsiveValue.cjs');

function responsiveValueReduce(resVal, reducer, initialValue, devices) {
  if (!isTrulyResponsiveValue.isTrulyResponsiveValue(resVal)) {
    return reducer(initialValue, resVal);
  }
  var result = initialValue;
  for (var i = 0; i < devices.length; i++) {
    var key = devices[i].id;
    if (resVal[key] === undefined) {
      continue;
    }
    result = reducer(result, resVal[key], key);
  }
  return result;
}

exports.responsiveValueReduce = responsiveValueReduce;
