import _extends from '@babel/runtime/helpers/extends';
import styled from 'styled-components';
import React__default, { forwardRef } from 'react';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { Colors } from '../colors.js';

function ToggleGroup(props) {
  return /*#__PURE__*/React__default.createElement(_StyledRadixToggleGroupRoot, {
    type: "single",
    value: props.value,
    onValueChange: props.onChange
  }, props.children);
}
const ToggleGroupItem = /*#__PURE__*/forwardRef(function ToggleGroupItem(_ref, forwardedRef) {
  let {
    value,
    children,
    ...props
  } = _ref;
  return /*#__PURE__*/React__default.createElement(_StyledRadixToggleGroupItem, _extends({
    value: value,
    ref: forwardedRef
  }, props, {
    $_css: Colors.black10,
    $_css2: Colors.black10
  }), children);
});
var _StyledRadixToggleGroupRoot = styled(RadixToggleGroup.Root)`
        display: flex;
        gap: 4px;
        flex-wrap: nowrap;
      `;
var _StyledRadixToggleGroupItem = styled(RadixToggleGroup.Item).withConfig({
  displayName: "ToggleGroup___StyledRadixToggleGroupItem",
  componentId: "sc-1tf1h8d-0"
})(["all:unset;box-sizing:border-box;height:28px;width:28px;display:flex;align-items:center;justify-content:center;background-color:transparent;&[aria-checked=\"true\"]{background-color:", ";}border-radius:2px;@media (hover:hover){cursor:pointer;&:hover{box-shadow:0 0 0 1px ", ";}}& svg{flex-shrink:0;}"], p => p.$_css, p => p.$_css2);

export { ToggleGroup, ToggleGroupItem };
