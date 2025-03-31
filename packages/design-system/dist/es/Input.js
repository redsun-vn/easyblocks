import _extends from '@babel/runtime/helpers/extends';
import React__default, { forwardRef } from 'react';
import styled from 'styled-components';
import { Fonts } from './fonts.js';
import { getControlPadding, ControlContainer } from './ControlContainer.js';

const StyledInput = styled.input.withConfig({
  displayName: "Input__StyledInput",
  componentId: "sc-1nyhv3t-0"
})(["all:unset;box-sizing:border-box;width:100%;height:100%;outline:none;border:none;::-webkit-search-decoration,::-webkit-search-cancel-button,::-webkit-search-results-button,::-webkit-search-results-decoration{display:none;}", " ", ";text-align:", ";"], p => !p.isRaw && getControlPadding(), Fonts.body, p => p.align === "right" ? "right" : "left");
const InputBase = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/React__default.createElement(StyledInput, _extends({}, props, {
    ref: ref
  }));
});
const Input = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    iconBlack,
    controlSize,
    iconOnly,
    onBlur,
    value,
    ...inputProps
  } = props;
  return /*#__PURE__*/React__default.createElement(ControlContainer, _extends({
    iconBlack: iconBlack,
    controlSize: controlSize,
    iconOnly: iconOnly
  }, inputProps), /*#__PURE__*/React__default.createElement(InputBase, _extends({}, inputProps, {
    value: value,
    onBlur: onBlur,
    ref: ref
  })));
});
const InputRaw = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/React__default.createElement(InputBase, _extends({}, props, {
    ref: ref,
    isRaw: true
  }));
});

export { Input, InputRaw };
