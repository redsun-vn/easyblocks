'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var styled = require('styled-components');
var React = require('react');
var RadixToggleGroup = require('@radix-ui/react-toggle-group');
var colors = require('../colors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var RadixToggleGroup__namespace = /*#__PURE__*/_interopNamespace(RadixToggleGroup);

function ToggleGroup(props) {
  return /*#__PURE__*/React__default["default"].createElement(_StyledRadixToggleGroupRoot, {
    type: "single",
    value: props.value,
    onValueChange: props.onChange
  }, props.children);
}
const ToggleGroupItem = /*#__PURE__*/React.forwardRef(function ToggleGroupItem(_ref, forwardedRef) {
  let {
    value,
    children,
    ...props
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(_StyledRadixToggleGroupItem, _extends__default["default"]({
    value: value,
    ref: forwardedRef
  }, props, {
    $_css: colors.Colors.black10,
    $_css2: colors.Colors.black10
  }), children);
});
var _StyledRadixToggleGroupRoot = styled__default["default"](RadixToggleGroup__namespace.Root)`
        display: flex;
        gap: 4px;
        flex-wrap: nowrap;
      `;
var _StyledRadixToggleGroupItem = styled__default["default"](RadixToggleGroup__namespace.Item).withConfig({
  displayName: "ToggleGroup___StyledRadixToggleGroupItem",
  componentId: "sc-1ceudxu-0"
})(["all:unset;box-sizing:border-box;height:28px;width:28px;display:flex;align-items:center;justify-content:center;background-color:transparent;&[aria-checked=\"true\"]{background-color:", ";}border-radius:2px;@media (hover:hover){cursor:pointer;&:hover{box-shadow:0 0 0 1px ", ";}}& svg{flex-shrink:0;}"], p => p.$_css, p => p.$_css2);

exports.ToggleGroup = ToggleGroup;
exports.ToggleGroupItem = ToggleGroupItem;
