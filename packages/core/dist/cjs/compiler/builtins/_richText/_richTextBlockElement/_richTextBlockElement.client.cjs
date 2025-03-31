/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var index = require('../../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

function RichTextBlockElementClient(props) {
  const {
    type,
    BulletedList,
    elements: Elements,
    NumberedList,
    Paragraph
  } = props;
  const elements = Elements.map((Element, index$1) => /*#__PURE__*/index.createElement(Element.type, _extends__default["default"]({}, Element.props, {
    key: index$1
  })));
  if (type === "paragraph") {
    return /*#__PURE__*/index.createElement(Paragraph.type, Paragraph.props, elements);
  }
  if (type === "bulleted-list") {
    return /*#__PURE__*/index.createElement(BulletedList.type, BulletedList.props, elements);
  }
  if (type === "numbered-list") {
    return /*#__PURE__*/index.createElement(NumberedList.type, NumberedList.props, elements);
  }
  return /*#__PURE__*/index.createElement("div", null, elements);
}

exports.RichTextBlockElementClient = RichTextBlockElementClient;
