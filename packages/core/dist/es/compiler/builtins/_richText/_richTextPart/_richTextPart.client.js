/* with love from shopstory */
import React from '../../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js';

function RichTextPartClient(props) {
  const {
    value,
    Text,
    TextWrapper
  } = props;
  const textValue = value || "\uFEFF";
  if (TextWrapper) {
    return /*#__PURE__*/React.createElement(Text.type, Text.props, /*#__PURE__*/React.createElement(TextWrapper.type, TextWrapper.props, textValue));
  }
  return /*#__PURE__*/React.createElement(Text.type, Text.props, textValue);
}

export { RichTextPartClient };
