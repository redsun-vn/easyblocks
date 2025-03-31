'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components');
var RadixTooltip = require('@radix-ui/react-tooltip');
var React = require('react');
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

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var RadixTooltip__namespace = /*#__PURE__*/_interopNamespace(RadixTooltip);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function TooltipProvider(props) {
  return /*#__PURE__*/React__default["default"].createElement(RadixTooltip__namespace.Provider, null, props.children);
}
function Tooltip(props) {
  return /*#__PURE__*/React__default["default"].createElement(RadixTooltip__namespace.Root, null, props.children);
}
function TooltipTrigger(props) {
  return /*#__PURE__*/React__default["default"].createElement(RadixTooltip__namespace.Trigger, {
    asChild: true
  }, props.children);
}
function TooltipContent(props) {
  return /*#__PURE__*/React__default["default"].createElement(RadixTooltip__namespace.Portal, null, /*#__PURE__*/React__default["default"].createElement(_StyledRadixTooltipContent, {
    $_css: colors.Colors.black800,
    $_css2: colors.Colors.white
  }, /*#__PURE__*/React__default["default"].createElement(_StyledRadixTooltipArrow, {
    $_css3: colors.Colors.black800
  }), props.children));
}
var _StyledRadixTooltipContent = styled__default["default"](RadixTooltip__namespace.Content)`
          display: flex;
          padding: 6px 4px;
          justify-content: center;
          align-items: center;

          border-radius: 2px;
          background: ${p => p.$_css};

          color: ${p => p.$_css2};
        `;
var _StyledRadixTooltipArrow = styled__default["default"](RadixTooltip__namespace.Arrow).withConfig({
  displayName: "Tooltip___StyledRadixTooltipArrow",
  componentId: "sc-5s6xlu-0"
})(["fill:", ";"], p => p.$_css3);

exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
