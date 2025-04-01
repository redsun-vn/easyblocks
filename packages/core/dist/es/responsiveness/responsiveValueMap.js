/* with love from shopstory */
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { isTrulyResponsiveValue } from './isTrulyResponsiveValue.js';
import { responsiveValueEntries } from './responsiveValueEntries.js';

function responsiveValueMap(resVal, mapper) {
  if (!isTrulyResponsiveValue(resVal)) {
    return mapper(resVal);
  }
  var ret = {
    $res: true
  };
  responsiveValueEntries(resVal).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    ret[key] = mapper(value, key);
  });
  return ret;
}

export { responsiveValueMap };
