/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function RichTextLineElementClient(props) {
  var blockType = props.blockType,
    Elements = props.elements,
    ListItem = props.ListItem,
    TextLine = props.TextLine;
  var elements = Elements.map(function (Element, index) {
    return /*#__PURE__*/React__default["default"].createElement(Element.type, _extends__default["default"]({}, Element.props, {
      key: index
    }));
  });
  if (blockType === "paragraph") {
    return /*#__PURE__*/React__default["default"].createElement(TextLine.type, TextLine.props, elements);
  }
  if (blockType === "bulleted-list" || blockType === "numbered-list") {
    return /*#__PURE__*/React__default["default"].createElement(ListItem.type, ListItem.props, /*#__PURE__*/React__default["default"].createElement("div", null, elements));
  }
  return /*#__PURE__*/React__default["default"].createElement("div", null, elements);
}

exports.RichTextLineElementClient = RichTextLineElementClient;
