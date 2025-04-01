/* with love from shopstory */
import { isTrulyResponsiveValue } from './isTrulyResponsiveValue.js';

function responsiveValueReduce(resVal, reducer, initialValue, devices) {
  if (!isTrulyResponsiveValue(resVal)) {
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

export { responsiveValueReduce };
