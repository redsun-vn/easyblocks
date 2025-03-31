/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var index = require('../../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

function RichTextLineElementClient(props) {
  const {
    blockType,
    elements: Elements,
    ListItem,
    TextLine
  } = props;
  const elements = Elements.map((Element, index$1) => /*#__PURE__*/index.createElement(Element.type, _extends__default["default"]({}, Element.props, {
    key: index$1
  })));
  if (blockType === "paragraph") {
    return /*#__PURE__*/index.createElement(TextLine.type, TextLine.props, elements);
  }
  if (blockType === "bulleted-list" || blockType === "numbered-list") {
    return /*#__PURE__*/index.createElement(ListItem.type, ListItem.props, /*#__PURE__*/index.createElement("div", null, elements));
  }
  return /*#__PURE__*/index.createElement("div", null, elements);
}

exports.RichTextLineElementClient = RichTextLineElementClient;
