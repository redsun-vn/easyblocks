/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var React = require('react');
var reactDom = require('react-dom');
var TextareaAutosize = require('react-textarea-autosize');
var useTextValue = require('../useTextValue.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var TextareaAutosize__default = /*#__PURE__*/_interopDefaultLegacy(TextareaAutosize);

function InlineTextarea(_ref) {
  var path = _ref.path,
    placeholder = _ref.placeholder,
    stitches = _ref.stitches;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isEnabled = _useState2[0],
    setIsEnabled = _useState2[1];
  var textAreaRef = React.useRef(null);
  var _editorWindowAPI$edit = window.parent.editorWindowAPI.editorContext,
    form = _editorWindowAPI$edit.form,
    locale = _editorWindowAPI$edit.contextParams.locale,
    locales = _editorWindowAPI$edit.locales;
  var valuePath = "".concat(path, ".value");
  var value = easyblocksUtils.dotNotationGet(form.values, valuePath);
  var inputProps = useTextValue.useTextValue(value, function (val) {
    form.change(valuePath, val);
  }, locale, locales, placeholder);
  var css = stitches.css({
    width: "100%",
    wordWrap: "break-word",
    display: "block",
    fontSize: "inherit",
    fontFamily: "inherit",
    fontWeight: "inherit",
    boxSizing: "border-box",
    color: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    margin: "0 auto",
    maxWidth: "inherit",
    textTransform: "inherit",
    backgroundColor: "inherit",
    textAlign: "inherit",
    outline: "none",
    resize: "none",
    border: "none",
    overflow: "visible",
    position: "relative",
    padding: 0,
    "-ms-overflow-style": "none",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    pointerEvents: isEnabled ? "auto" : "none"
  })();
  return /*#__PURE__*/React__default["default"].createElement("div", {
    onMouseDown: function onMouseDown(event) {
      if (event.detail === 2) {
        var _textAreaRef$current;
        event.preventDefault();
        reactDom.flushSync(function () {
          setIsEnabled(true);
        });
        (_textAreaRef$current = textAreaRef.current) === null || _textAreaRef$current === void 0 || _textAreaRef$current.select();
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement(TextareaAutosize__default["default"], _extends__default["default"]({
    className: css,
    rows: 1
  }, inputProps, {
    ref: textAreaRef,
    onMouseDown: function onMouseDown(event) {
      if (isEnabled) {
        event.stopPropagation();
        return;
      }
    },
    onBlur: function onBlur() {
      setIsEnabled(false);
    }
  })));
}

exports.InlineTextarea = InlineTextarea;
