import React__default from 'react';
import styled from 'styled-components';
import { Fonts } from './fonts.js';
import { Colors } from './colors.js';

const Root = styled.div.withConfig({
  displayName: "FormElement__Root",
  componentId: "sc-11sxp3-0"
})(["position:relative;"]);
const Layout = styled.div.withConfig({
  displayName: "FormElement__Layout",
  componentId: "sc-11sxp3-1"
})(["position:relative;display:flex;flex-direction:row;gap:8px;align-items:center;"]);
const Label = styled.label.withConfig({
  displayName: "FormElement__Label",
  componentId: "sc-11sxp3-2"
})(["", " color:black;flex:0 0 120px;min-width:0;"], Fonts.body);
const ControlWrapper = styled.div.withConfig({
  displayName: "FormElement__ControlWrapper",
  componentId: "sc-11sxp3-3"
})(["flex:1 1 auto;min-width:0;display:grid;"]);
const ErrorWrapper = styled.div.withConfig({
  displayName: "FormElement__ErrorWrapper",
  componentId: "sc-11sxp3-4"
})(["margin-top:6px;", " color:", ";"], Fonts.body, Colors.red);
const FormElement = props => {
  return /*#__PURE__*/React__default.createElement(Root, null, /*#__PURE__*/React__default.createElement(Layout, null, /*#__PURE__*/React__default.createElement(Label, {
    htmlFor: props.name
  }, props.label), /*#__PURE__*/React__default.createElement(ControlWrapper, null, /*#__PURE__*/React__default.cloneElement(props.children, {
    name: props.name,
    hasError: !!props.error
  }))), props.error && /*#__PURE__*/React__default.createElement(Layout, null, /*#__PURE__*/React__default.createElement(Label, {
    as: "div"
  }), /*#__PURE__*/React__default.createElement(ErrorWrapper, null, props.error)));
};

export { FormElement };
