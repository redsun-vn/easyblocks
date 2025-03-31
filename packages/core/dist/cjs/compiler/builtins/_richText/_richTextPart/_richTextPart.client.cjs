/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');

function RichTextPartClient(props) {
  const {
    value,
    Text,
    TextWrapper
  } = props;
  const textValue = value || "\uFEFF";
  if (TextWrapper) {
    return /*#__PURE__*/index.createElement(Text.type, Text.props, /*#__PURE__*/index.createElement(TextWrapper.type, TextWrapper.props, textValue));
  }
  return /*#__PURE__*/index.createElement(Text.type, Text.props, textValue);
}

exports.RichTextPartClient = RichTextPartClient;
