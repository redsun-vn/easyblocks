'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components');
var colors = require('./colors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const DEFAULT_SIZE = 6;
const CustomComponentSymbol = styled__default["default"].div.withConfig({
  displayName: "CustomComponentSymbol",
  componentId: "sc-1b4wdw-0"
})(["width:", "px;height:", "px;background:", ";transform:rotate(45deg);"], p => p.size ?? DEFAULT_SIZE, p => p.size ?? DEFAULT_SIZE, colors.Colors.purple);

exports.CustomComponentSymbol = CustomComponentSymbol;
