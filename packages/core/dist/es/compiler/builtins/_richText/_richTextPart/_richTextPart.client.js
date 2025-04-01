/* with love from shopstory */
import React from 'react';

function RichTextPartClient(props) {
  var value = props.value,
    Text = props.Text,
    TextWrapper = props.TextWrapper;
  var textValue = value || "\uFEFF";
  if (TextWrapper) {
    return /*#__PURE__*/React.createElement(Text.type, Text.props, /*#__PURE__*/React.createElement(TextWrapper.type, TextWrapper.props, textValue));
  }
  return /*#__PURE__*/React.createElement(Text.type, Text.props, textValue);
}

export { RichTextPartClient };
