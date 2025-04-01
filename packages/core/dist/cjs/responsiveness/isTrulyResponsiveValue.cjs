/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

// Sorry for this name
function isTrulyResponsiveValue(x) {
  return _typeof__default["default"](x) === "object" && x !== null && !Array.isArray(x) && x.$res === true;
}

exports.isTrulyResponsiveValue = isTrulyResponsiveValue;
