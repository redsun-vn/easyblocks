'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components');
var reactDropdownMenu = require('@radix-ui/react-dropdown-menu');
var React = require('react');
var colors = require('./colors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Menu(props) {
  return /*#__PURE__*/React__default["default"].createElement(reactDropdownMenu.Root, null, props.children);
}
function MenuTrigger(props) {
  return /*#__PURE__*/React__default["default"].createElement(reactDropdownMenu.Trigger, {
    asChild: true
  }, props.children);
}
function MenuContent(props) {
  return /*#__PURE__*/React__default["default"].createElement(reactDropdownMenu.Portal, {
    container: props.container
  }, /*#__PURE__*/React__default["default"].createElement(_StyledContent, {
    side: "bottom",
    align: "start",
    sideOffset: 4,
    $_css: colors.Colors.black800
  }, props.children));
}
function MenuItem(props) {
  return /*#__PURE__*/React__default["default"].createElement(_StyledItem, {
    onClick: props.onClick,
    disabled: props.isDisabled,
    $_css2: colors.Colors.black700,
    $_css3: colors.Colors.black700
  }, props.children);
}
function MenuSeparator() {
  return /*#__PURE__*/React__default["default"].createElement(_StyledSeparator, {
    $_css4: colors.Colors.black700
  });
}
var _StyledContent = styled__default["default"](reactDropdownMenu.Content)`
          min-width: 200px;
          padding: 0 4px;
          background-color: ${p => p.$_css};
          border-radius: 4px;
        `;
var _StyledItem = styled__default["default"](reactDropdownMenu.Item)`
        padding: 10px 8px;

        &:focus {
          background-color: ${p => p.$_css2};
        }

        @media (hover: hover) {
          &:hover:not([aria-disabled="true"])]) {
            cursor: pointer;
            background-color: ${p => p.$_css3};
          }
        }
      `;
var _StyledSeparator = styled__default["default"](reactDropdownMenu.Separator).withConfig({
  displayName: "Menu___StyledSeparator",
  componentId: "sc-15igjrv-0"
})(["height:1px;background-color:", ";"], p => p.$_css4);

exports.Menu = Menu;
exports.MenuContent = MenuContent;
exports.MenuItem = MenuItem;
exports.MenuSeparator = MenuSeparator;
exports.MenuTrigger = MenuTrigger;
