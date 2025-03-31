'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var styled = require('styled-components');
var colors = require('./colors.js');
var fonts = require('./fonts.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

function sizing(p) {
  const height = p.controlSize === "tiny" ? 24 : 28;
  const paddingHorizontal = p.controlSize === "tiny" ? 4 : 6;
  let paddingIcon = paddingHorizontal + (p.icon ? 20 : 0);
  if (p.iconOnly) {
    paddingIcon = 0;
  }
  return {
    height: height + "px",
    width: p.controlSize === "full-width" ? "100%" : p.iconOnly ? height + "px" : "auto",
    paddingHorizontal: paddingHorizontal + "px",
    paddingVertical: p.controlSize === "tiny" ? "4px" : "6px",
    paddingIcon: paddingIcon + "px"
  };
}
const Root = styled__default["default"].div.withConfig({
  displayName: "ControlContainer__Root",
  componentId: "sc-1i70r11-0"
})(["position:relative;height:", ";width:", ";color:black;", " &:focus-within{box-shadow:0 0 0 2px ", ";.ss-arrow{color:black;}}transition:box-shadow 0.1s;border-radius:2px;display:inline-block;", ";"], p => sizing(p).height, p => sizing(p).width, p => {
  const outlineStyles = `
      box-shadow: 0 0 0 1px ${p.hasError ? "red" : colors.Colors.black10};
      .ss-arrow {
        color: black;
      }
    `;
  if (p.withBorder) {
    if (p.disabled) {
      return `
          ${outlineStyles}
          color: ${colors.Colors.black40};
        `;
    } else {
      return `
          ${outlineStyles}
        `;
    }
  } else {
    if (p.disabled) {
      return `
          color: ${colors.Colors.black40};
        `;
    } else {
      return `
          &:hover {
             ${outlineStyles}
          }
        `;
    }
  }
}, p => p.hasError ? colors.Colors.red : colors.Colors.focus, fonts.Fonts.body);
const IconContainer = styled__default["default"].div.withConfig({
  displayName: "ControlContainer__IconContainer",
  componentId: "sc-1i70r11-1"
})(["color:", ";position:absolute;left:", ";top:", ";pointer-events:none;"], p => p.iconBlack ? "black" : colors.Colors.black40, p => sizing(p).paddingHorizontal, p => sizing(p).paddingVertical);
const ControlContainer = _ref => {
  let {
    className,
    ...props
  } = _ref;
  const Icon = props.icon;
  return /*#__PURE__*/React__default["default"].createElement(Root, _extends__default["default"]({
    className: className
  }, props), Icon && /*#__PURE__*/React__default["default"].createElement(IconContainer, props, /*#__PURE__*/React__default["default"].createElement(Icon, null)), props.children);
};
function getControlPadding() {
  return styled.css(["padding-left:", ";padding-right:", ";"], p => sizing(p).paddingIcon, p => sizing(p).paddingHorizontal);
}

exports.ControlContainer = ControlContainer;
exports.getControlPadding = getControlPadding;
