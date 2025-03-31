'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var styled = require('styled-components');
var fonts = require('./fonts.js');
var ControlContainer = require('./ControlContainer.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const StyledInput = styled__default["default"].input.withConfig({
  displayName: "Input__StyledInput",
  componentId: "sc-1nyhv3t-0"
})(["all:unset;box-sizing:border-box;width:100%;height:100%;outline:none;border:none;::-webkit-search-decoration,::-webkit-search-cancel-button,::-webkit-search-results-button,::-webkit-search-results-decoration{display:none;}", " ", ";text-align:", ";"], p => !p.isRaw && ControlContainer.getControlPadding(), fonts.Fonts.body, p => p.align === "right" ? "right" : "left");
const InputBase = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React__default["default"].createElement(StyledInput, _extends__default["default"]({}, props, {
    ref: ref
  }));
});
const Input = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    iconBlack,
    controlSize,
    iconOnly,
    onBlur,
    value,
    ...inputProps
  } = props;
  return /*#__PURE__*/React__default["default"].createElement(ControlContainer.ControlContainer, _extends__default["default"]({
    iconBlack: iconBlack,
    controlSize: controlSize,
    iconOnly: iconOnly
  }, inputProps), /*#__PURE__*/React__default["default"].createElement(InputBase, _extends__default["default"]({}, inputProps, {
    value: value,
    onBlur: onBlur,
    ref: ref
  })));
});
const InputRaw = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React__default["default"].createElement(InputBase, _extends__default["default"]({}, props, {
    ref: ref,
    isRaw: true
  }));
});

exports.Input = Input;
exports.InputRaw = InputRaw;
