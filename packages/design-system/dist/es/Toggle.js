import _extends from '@babel/runtime/helpers/extends';
import React__default, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from './colors.js';

const Toggle = props => {
  const [internalChecked, setInternalChecked] = useState(props.checked ?? false);
  const checked = props.checked === undefined ? internalChecked : props.checked;
  const {
    ...inputProps
  } = props;
  const name = inputProps.name;
  return /*#__PURE__*/React__default.createElement(ToggleWrap, null, /*#__PURE__*/React__default.createElement(ToggleElement, null, /*#__PURE__*/React__default.createElement(ToggleInput, _extends({
    id: name,
    type: "checkbox"
  }, inputProps, {
    checked: checked,
    onChange: e => {
      setInternalChecked(e.target.checked);
      props.onChange?.(e);
    }
  })), /*#__PURE__*/React__default.createElement(ToggleLabel, {
    htmlFor: name,
    role: "switch",
    disabled: !!props.disabled
  }, /*#__PURE__*/React__default.createElement(ToggleSwitch, {
    checked: checked,
    disabled: !!props.disabled
  }, /*#__PURE__*/React__default.createElement("span", null)))));
};
const ToggleWrap = styled.div.withConfig({
  displayName: "Toggle__ToggleWrap",
  componentId: "sc-1ecbsxn-0"
})(["display:flex;align-items:center;> span{color:", ";}"], Colors.black10);
const ToggleElement = styled.div.withConfig({
  displayName: "Toggle__ToggleElement",
  componentId: "sc-1ecbsxn-1"
})(["position:relative;width:32px;height:18px;padding:1px;"]);
const ToggleLabel = styled.label.withConfig({
  displayName: "Toggle__ToggleLabel",
  componentId: "sc-1ecbsxn-2"
})(["background:none;color:inherit;padding:0;opacity:", ";outline:none;width:30px;height:16px;pointer-events:", ";"], props => props.disabled ? "0.4" : "1", props => props.disabled ? "none" : "inherit");
const ToggleSwitch = styled.div.withConfig({
  displayName: "Toggle__ToggleSwitch",
  componentId: "sc-1ecbsxn-3"
})(["position:relative;width:30px;height:16px;border-radius:8px;background-color:white;box-shadow:0 0 0 1px ", ";transition:all 0.1s;pointer-events:none;span{position:absolute;border-radius:8px;left:2px;top:50%;width:10px;height:10px;background:", ";transform:translate3d(", ",-50%,0);transition:transform 150ms ease-out,opacity 0.1s;}"], p => !p.checked || p.disabled ? Colors.black40 : "black", p => !p.checked || p.disabled ? Colors.black40 : "black", p => p.checked ? "16px" : "0");
const ToggleInput = styled.input.withConfig({
  displayName: "Toggle__ToggleInput",
  componentId: "sc-1ecbsxn-4"
})(["position:absolute;left:0;top:0;width:30px;height:16px;opacity:0;margin:0;cursor:", ";pointer-events:auto;", ""], props => props.disabled ? "not-allowed" : "pointer", p => p.disabled ? "" : `
  &:hover {
    + ${ToggleLabel} ${ToggleSwitch} {
      box-shadow: 0 0 0 1px black;
    }
    
    + ${ToggleLabel} ${ToggleSwitch} span {
      background-color: black;
    }
  }
  `);

export { Toggle };
