/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var index$1 = require('../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');
require('../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/index.cjs');
var TextareaAutosize = require('react-textarea-autosize');
var useTextValue = require('../useTextValue.cjs');
var index = require('../../../_virtual/index.cjs');
var dotNotationGet = require('../../../packages/utils/src/object/dotNotationGet.cjs');
var index$2 = require('../../../_virtual/index2.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var TextareaAutosize__default = /*#__PURE__*/_interopDefaultLegacy(TextareaAutosize);

function InlineTextarea(_ref) {
  let {
    path,
    placeholder,
    stitches
  } = _ref;
  const [isEnabled, setIsEnabled] = index.react.exports.useState(false);
  const textAreaRef = index.react.exports.useRef(null);
  const {
    form,
    contextParams: {
      locale
    },
    locales
  } = window.parent.editorWindowAPI.editorContext;
  const valuePath = `${path}.value`;
  const value = dotNotationGet.dotNotationGet(form.values, valuePath);
  const inputProps = useTextValue.useTextValue(value, val => {
    form.change(valuePath, val);
  }, locale, locales, placeholder);
  const css = stitches.css({
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
  return /*#__PURE__*/index$1.createElement("div", {
    onMouseDown: event => {
      if (event.detail === 2) {
        event.preventDefault();
        index$2.reactDom.exports.flushSync(() => {
          setIsEnabled(true);
        });
        textAreaRef.current?.select();
      }
    }
  }, /*#__PURE__*/index$1.createElement(TextareaAutosize__default["default"], _extends__default["default"]({
    className: css,
    rows: 1
  }, inputProps, {
    ref: textAreaRef,
    onMouseDown: event => {
      if (isEnabled) {
        event.stopPropagation();
        return;
      }
    },
    onBlur: () => {
      setIsEnabled(false);
    }
  })));
}

exports.InlineTextarea = InlineTextarea;
