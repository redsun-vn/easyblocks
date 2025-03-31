import styled from 'styled-components';
import { Trigger, TabsContent, Root, List } from '@radix-ui/react-tabs';
import React__default from 'react';
import { Colors } from './colors.js';
import { Typography } from './Typography.js';

function Tabs(props) {
  return /*#__PURE__*/React__default.createElement(_StyledRoot, {
    value: props.value,
    onValueChange: value => props.onChange(value)
  }, props.children);
}
function TabList(props) {
  return /*#__PURE__*/React__default.createElement(_StyledDiv, null, /*#__PURE__*/React__default.createElement(_StyledList, null, props.children), props.action);
}
function Tab(props) {
  return /*#__PURE__*/React__default.createElement(_StyledTypography, {
    component: Trigger,
    value: props.value,
    $_css: Colors.black500
  }, props.children);
}
function TabPanel(props) {
  return /*#__PURE__*/React__default.createElement(TabsContent, {
    value: props.value
  }, props.children);
}
var _StyledRoot = styled(Root)`
        width: 100%;
      `;
var _StyledDiv = styled("div")`
        display: flex;
        width: 100%;
        justify-content: space-between;
      `;
var _StyledList = styled(List)`
          display: flex;
          flex-wrap: nowrap;
          gap: 36px;
          min-height: 36px;
        `;
var _StyledTypography = styled(Typography).withConfig({
  displayName: "Tabs___StyledTypography",
  componentId: "sc-1nxdand-0"
})(["padding:0;margin:0;border:0;background:transparent;@media (hover:hover){cursor:pointer;}&[data-state=\"active\"]{font-weight:bold;}&[data-state=\"inactive\"]{color:", ";}"], p => p.$_css);

export { Tab, TabList, TabPanel, Tabs };
