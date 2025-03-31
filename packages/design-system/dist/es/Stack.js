import React__default from 'react';
import styled from 'styled-components';

const StackWrapper = styled.div.withConfig({
  displayName: "Stack__StackWrapper",
  componentId: "sc-1wi5rsl-0"
})(["display:flex;flex-direction:column;gap:", "px;align-items:", ";"], props => props.gap, props => props.align === "start" ? "flex-start" : props.align === "end" ? "flex-end" : props.align === "stretch" ? "stretch" : "center");
function Stack(props) {
  return /*#__PURE__*/React__default.createElement(StackWrapper, {
    gap: props.gap,
    align: props.align ?? "stretch",
    className: props.className
  }, props.children);
}

export { Stack };
