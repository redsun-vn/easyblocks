/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

function isCompiledComponentConfig(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
arg) {
  return _typeof__default["default"](arg) === "object" && arg !== null && typeof arg._component === "string" && typeof arg._id === "string" && _typeof__default["default"](arg.actions) === "object" && _typeof__default["default"](arg.components) === "object";
}

exports.isCompiledComponentConfig = isCompiledComponentConfig;
