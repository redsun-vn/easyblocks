import _extends from '@babel/runtime/helpers/extends';
import React__default from 'react';
import styled from 'styled-components';
import { Colors } from './colors.js';

const trackHeight = "1px";
const thumbSize = "11px";
const thumbRadius = "50%";
const trackColor = Colors.black10;
const trackColorHover = "black";
const thumbColor = "black";
const Root = styled.div.withConfig({
  displayName: "Slider__Root",
  componentId: "sc-1l3g6h4-0"
})(["input[type=\"range\"]{width:100%;margin:5px 0;height:20px;-webkit-appearance:none;cursor:pointer;}input[type=\"range\"]:focus{outline:none;}input[type=\"range\"]::-webkit-slider-runnable-track{background:", ";border:0;width:100%;height:", ";transition:all 0.1s;}input[type=\"range\"]::-webkit-slider-thumb{margin-top:-5px;width:", ";height:", ";border-radius:", ";background:", ";-webkit-appearance:none;}input[type=\"range\"]:focus::-webkit-slider-runnable-track{background:", ";}input[type=\"range\"]:hover::-webkit-slider-runnable-track{background:", ";}input[type=\"range\"]::-moz-range-track{background:", ";border:0;width:100%;height:", ";transition:all 0.1s;}input[type=\"range\"]::-moz-range-thumb{width:", ";height:", ";border-radius:", ";background:", ";border:none;}input[type=\"range\"]:hover::-moz-range-track{background:", ";}input[type=\"range\"]::-ms-track{background:transparent;border-color:transparent;border-width:0px 0;color:transparent;width:100%;height:", ";}input[type=\"range\"]::-ms-fill-lower{background:#000080;border:0;}input[type=\"range\"]::-ms-fill-upper{background:", ";border:0;}input[type=\"range\"]::-ms-thumb{width:", ";height:", ";border-radius:", ";background:", ";margin-top:0px;}input[type=\"range\"]:focus::-ms-fill-lower{background:", ";}input[type=\"range\"]:focus::-ms-fill-upper{background:", ";}"], trackColor, trackHeight, thumbSize, thumbSize, thumbRadius, thumbColor, trackColor, trackColorHover, trackColor, trackHeight, thumbSize, thumbSize, thumbRadius, thumbColor, trackColorHover, trackHeight, trackColor, thumbSize, thumbSize, thumbRadius, thumbColor, trackColor, trackColor);
const SliderStyled = styled.input.withConfig({
  displayName: "Slider__SliderStyled",
  componentId: "sc-1l3g6h4-1"
})([""]);
const RangeSlider = props => {
  return /*#__PURE__*/React__default.createElement(Root, null, /*#__PURE__*/React__default.createElement(SliderStyled, _extends({}, props, {
    type: "range"
  })));
};

export { RangeSlider };
