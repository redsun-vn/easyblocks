import _extends from '@babel/runtime/helpers/extends';
import React__default, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from './colors.js';
import { Fonts } from './fonts.js';
import { Loader } from './Loader.js';

const sharedCSS = p => css(["", ";border:none;outline:none;height:", ";", " border-radius:6px;line-height:1;transition:all 0.1s;display:flex;flex-direction:row;gap:6px;justify-content:center;align-items:center;"], Fonts.body, p.height !== undefined ? p.height : p.variant === "large" ? "36px" : p.variant === "tiny" ? "24px" : "28px", p.hideLabel ? `
    width: ${p.variant === "large" ? "36px" : p.variant === "tiny" ? "24px" : "28px"};
  ` : `
    padding-left: ${p.isGhost ? p.noPadding ? "0px" : "6px" : "10px"};
    padding-right: ${p.isGhost ? p.noPadding ? "0px" : "6px" : "10px"};
  `);
const PrimaryButton = styled.button.withConfig({
  displayName: "buttons__PrimaryButton",
  componentId: "sc-1b20me-0"
})(["", " background-color:", ";color:white;min-width:60px;", ""], p => sharedCSS(p), Colors.blue50, p => p.disabled ? `
    opacity 0.7;
  ` : `
    &:hover {
      background-color: ${Colors.blue60};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 2px ${Colors.blue60};
    }
  
    &:active {
      background-color: ${Colors.blue70};
    }
    
  `);
const DangerButton = styled.button.withConfig({
  displayName: "buttons__DangerButton",
  componentId: "sc-1b20me-1"
})(["", " background-color:", ";color:white;min-width:60px;", ""], p => sharedCSS(p), Colors.red, p => p.disabled ? `
    opacity 0.7;
  ` : `
    &:hover {
      opacity: 0.7
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 2px ${Colors.blue60};
    }
  
    &:active {
      background-color: ${Colors.blue70};
    }
    
  `);
const SecondaryButton = styled.button.withConfig({
  displayName: "buttons__SecondaryButton",
  componentId: "sc-1b20me-2"
})(["", " background-color:", ";color:black;min-width:60px;", ""], p => sharedCSS(p), Colors.black5, p => p.disabled ? `
    opacity 0.7;
  ` : `
      &:hover {
        background-color: ${Colors.black10};
      }
    
      &:focus-visible {
        box-shadow: 0 0 0 2px ${Colors.blue50};
      }
    
      &:active {
        background-color: ${Colors.black40};
      }
    
  `);
const GhostButton = styled.button.withConfig({
  displayName: "buttons__GhostButton",
  componentId: "sc-1b20me-3"
})(["", " background-color:transparent;color:black;border:1px solid transparent;border-radius:2px;&:hover{border-color:#e5e5e5;}&:focus-visible{box-shadow:0 0 0 2px ", ";}&:active{background-color:", ";}"], p => sharedCSS(p), Colors.blue50, Colors.black20);
const GhostColorButton = styled.button.withConfig({
  displayName: "buttons__GhostColorButton",
  componentId: "sc-1b20me-4"
})(["", " background-color:transparent;color:", ";&:hover{background-color:", ";}&:focus-visible{box-shadow:0 0 0 2px ", ";}&:active{background-color:", ";}"], p => sharedCSS(p), Colors.blue50, Colors.blue10, Colors.blue50, Colors.black20);
const EnhancerContainer = styled.div.withConfig({
  displayName: "buttons__EnhancerContainer",
  componentId: "sc-1b20me-5"
})(["position:relative;width:", ";height:", ";overflow:hidden;flex-shrink:0;"], p => p.variant === "large" ? "24px" : "16px", p => p.variant === "large" ? "24px" : "16px");
const Button = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    component,
    Button,
    ...props
  } = _ref;
  let enhancer = null;
  if (props.isLoading) {
    enhancer = /*#__PURE__*/React__default.createElement(Loader, null);
  } else if (props.enhancer) {
    enhancer = /*#__PURE__*/React__default.createElement(EnhancerContainer, {
      variant: props.variant
    }, props.enhancer);
  } else if (props.icon) {
    const Icon = props.icon;
    enhancer = /*#__PURE__*/React__default.createElement(Icon, null);
  }
  return /*#__PURE__*/React__default.createElement(Button, _extends({
    as: component
  }, props, {
    ref: ref
  }), enhancer, !props.hideLabel && props.children);
});
const ButtonPrimary = props => /*#__PURE__*/React__default.createElement(Button, _extends({}, props, {
  Button: PrimaryButton
}));
const ButtonDanger = props => /*#__PURE__*/React__default.createElement(Button, _extends({}, props, {
  Button: DangerButton
}));
const ButtonSecondary = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React__default.createElement(Button, _extends({}, props, {
  Button: SecondaryButton,
  ref: ref
})));
const ButtonGhost = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React__default.createElement(Button, _extends({}, props, {
  Button: GhostButton,
  isGhost: true,
  noPadding: props.noPadding,
  ref: ref
})));
const ButtonGhostColor = props => /*#__PURE__*/React__default.createElement(Button, _extends({}, props, {
  Button: GhostColorButton,
  isGhost: true,
  noPadding: props.noPadding
}));
const IconButtonPrimaryStyled = styled(Button).withConfig({
  displayName: "buttons__IconButtonPrimaryStyled",
  componentId: "sc-1b20me-6"
})(["min-width:0;border-radius:50%;"]);
const IconButtonPrimary = props => /*#__PURE__*/React__default.createElement(IconButtonPrimaryStyled, _extends({}, props, {
  Button: PrimaryButton,
  hideLabel: true
}));

export { ButtonDanger, ButtonGhost, ButtonGhostColor, ButtonPrimary, ButtonSecondary, IconButtonPrimary };
