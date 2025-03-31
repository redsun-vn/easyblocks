import _extends from '@babel/runtime/helpers/extends';
import React__default from 'react';
import styled from 'styled-components';
import { Colors } from './colors.js';
import { getControlPadding, ControlContainer } from './ControlContainer.js';

/**
 * TODO: this toggle button doesn't make much sense from semantic perspective
 */

const StyledButton = styled.button.withConfig({
  displayName: "ToggleButton__StyledButton",
  componentId: "sc-1mpua28-0"
})(["all:unset;box-sizing:border-box;width:100%;height:100%;outline:none;border:none;", " ", " border-radius:2px;background-color:", ";"], getControlPadding(), p => p.hideLabel ? "padding-right: 0;" : "", p => p.selected ? Colors.black10 : "transparent");
const ToggleButton = props => {
  const {
    onChange,
    ...restProps
  } = props;
  return /*#__PURE__*/React__default.createElement(ControlContainer, _extends({}, props, {
    iconBlack: true,
    iconOnly: props.hideLabel
  }), /*#__PURE__*/React__default.createElement(StyledButton, _extends({}, restProps, {
    "aria-label": props.children,
    onClick: () => {
      props.onChange?.(!props.selected);
    }
  }), props.hideLabel ? null : props.children));
};
const SelectInlineRoot = styled.div.withConfig({
  displayName: "ToggleButton__SelectInlineRoot",
  componentId: "sc-1mpua28-1"
})(["display:flex;flex-direction:row;gap:4px;flex-wrap:nowrap;"]);
const SelectInline = props => {
  const buttons = React__default.Children.toArray(props.children);
  return /*#__PURE__*/React__default.createElement(SelectInlineRoot, null, buttons.map(button => {
    return /*#__PURE__*/React__default.cloneElement(button, {
      selected: button.props.value === props.value,
      onChange: () => {
        props.onChange(button.props.value);
      }
    });
  }));
};

export { SelectInline, ToggleButton };
