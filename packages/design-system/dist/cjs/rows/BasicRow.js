'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');
var colors = require('../colors.js');
var fonts = require('../fonts.js');
var CustomComponentSymbol = require('../CustomComponentSymbol.js');
var buttons = require('../buttons.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const Root = styled__default["default"].div.withConfig({
  displayName: "BasicRow__Root",
  componentId: "sc-1ifay80-0"
})(["position:relative;background-color:white;transition:all 0.1s;padding:12px;&:hover{background-color:", ";}display:flex;flex-direction:row;align-items:center;gap:8px;cursor:pointer;&:hover{.EditContainer{opacity:1;visibility:visible;}}"], colors.Colors.black5);
const ImageContainer = styled__default["default"].div.withConfig({
  displayName: "BasicRow__ImageContainer",
  componentId: "sc-1ifay80-1"
})(["position:relative;box-sizing:border-box;background:", ";width:52px;height:52px;pointer-events:none;padding:2px;flex:0 0 auto;"], colors.Colors.black10);
const Image = styled__default["default"].img.withConfig({
  displayName: "BasicRow__Image",
  componentId: "sc-1ifay80-2"
})(["width:100%;height:100%;object-fit:contain;"]);
const TextContainer = styled__default["default"].div.withConfig({
  displayName: "BasicRow__TextContainer",
  componentId: "sc-1ifay80-3"
})(["pointer-events:none;min-width:0;flex:1 1 auto;"]);
const TitleContainer = styled__default["default"].div.withConfig({
  displayName: "BasicRow__TitleContainer",
  componentId: "sc-1ifay80-4"
})(["display:flex;flex-direction:row;align-items:center;gap:8px;margin-bottom:4px;"]);
const DescriptionContainer = styled__default["default"].div.withConfig({
  displayName: "BasicRow__DescriptionContainer",
  componentId: "sc-1ifay80-5"
})(["display:flex;flex-direction:row;align-items:center;gap:5px;"]);
const Title = styled__default["default"].div.withConfig({
  displayName: "BasicRow__Title",
  componentId: "sc-1ifay80-6"
})(["", ";color:", ";"], fonts.Fonts.label, p => p.custom ? colors.Colors.purple : "black");
const Description = styled__default["default"].div.withConfig({
  displayName: "BasicRow__Description",
  componentId: "sc-1ifay80-7"
})(["", ";color:", ";line-height:1;"], p => p.tinyDescription ? fonts.Fonts.body4 : fonts.Fonts.body, p => p.custom ? colors.Colors.purple : colors.Colors.black40);
const EditContainer = styled__default["default"].div.withConfig({
  displayName: "BasicRow__EditContainer",
  componentId: "sc-1ifay80-8"
})(["opacity:0;visibility:hidden;"]);
const BasicRow = props => {
  return /*#__PURE__*/React__default["default"].createElement(Root, {
    onClick: props.onClick
  }, /*#__PURE__*/React__default["default"].createElement(ImageContainer, props, props.image && /*#__PURE__*/React__default["default"].createElement(Image, {
    src: props.image,
    loading: "lazy"
  })), /*#__PURE__*/React__default["default"].createElement(TextContainer, null, /*#__PURE__*/React__default["default"].createElement(TitleContainer, null, props.customTitle && /*#__PURE__*/React__default["default"].createElement(CustomComponentSymbol.CustomComponentSymbol, null), /*#__PURE__*/React__default["default"].createElement(Title, {
    custom: props.customTitle
  }, props.title)), /*#__PURE__*/React__default["default"].createElement(DescriptionContainer, null, props.description && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, props.customDescription && /*#__PURE__*/React__default["default"].createElement(CustomComponentSymbol.CustomComponentSymbol, {
    size: 4
  }), /*#__PURE__*/React__default["default"].createElement(Description, {
    tinyDescription: props.tinyDescription,
    custom: props.customDescription
  }, props.description)))), props.onEdit && /*#__PURE__*/React__default["default"].createElement(EditContainer, {
    className: "EditContainer"
  }, /*#__PURE__*/React__default["default"].createElement(buttons.ButtonGhost, {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      props.onEdit?.();
    }
  }, "Edit")));
};

exports.BasicRow = BasicRow;
