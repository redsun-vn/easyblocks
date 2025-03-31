'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var styled = require('styled-components');
var colors = require('./colors.js');
var ControlContainer = require('./ControlContainer.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

/**
 * TODO: this toggle button doesn't make much sense from semantic perspective
 */

const StyledButton = styled__default["default"].button.withConfig({
  displayName: "ToggleButton__StyledButton",
  componentId: "sc-1mpua28-0"
})(["all:unset;box-sizing:border-box;width:100%;height:100%;outline:none;border:none;", " ", " border-radius:2px;background-color:", ";"], ControlContainer.getControlPadding(), p => p.hideLabel ? "padding-right: 0;" : "", p => p.selected ? colors.Colors.black10 : "transparent");
const ToggleButton = props => {
  const {
    onChange,
    ...restProps
  } = props;
  return /*#__PURE__*/React__default["default"].createElement(ControlContainer.ControlContainer, _extends__default["default"]({}, props, {
    iconBlack: true,
    iconOnly: props.hideLabel
  }), /*#__PURE__*/React__default["default"].createElement(StyledButton, _extends__default["default"]({}, restProps, {
    "aria-label": props.children,
    onClick: () => {
      props.onChange?.(!props.selected);
    }
  }), props.hideLabel ? null : props.children));
};
const SelectInlineRoot = styled__default["default"].div.withConfig({
  displayName: "ToggleButton__SelectInlineRoot",
  componentId: "sc-1mpua28-1"
})(["display:flex;flex-direction:row;gap:4px;flex-wrap:nowrap;"]);
const SelectInline = props => {
  const buttons = React__default["default"].Children.toArray(props.children);
  return /*#__PURE__*/React__default["default"].createElement(SelectInlineRoot, null, buttons.map(button => {
    return /*#__PURE__*/React__default["default"].cloneElement(button, {
      selected: button.props.value === props.value,
      onChange: () => {
        props.onChange(button.props.value);
      }
    });
  }));
};

exports.SelectInline = SelectInline;
exports.ToggleButton = ToggleButton;
