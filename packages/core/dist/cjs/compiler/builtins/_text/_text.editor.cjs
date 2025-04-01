'use client';
/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var React = require('react');
var InlineTextarea = require('./InlineTextarea.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function TextEditor(props) {
  var _configValue$id;
  var Text = props.Text,
    value = props.value,
    _props$__easyblocks = props.__easyblocks,
    path = _props$__easyblocks.path,
    runtime = _props$__easyblocks.runtime;
  var form = window.parent.editorWindowAPI.editorContext.form;
  var valuePath = "".concat(path, ".value");
  var configValue = easyblocksUtils.dotNotationGet(form.values, valuePath);
  var isLocalTextReference = (_configValue$id = configValue.id) === null || _configValue$id === void 0 ? void 0 : _configValue$id.startsWith("local.");
  return /*#__PURE__*/React__default["default"].createElement(Text.type, _extends__default["default"]({}, Text.props, {
    as: "div"
  }), isLocalTextReference ? /*#__PURE__*/React__default["default"].createElement(InlineTextarea.InlineTextarea, {
    path: path,
    placeholder: "Here goes text content",
    stitches: runtime.stitches
  }) : value !== null && value !== void 0 ? value : /*#__PURE__*/React__default["default"].createElement("span", null, "\xA0"));
}

exports.TextEditor = TextEditor;
