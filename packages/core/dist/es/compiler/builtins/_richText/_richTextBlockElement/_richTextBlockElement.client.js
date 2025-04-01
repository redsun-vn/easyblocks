/* with love from shopstory */
import _extends from '@babel/runtime/helpers/extends';
import React from 'react';

function RichTextBlockElementClient(props) {
  var type = props.type,
    BulletedList = props.BulletedList,
    Elements = props.elements,
    NumberedList = props.NumberedList,
    Paragraph = props.Paragraph;
  var elements = Elements.map(function (Element, index) {
    return /*#__PURE__*/React.createElement(Element.type, _extends({}, Element.props, {
      key: index
    }));
  });
  if (type === "paragraph") {
    return /*#__PURE__*/React.createElement(Paragraph.type, Paragraph.props, elements);
  }
  if (type === "bulleted-list") {
    return /*#__PURE__*/React.createElement(BulletedList.type, BulletedList.props, elements);
  }
  if (type === "numbered-list") {
    return /*#__PURE__*/React.createElement(NumberedList.type, NumberedList.props, elements);
  }
  return /*#__PURE__*/React.createElement("div", null, elements);
}

export { RichTextBlockElementClient };
