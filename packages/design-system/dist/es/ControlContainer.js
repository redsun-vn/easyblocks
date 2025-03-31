import _extends from '@babel/runtime/helpers/extends';
import React__default from 'react';
import styled, { css } from 'styled-components';
import { Colors } from './colors.js';
import { Fonts } from './fonts.js';

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
const Root = styled.div.withConfig({
  displayName: "ControlContainer__Root",
  componentId: "sc-1i70r11-0"
})(["position:relative;height:", ";width:", ";color:black;", " &:focus-within{box-shadow:0 0 0 2px ", ";.ss-arrow{color:black;}}transition:box-shadow 0.1s;border-radius:2px;display:inline-block;", ";"], p => sizing(p).height, p => sizing(p).width, p => {
  const outlineStyles = `
      box-shadow: 0 0 0 1px ${p.hasError ? "red" : Colors.black10};
      .ss-arrow {
        color: black;
      }
    `;
  if (p.withBorder) {
    if (p.disabled) {
      return `
          ${outlineStyles}
          color: ${Colors.black40};
        `;
    } else {
      return `
          ${outlineStyles}
        `;
    }
  } else {
    if (p.disabled) {
      return `
          color: ${Colors.black40};
        `;
    } else {
      return `
          &:hover {
             ${outlineStyles}
          }
        `;
    }
  }
}, p => p.hasError ? Colors.red : Colors.focus, Fonts.body);
const IconContainer = styled.div.withConfig({
  displayName: "ControlContainer__IconContainer",
  componentId: "sc-1i70r11-1"
})(["color:", ";position:absolute;left:", ";top:", ";pointer-events:none;"], p => p.iconBlack ? "black" : Colors.black40, p => sizing(p).paddingHorizontal, p => sizing(p).paddingVertical);
const ControlContainer = _ref => {
  let {
    className,
    ...props
  } = _ref;
  const Icon = props.icon;
  return /*#__PURE__*/React__default.createElement(Root, _extends({
    className: className
  }, props), Icon && /*#__PURE__*/React__default.createElement(IconContainer, props, /*#__PURE__*/React__default.createElement(Icon, null)), props.children);
};
function getControlPadding() {
  return css(["padding-left:", ";padding-right:", ";"], p => sizing(p).paddingIcon, p => sizing(p).paddingHorizontal);
}

export { ControlContainer, getControlPadding };
