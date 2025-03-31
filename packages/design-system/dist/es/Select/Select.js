import styled from 'styled-components';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';
import React__default, { forwardRef } from 'react';
import { Colors } from '../colors.js';
import { Fonts } from '../fonts.js';

const SelectTrigger = styled(RadixSelect.Trigger).withConfig({
  displayName: "Select__SelectTrigger",
  componentId: "sc-1ehkd60-0"
})(["all:unset;display:flex;align-items:center;", ";"], Fonts.body);
var _StyledSelectTrigger = styled(SelectTrigger).withConfig({
  displayName: "Select___StyledSelectTrigger",
  componentId: "sc-1ehkd60-1"
})(["display:flex;gap:4px;max-width:100%;box-sizing:border-box;height:28px;padding:0 2px 0 6px;border-radius:2px;@media (hover:hover){&:hover{box-shadow:0 0 0 1px ", ";}}"], p => p.$_css);
function Select(props) {
  return /*#__PURE__*/React__default.createElement(RadixSelect.Root, {
    value: props.value,
    onValueChange: props.onChange
  }, /*#__PURE__*/React__default.createElement(_StyledSelectTrigger, {
    $_css: Colors.black10
  }, /*#__PURE__*/React__default.createElement(_StyledRadixSelectValue, {
    placeholder: props.placeholder ?? "Select a value..."
  }), /*#__PURE__*/React__default.createElement(RadixSelect.Icon, null, /*#__PURE__*/React__default.createElement(ChevronDownIcon, {
    color: Colors.black40
  }))), /*#__PURE__*/React__default.createElement(RadixSelect.Portal, null, /*#__PURE__*/React__default.createElement(_StyledRadixSelectContent, {
    $_css2: Colors.black10
  }, /*#__PURE__*/React__default.createElement(RadixSelect.Viewport, null, props.children))));
}
const SelectItemWrapper = styled(RadixSelect.Item).withConfig({
  displayName: "Select__SelectItemWrapper",
  componentId: "sc-1ehkd60-2"
})(["display:flex;align-items:center;gap:6px;box-sizing:border-box;min-height:28px;padding:0 6px;", ";color:#000;background:#fff;outline:none;&[data-state=\"unchecked\"]{padding-left:calc(6px + 15px + 6px);}&[data-highlighted]{background:#daeafd;}@media (hover:hover){cursor:pointer;}"], Fonts.body);
const SelectItem = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/React__default.createElement(SelectItemWrapper, {
    value: props.value,
    disabled: props.isDisabled ?? false,
    ref: ref
  }, /*#__PURE__*/React__default.createElement(RadixSelect.ItemIndicator, null, /*#__PURE__*/React__default.createElement(CheckIcon, {
    color: "#202123"
  })), /*#__PURE__*/React__default.createElement(RadixSelect.ItemText, null, props.children));
});
function SelectSeparator() {
  return /*#__PURE__*/React__default.createElement(_StyledRadixSelectSeparator, {
    $_css3: Colors.black100
  });
}
var _StyledRadixSelectValue = styled(RadixSelect.Value).withConfig({
  displayName: "Select___StyledRadixSelectValue",
  componentId: "sc-1ehkd60-3"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
var _StyledRadixSelectContent = styled(RadixSelect.Content).withConfig({
  displayName: "Select___StyledRadixSelectContent",
  componentId: "sc-1ehkd60-4"
})(["min-width:100px;max-height:600px;padding:4px 0;background:#fff;border:1px solid ", ";border-radius:2px;box-shadow:0px 2px 14px 0px rgba(0,0,0,0.15);"], p => p.$_css2);
var _StyledRadixSelectSeparator = styled(RadixSelect.Separator).withConfig({
  displayName: "Select___StyledRadixSelectSeparator",
  componentId: "sc-1ehkd60-5"
})(["height:1px;margin:4px;background:", ";"], p => p.$_css3);

export { Select, SelectItem, SelectSeparator };
