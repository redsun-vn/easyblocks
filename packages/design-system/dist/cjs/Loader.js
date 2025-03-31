'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');
var colors = require('./colors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const rotationKeyframes = styled.keyframes(["0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}"]);
const LoaderWrapper = styled__default["default"].div.withConfig({
  displayName: "Loader__LoaderWrapper",
  componentId: "sc-c4rfd8-0"
})(["width:10px;height:10px;border:2px solid ", ";border-bottom-color:transparent;border-radius:50%;animation:", " 1s linear infinite;"], colors.Colors.black40, rotationKeyframes);
function Loader(_ref) {
  let {
    className
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(LoaderWrapper, {
    className: className
  });
}

exports.Loader = Loader;
