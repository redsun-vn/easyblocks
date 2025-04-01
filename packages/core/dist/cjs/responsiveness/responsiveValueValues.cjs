/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function responsiveValueValues(value) {
  var values = [];
  easyblocksUtils.entries(value).forEach(function (_ref) {
    var _ref2 = _slicedToArray__default["default"](_ref, 2),
      key = _ref2[0],
      v = _ref2[1];
    if (key === "$res") return;
    values.push(v);
  });
  return values;
}

exports.responsiveValueValues = responsiveValueValues;
