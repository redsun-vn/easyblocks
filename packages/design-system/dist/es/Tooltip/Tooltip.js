import styled from 'styled-components';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import React__default from 'react';
import { Colors } from '../colors.js';

function TooltipProvider(props) {
  return /*#__PURE__*/React__default.createElement(RadixTooltip.Provider, null, props.children);
}
function Tooltip(props) {
  return /*#__PURE__*/React__default.createElement(RadixTooltip.Root, null, props.children);
}
function TooltipTrigger(props) {
  return /*#__PURE__*/React__default.createElement(RadixTooltip.Trigger, {
    asChild: true
  }, props.children);
}
function TooltipContent(props) {
  return /*#__PURE__*/React__default.createElement(RadixTooltip.Portal, null, /*#__PURE__*/React__default.createElement(_StyledRadixTooltipContent, {
    $_css: Colors.black800,
    $_css2: Colors.white
  }, /*#__PURE__*/React__default.createElement(_StyledRadixTooltipArrow, {
    $_css3: Colors.black800
  }), props.children));
}
var _StyledRadixTooltipContent = styled(RadixTooltip.Content)`
          display: flex;
          padding: 6px 4px;
          justify-content: center;
          align-items: center;

          border-radius: 2px;
          background: ${p => p.$_css};

          color: ${p => p.$_css2};
        `;
var _StyledRadixTooltipArrow = styled(RadixTooltip.Arrow).withConfig({
  displayName: "Tooltip___StyledRadixTooltipArrow",
  componentId: "sc-5s6xlu-0"
})(["fill:", ";"], p => p.$_css3);

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
