'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components');
var reactTabs = require('@radix-ui/react-tabs');
var React = require('react');
var colors = require('./colors.js');
var Typography = require('./Typography.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Tabs(props) {
  return /*#__PURE__*/React__default["default"].createElement(_StyledRoot, {
    value: props.value,
    onValueChange: value => props.onChange(value)
  }, props.children);
}
function TabList(props) {
  return /*#__PURE__*/React__default["default"].createElement(_StyledDiv, null, /*#__PURE__*/React__default["default"].createElement(_StyledList, null, props.children), props.action);
}
function Tab(props) {
  return /*#__PURE__*/React__default["default"].createElement(_StyledTypography, {
    component: reactTabs.Trigger,
    value: props.value,
    $_css: colors.Colors.black500
  }, props.children);
}
function TabPanel(props) {
  return /*#__PURE__*/React__default["default"].createElement(reactTabs.TabsContent, {
    value: props.value
  }, props.children);
}
var _StyledRoot = styled__default["default"](reactTabs.Root)`
        width: 100%;
      `;
var _StyledDiv = styled__default["default"]("div")`
        display: flex;
        width: 100%;
        justify-content: space-between;
      `;
var _StyledList = styled__default["default"](reactTabs.List)`
          display: flex;
          flex-wrap: nowrap;
          gap: 36px;
          min-height: 36px;
        `;
var _StyledTypography = styled__default["default"](Typography.Typography).withConfig({
  displayName: "Tabs___StyledTypography",
  componentId: "sc-p4rakk-0"
})(["padding:0;margin:0;border:0;background:transparent;@media (hover:hover){cursor:pointer;}&[data-state=\"active\"]{font-weight:bold;}&[data-state=\"inactive\"]{color:", ";}"], p => p.$_css);

exports.Tab = Tab;
exports.TabList = TabList;
exports.TabPanel = TabPanel;
exports.Tabs = Tabs;
