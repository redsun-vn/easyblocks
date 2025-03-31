import React__default from 'react';
import styled from 'styled-components';

const Root = styled.div.withConfig({
  displayName: "NavigationController__Root",
  componentId: "sc-19n3ku4-0"
})(["position:relative;overflow:hidden;display:grid;"]);
const PanelRoot = styled.div.withConfig({
  displayName: "NavigationController__PanelRoot",
  componentId: "sc-19n3ku4-1"
})(["grid-row:1 / span 1;grid-column:1 / span 1;position:relative;display:grid;overflow-y:auto;transform:translateX(", "px);"], p => p.index * 30);
const NavigationController = _ref => {
  let {
    panels
  } = _ref;
  return /*#__PURE__*/React__default.createElement(Root, null, panels.map((_ref2, index) => {
    let {
      id,
      title,
      element
    } = _ref2;
    return /*#__PURE__*/React__default.createElement(PanelRoot, {
      index: index
    }, element);
  }));
};

export { NavigationController };
