import React__default from 'react';
import styled from 'styled-components';
import { Colors } from '../colors.js';
import { Fonts } from '../fonts.js';
import { CustomComponentSymbol } from '../CustomComponentSymbol.js';
import { ButtonGhost } from '../buttons.js';

const Root = styled.div.withConfig({
  displayName: "BasicRow__Root",
  componentId: "sc-1ifay80-0"
})(["position:relative;background-color:white;transition:all 0.1s;padding:12px;&:hover{background-color:", ";}display:flex;flex-direction:row;align-items:center;gap:8px;cursor:pointer;&:hover{.EditContainer{opacity:1;visibility:visible;}}"], Colors.black5);
const ImageContainer = styled.div.withConfig({
  displayName: "BasicRow__ImageContainer",
  componentId: "sc-1ifay80-1"
})(["position:relative;box-sizing:border-box;background:", ";width:52px;height:52px;pointer-events:none;padding:2px;flex:0 0 auto;"], Colors.black10);
const Image = styled.img.withConfig({
  displayName: "BasicRow__Image",
  componentId: "sc-1ifay80-2"
})(["width:100%;height:100%;object-fit:contain;"]);
const TextContainer = styled.div.withConfig({
  displayName: "BasicRow__TextContainer",
  componentId: "sc-1ifay80-3"
})(["pointer-events:none;min-width:0;flex:1 1 auto;"]);
const TitleContainer = styled.div.withConfig({
  displayName: "BasicRow__TitleContainer",
  componentId: "sc-1ifay80-4"
})(["display:flex;flex-direction:row;align-items:center;gap:8px;margin-bottom:4px;"]);
const DescriptionContainer = styled.div.withConfig({
  displayName: "BasicRow__DescriptionContainer",
  componentId: "sc-1ifay80-5"
})(["display:flex;flex-direction:row;align-items:center;gap:5px;"]);
const Title = styled.div.withConfig({
  displayName: "BasicRow__Title",
  componentId: "sc-1ifay80-6"
})(["", ";color:", ";"], Fonts.label, p => p.custom ? Colors.purple : "black");
const Description = styled.div.withConfig({
  displayName: "BasicRow__Description",
  componentId: "sc-1ifay80-7"
})(["", ";color:", ";line-height:1;"], p => p.tinyDescription ? Fonts.body4 : Fonts.body, p => p.custom ? Colors.purple : Colors.black40);
const EditContainer = styled.div.withConfig({
  displayName: "BasicRow__EditContainer",
  componentId: "sc-1ifay80-8"
})(["opacity:0;visibility:hidden;"]);
const BasicRow = props => {
  return /*#__PURE__*/React__default.createElement(Root, {
    onClick: props.onClick
  }, /*#__PURE__*/React__default.createElement(ImageContainer, props, props.image && /*#__PURE__*/React__default.createElement(Image, {
    src: props.image,
    loading: "lazy"
  })), /*#__PURE__*/React__default.createElement(TextContainer, null, /*#__PURE__*/React__default.createElement(TitleContainer, null, props.customTitle && /*#__PURE__*/React__default.createElement(CustomComponentSymbol, null), /*#__PURE__*/React__default.createElement(Title, {
    custom: props.customTitle
  }, props.title)), /*#__PURE__*/React__default.createElement(DescriptionContainer, null, props.description && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, props.customDescription && /*#__PURE__*/React__default.createElement(CustomComponentSymbol, {
    size: 4
  }), /*#__PURE__*/React__default.createElement(Description, {
    tinyDescription: props.tinyDescription,
    custom: props.customDescription
  }, props.description)))), props.onEdit && /*#__PURE__*/React__default.createElement(EditContainer, {
    className: "EditContainer"
  }, /*#__PURE__*/React__default.createElement(ButtonGhost, {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      props.onEdit?.();
    }
  }, "Edit")));
};

export { BasicRow };
