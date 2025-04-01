/* with love from shopstory */
import _extends from '@babel/runtime/helpers/extends';
import React from 'react';

function RichTextLineElementClient(props) {
  var blockType = props.blockType,
    Elements = props.elements,
    ListItem = props.ListItem,
    TextLine = props.TextLine;
  var elements = Elements.map(function (Element, index) {
    return /*#__PURE__*/React.createElement(Element.type, _extends({}, Element.props, {
      key: index
    }));
  });
  if (blockType === "paragraph") {
    return /*#__PURE__*/React.createElement(TextLine.type, TextLine.props, elements);
  }
  if (blockType === "bulleted-list" || blockType === "numbered-list") {
    return /*#__PURE__*/React.createElement(ListItem.type, ListItem.props, /*#__PURE__*/React.createElement("div", null, elements));
  }
  return /*#__PURE__*/React.createElement("div", null, elements);
}

export { RichTextLineElementClient };
