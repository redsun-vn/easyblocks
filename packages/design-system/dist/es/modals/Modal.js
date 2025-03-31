import _extends from '@babel/runtime/helpers/extends';
import React__default, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Fonts } from '../fonts.js';
import { ButtonGhost } from '../buttons.js';
import { Icons } from '../icons.js';
import { Colors } from '../colors.js';
import { InputRaw } from '../Input.js';
import ReactModal from 'react-modal';

const ModalRoot = styled.div.withConfig({
  displayName: "Modal__ModalRoot",
  componentId: "sc-wv205r-0"
})([""]);
const Root = styled.div.withConfig({
  displayName: "Modal__Root",
  componentId: "sc-wv205r-1"
})(["width:", ";max-width:", ";height:", ";max-height:", ";position:relative;box-shadow:0px 2px 14px rgba(0,0,0,0.15);border-radius:4px;display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr;background-color:white;overflow:hidden;"], p => p.width || "100%", p => p.maxWidth || "none", p => p.height || "auto", p => p.maxHeight || "none");
const HeaderBody = styled.div.withConfig({
  displayName: "Modal__HeaderBody",
  componentId: "sc-wv205r-2"
})(["position:relative;", " color:black;"], p => p.headerLine && `border-bottom: 1px solid ${Colors.black10};`);
const ContentBody = styled.div.withConfig({
  displayName: "Modal__ContentBody",
  componentId: "sc-wv205r-3"
})(["position:relative;overflow-y:", ";overflow-x:hidden;padding:", ";"], p => p.maxHeight == "auto" ? "auto" : "scroll", p => p.noPadding ? "0" : "12px 12px");
const TitleHeader = styled.div.withConfig({
  displayName: "Modal__TitleHeader",
  componentId: "sc-wv205r-4"
})(["&:not(:empty){padding:12px;}display:flex;flex-direction:row;justify-content:space-between;align-items:center;"]);
const TitleHeaderLabel = styled.div.withConfig({
  displayName: "Modal__TitleHeaderLabel",
  componentId: "sc-wv205r-5"
})(["", ";"], Fonts.label);
const HeaderLetter = styled.div.withConfig({
  displayName: "Modal__HeaderLetter",
  componentId: "sc-wv205r-6"
})(["width:24px;height:24px;border-radius:4px;background-color:", ";", ";display:flex;justify-content:center;align-items:center;"], Colors.black10, Fonts.label3);
const ModalBody = _ref => {
  let {
    onRequestClose,
    title,
    width,
    maxHeight,
    maxWidth,
    headerLine,
    ...props
  } = _ref;
  const {
    children,
    headerSymbol = "close",
    searchProps
  } = props;
  return /*#__PURE__*/React__default.createElement(Root, _extends({
    width: width,
    maxWidth: maxWidth,
    maxHeight: maxHeight
  }, props), /*#__PURE__*/React__default.createElement(HeaderBody, {
    headerLine: headerLine
  }, /*#__PURE__*/React__default.createElement(TitleHeader, null, title && /*#__PURE__*/React__default.createElement(TitleHeaderLabel, null, title), searchProps && /*#__PURE__*/React__default.createElement(InputRaw, _extends({}, searchProps, {
    ref: node => {
      if (node) {
        node.focus();
      }
    }
  })), headerSymbol === "close" && onRequestClose !== undefined && /*#__PURE__*/React__default.createElement(ButtonGhost, {
    icon: Icons.Close,
    hideLabel: true,
    onClick: () => {
      if (onRequestClose) {
        onRequestClose();
      }
    }
  }, "Close"), headerSymbol && headerSymbol !== "close" && /*#__PURE__*/React__default.createElement(HeaderLetter, null, headerSymbol))), /*#__PURE__*/React__default.createElement(ContentBody, _extends({
    maxHeight: maxHeight
  }, props), children));
};
const MODES = {
  "center-small": {
    width: "320px",
    maxHeight: "380px",
    extraClass: ""
  },
  "center-huge": {
    width: "80vw",
    maxWidth: "1200px",
    height: "90vh",
    extraClass: "background-shade"
  }
};
const ModalContext = /*#__PURE__*/React__default.createContext(null);
const Modal = props => {
  const {
    isOpen,
    onRequestClose,
    mode = "center-small",
    ...bodyProps
  } = props;
  const parentSelector = useContext(ModalContext) ?? (() => {
    return document.querySelector("#modalContainer");
  });
  if (typeof window === "undefined") {
    return null;
  }
  const {
    extraClass,
    ...modeProps
  } = MODES[mode];
  const content = /*#__PURE__*/React__default.createElement(ModalRoot, null, /*#__PURE__*/React__default.createElement(ModalBody, _extends({}, modeProps, bodyProps, {
    onRequestClose: onRequestClose
  })));
  return /*#__PURE__*/React__default.createElement(ReactModal, {
    isOpen: isOpen,
    onRequestClose: onRequestClose,
    parentSelector: parentSelector,
    className: {
      base: `Shopstory__ReactModal__Content`,
      afterOpen: `Shopstory__ReactModal__Content--after-open`,
      beforeClose: `Shopstory__ReactModal__Content--before-close`
    },
    overlayClassName: {
      base: `Shopstory__ReactModal__Overlay ${extraClass}`,
      afterOpen: `Shopstory__ReactModal__Overlay--after-open ${extraClass}`,
      beforeClose: `Shopstory__ReactModal__Overlay--before-close ${extraClass}`
    },
    ariaHideApp: false,
    portalClassName: "Shopstory__ReactModalPortal"
  }, content);
};
const sharedContentStyles = `
    &:focus {
      border: none;
      outline: none;
    }
`;
const GlobalModalStyles = createGlobalStyle([".Shopstory__ReactModalPortal{position:absolute;top:0;left:0;width:100%;height:100%;}.Shopstory__ReactModal__Overlay{width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;&:before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.2;z-index:-1;}}.Shopstory__ReactModal__Overlay.background-shade{&:before{background-color:black;}}.Shopstory__ReactModal__Content{", "}.Shopstory__ReactModal__Content__Left{", " height:100vh;width:70vw;transition:all 350ms cubic-bezier(0.16,1,0.3,1);transform:translateX(-100%);}.Shopstory__ReactModal__Content__Left.Shopstory__ReactModal__Content__Left--after-open{transform:none;}.Shopstory__ReactModal__Content__Left.Shopstory__ReactModal__Content__Left--before-close{transform:translateX(-100%);}"], sharedContentStyles, sharedContentStyles);

export { GlobalModalStyles, Modal, ModalBody, ModalContext };
