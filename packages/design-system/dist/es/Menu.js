import styled from 'styled-components';
import { Root, Trigger, Portal, Content, Item, Separator } from '@radix-ui/react-dropdown-menu';
import React__default from 'react';
import { Colors } from './colors.js';

function Menu(props) {
  return /*#__PURE__*/React__default.createElement(Root, null, props.children);
}
function MenuTrigger(props) {
  return /*#__PURE__*/React__default.createElement(Trigger, {
    asChild: true
  }, props.children);
}
function MenuContent(props) {
  return /*#__PURE__*/React__default.createElement(Portal, {
    container: props.container
  }, /*#__PURE__*/React__default.createElement(_StyledContent, {
    side: "bottom",
    align: "start",
    sideOffset: 4,
    $_css: Colors.black800
  }, props.children));
}
function MenuItem(props) {
  return /*#__PURE__*/React__default.createElement(_StyledItem, {
    onClick: props.onClick,
    disabled: props.isDisabled,
    $_css2: Colors.black700,
    $_css3: Colors.black700
  }, props.children);
}
function MenuSeparator() {
  return /*#__PURE__*/React__default.createElement(_StyledSeparator, {
    $_css4: Colors.black700
  });
}
var _StyledContent = styled(Content)`
          min-width: 200px;
          padding: 0 4px;
          background-color: ${p => p.$_css};
          border-radius: 4px;
        `;
var _StyledItem = styled(Item)`
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
var _StyledSeparator = styled(Separator).withConfig({
  displayName: "Menu___StyledSeparator",
  componentId: "sc-y402kg-0"
})(["height:1px;background-color:", ";"], p => p.$_css4);

export { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger };
