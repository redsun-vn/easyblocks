/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var locales = require('../../../locales.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function buildText(x, editorContext) {
  var defaultLocale = locales.getDefaultLocale(editorContext.locales);
  return {
    id: "locale." + easyblocksUtils.uniqueId(),
    value: _defineProperty__default["default"]({}, defaultLocale.code, x)
  };
}

exports.buildText = buildText;
