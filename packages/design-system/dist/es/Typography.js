'use client';
import _extends from '@babel/runtime/helpers/extends';
import React__default from 'react';
import styled, { css } from 'styled-components';
import { Colors } from './colors.js';
import { Fonts } from './fonts.js';

const Typography = _ref => {
  let {
    children,
    className,
    component: Component = "div",
    color,
    variant = "body",
    align = "left",
    isTruncated = false,
    ...restProps
  } = _ref;
  return /*#__PURE__*/React__default.createElement(TypographyRoot, _extends({
    as: Component,
    className: className,
    variant: variant
    // Don't forward `color` prop to host element since it's our custom prop, not native one.
    ,
    $color: color,
    align: align,
    $isTruncated: isTruncated
  }, restProps), children);
};
// Why use `div` as the default text tag?
// 1. We mostly stack up lines of text so it's natural for typography component to be block element
// 2. We can easily put other `Typography` components within. Why does it matter?
//    Imagine we want to only bold a fragment of text so we use `Typography` as the child of `Typography`.
//    If we would use `p` as the default, there are restricted tags that can be placed within
//    and maybe you would remember about that to change tag of outer `Typography` component
//    or maybe you would get warning from React about incorrect nesting of HTML elements.
//    By using the `div` as the default, you don't have to worry about it.
const TypographyRoot = styled.div.withConfig({
  displayName: "Typography__TypographyRoot",
  componentId: "sc-yrvxxm-0"
})(["color:", ";", " text-align:", ";", ""], _ref2 => {
  let {
    $color
  } = _ref2;
  return $color !== undefined ? Colors[$color] : "black";
}, _ref3 => {
  let {
    variant
  } = _ref3;
  return Fonts[variant];
}, _ref4 => {
  let {
    align
  } = _ref4;
  return align;
}, _ref5 => {
  let {
    $isTruncated
  } = _ref5;
  return $isTruncated && css(["overflow:hidden;text-overflow:ellipsis;"]);
});

export { Typography };
