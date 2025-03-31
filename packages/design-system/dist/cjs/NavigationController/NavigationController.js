'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const Root = styled__default["default"].div.withConfig({
  displayName: "NavigationController__Root",
  componentId: "sc-19n3ku4-0"
})(["position:relative;overflow:hidden;display:grid;"]);
const PanelRoot = styled__default["default"].div.withConfig({
  displayName: "NavigationController__PanelRoot",
  componentId: "sc-19n3ku4-1"
})(["grid-row:1 / span 1;grid-column:1 / span 1;position:relative;display:grid;overflow-y:auto;transform:translateX(", "px);"], p => p.index * 30);
const NavigationController = _ref => {
  let {
    panels
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(Root, null, panels.map((_ref2, index) => {
    let {
      id,
      title,
      element
    } = _ref2;
    return /*#__PURE__*/React__default["default"].createElement(PanelRoot, {
      index: index
    }, element);
  }));
};

exports.NavigationController = NavigationController;
