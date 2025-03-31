'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');
var fonts = require('./fonts.js');
var colors = require('./colors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const Root = styled__default["default"].div.withConfig({
  displayName: "FormElement__Root",
  componentId: "sc-11sxp3-0"
})(["position:relative;"]);
const Layout = styled__default["default"].div.withConfig({
  displayName: "FormElement__Layout",
  componentId: "sc-11sxp3-1"
})(["position:relative;display:flex;flex-direction:row;gap:8px;align-items:center;"]);
const Label = styled__default["default"].label.withConfig({
  displayName: "FormElement__Label",
  componentId: "sc-11sxp3-2"
})(["", " color:black;flex:0 0 120px;min-width:0;"], fonts.Fonts.body);
const ControlWrapper = styled__default["default"].div.withConfig({
  displayName: "FormElement__ControlWrapper",
  componentId: "sc-11sxp3-3"
})(["flex:1 1 auto;min-width:0;display:grid;"]);
const ErrorWrapper = styled__default["default"].div.withConfig({
  displayName: "FormElement__ErrorWrapper",
  componentId: "sc-11sxp3-4"
})(["margin-top:6px;", " color:", ";"], fonts.Fonts.body, colors.Colors.red);
const FormElement = props => {
  return /*#__PURE__*/React__default["default"].createElement(Root, null, /*#__PURE__*/React__default["default"].createElement(Layout, null, /*#__PURE__*/React__default["default"].createElement(Label, {
    htmlFor: props.name
  }, props.label), /*#__PURE__*/React__default["default"].createElement(ControlWrapper, null, /*#__PURE__*/React__default["default"].cloneElement(props.children, {
    name: props.name,
    hasError: !!props.error
  }))), props.error && /*#__PURE__*/React__default["default"].createElement(Layout, null, /*#__PURE__*/React__default["default"].createElement(Label, {
    as: "div"
  }), /*#__PURE__*/React__default["default"].createElement(ErrorWrapper, null, props.error)));
};

exports.FormElement = FormElement;
