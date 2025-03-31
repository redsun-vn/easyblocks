import React__default from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from './colors.js';

const rotationKeyframes = keyframes(["0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}"]);
const LoaderWrapper = styled.div.withConfig({
  displayName: "Loader__LoaderWrapper",
  componentId: "sc-c4rfd8-0"
})(["width:10px;height:10px;border:2px solid ", ";border-bottom-color:transparent;border-radius:50%;animation:", " 1s linear infinite;"], Colors.black40, rotationKeyframes);
function Loader(_ref) {
  let {
    className
  } = _ref;
  return /*#__PURE__*/React__default.createElement(LoaderWrapper, {
    className: className
  });
}

export { Loader };
