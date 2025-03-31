'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var styled = require('styled-components');
var colors = require('./colors.js');
var fonts = require('./fonts.js');
var Loader = require('./Loader.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const sharedCSS = p => styled.css(["", ";border:none;outline:none;height:", ";", " border-radius:6px;line-height:1;transition:all 0.1s;display:flex;flex-direction:row;gap:6px;justify-content:center;align-items:center;"], fonts.Fonts.body, p.height !== undefined ? p.height : p.variant === "large" ? "36px" : p.variant === "tiny" ? "24px" : "28px", p.hideLabel ? `
    width: ${p.variant === "large" ? "36px" : p.variant === "tiny" ? "24px" : "28px"};
  ` : `
    padding-left: ${p.isGhost ? p.noPadding ? "0px" : "6px" : "10px"};
    padding-right: ${p.isGhost ? p.noPadding ? "0px" : "6px" : "10px"};
  `);
const PrimaryButton = styled__default["default"].button.withConfig({
  displayName: "buttons__PrimaryButton",
  componentId: "sc-1b20me-0"
})(["", " background-color:", ";color:white;min-width:60px;", ""], p => sharedCSS(p), colors.Colors.blue50, p => p.disabled ? `
    opacity 0.7;
  ` : `
    &:hover {
      background-color: ${colors.Colors.blue60};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 2px ${colors.Colors.blue60};
    }
  
    &:active {
      background-color: ${colors.Colors.blue70};
    }
    
  `);
const DangerButton = styled__default["default"].button.withConfig({
  displayName: "buttons__DangerButton",
  componentId: "sc-1b20me-1"
})(["", " background-color:", ";color:white;min-width:60px;", ""], p => sharedCSS(p), colors.Colors.red, p => p.disabled ? `
    opacity 0.7;
  ` : `
    &:hover {
      opacity: 0.7
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 2px ${colors.Colors.blue60};
    }
  
    &:active {
      background-color: ${colors.Colors.blue70};
    }
    
  `);
const SecondaryButton = styled__default["default"].button.withConfig({
  displayName: "buttons__SecondaryButton",
  componentId: "sc-1b20me-2"
})(["", " background-color:", ";color:black;min-width:60px;", ""], p => sharedCSS(p), colors.Colors.black5, p => p.disabled ? `
    opacity 0.7;
  ` : `
      &:hover {
        background-color: ${colors.Colors.black10};
      }
    
      &:focus-visible {
        box-shadow: 0 0 0 2px ${colors.Colors.blue50};
      }
    
      &:active {
        background-color: ${colors.Colors.black40};
      }
    
  `);
const GhostButton = styled__default["default"].button.withConfig({
  displayName: "buttons__GhostButton",
  componentId: "sc-1b20me-3"
})(["", " background-color:transparent;color:black;border:1px solid transparent;border-radius:2px;&:hover{border-color:#e5e5e5;}&:focus-visible{box-shadow:0 0 0 2px ", ";}&:active{background-color:", ";}"], p => sharedCSS(p), colors.Colors.blue50, colors.Colors.black20);
const GhostColorButton = styled__default["default"].button.withConfig({
  displayName: "buttons__GhostColorButton",
  componentId: "sc-1b20me-4"
})(["", " background-color:transparent;color:", ";&:hover{background-color:", ";}&:focus-visible{box-shadow:0 0 0 2px ", ";}&:active{background-color:", ";}"], p => sharedCSS(p), colors.Colors.blue50, colors.Colors.blue10, colors.Colors.blue50, colors.Colors.black20);
const EnhancerContainer = styled__default["default"].div.withConfig({
  displayName: "buttons__EnhancerContainer",
  componentId: "sc-1b20me-5"
})(["position:relative;width:", ";height:", ";overflow:hidden;flex-shrink:0;"], p => p.variant === "large" ? "24px" : "16px", p => p.variant === "large" ? "24px" : "16px");
const Button = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    component,
    Button,
    ...props
  } = _ref;
  let enhancer = null;
  if (props.isLoading) {
    enhancer = /*#__PURE__*/React__default["default"].createElement(Loader.Loader, null);
  } else if (props.enhancer) {
    enhancer = /*#__PURE__*/React__default["default"].createElement(EnhancerContainer, {
      variant: props.variant
    }, props.enhancer);
  } else if (props.icon) {
    const Icon = props.icon;
    enhancer = /*#__PURE__*/React__default["default"].createElement(Icon, null);
  }
  return /*#__PURE__*/React__default["default"].createElement(Button, _extends__default["default"]({
    as: component
  }, props, {
    ref: ref
  }), enhancer, !props.hideLabel && props.children);
});
const ButtonPrimary = props => /*#__PURE__*/React__default["default"].createElement(Button, _extends__default["default"]({}, props, {
  Button: PrimaryButton
}));
const ButtonDanger = props => /*#__PURE__*/React__default["default"].createElement(Button, _extends__default["default"]({}, props, {
  Button: DangerButton
}));
const ButtonSecondary = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React__default["default"].createElement(Button, _extends__default["default"]({}, props, {
  Button: SecondaryButton,
  ref: ref
})));
const ButtonGhost = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React__default["default"].createElement(Button, _extends__default["default"]({}, props, {
  Button: GhostButton,
  isGhost: true,
  noPadding: props.noPadding,
  ref: ref
})));
const ButtonGhostColor = props => /*#__PURE__*/React__default["default"].createElement(Button, _extends__default["default"]({}, props, {
  Button: GhostColorButton,
  isGhost: true,
  noPadding: props.noPadding
}));
const IconButtonPrimaryStyled = styled__default["default"](Button).withConfig({
  displayName: "buttons__IconButtonPrimaryStyled",
  componentId: "sc-1b20me-6"
})(["min-width:0;border-radius:50%;"]);
const IconButtonPrimary = props => /*#__PURE__*/React__default["default"].createElement(IconButtonPrimaryStyled, _extends__default["default"]({}, props, {
  Button: PrimaryButton,
  hideLabel: true
}));

exports.ButtonDanger = ButtonDanger;
exports.ButtonGhost = ButtonGhost;
exports.ButtonGhostColor = ButtonGhostColor;
exports.ButtonPrimary = ButtonPrimary;
exports.ButtonSecondary = ButtonSecondary;
exports.IconButtonPrimary = IconButtonPrimary;
