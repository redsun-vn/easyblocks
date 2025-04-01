/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var isTrulyResponsiveValue = require('./isTrulyResponsiveValue.cjs');
var responsiveValueEntries = require('./responsiveValueEntries.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function responsiveValueMap(resVal, mapper) {
  if (!isTrulyResponsiveValue.isTrulyResponsiveValue(resVal)) {
    return mapper(resVal);
  }
  var ret = {
    $res: true
  };
  responsiveValueEntries.responsiveValueEntries(resVal).forEach(function (_ref) {
    var _ref2 = _slicedToArray__default["default"](_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    ret[key] = mapper(value, key);
  });
  return ret;
}

exports.responsiveValueMap = responsiveValueMap;
