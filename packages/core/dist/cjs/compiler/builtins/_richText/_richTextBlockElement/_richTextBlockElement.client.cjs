/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function RichTextBlockElementClient(props) {
  var type = props.type,
    BulletedList = props.BulletedList,
    Elements = props.elements,
    NumberedList = props.NumberedList,
    Paragraph = props.Paragraph;
  var elements = Elements.map(function (Element, index) {
    return /*#__PURE__*/React__default["default"].createElement(Element.type, _extends__default["default"]({}, Element.props, {
      key: index
    }));
  });
  if (type === "paragraph") {
    return /*#__PURE__*/React__default["default"].createElement(Paragraph.type, Paragraph.props, elements);
  }
  if (type === "bulleted-list") {
    return /*#__PURE__*/React__default["default"].createElement(BulletedList.type, BulletedList.props, elements);
  }
  if (type === "numbered-list") {
    return /*#__PURE__*/React__default["default"].createElement(NumberedList.type, NumberedList.props, elements);
  }
  return /*#__PURE__*/React__default["default"].createElement("div", null, elements);
}

exports.RichTextBlockElementClient = RichTextBlockElementClient;
