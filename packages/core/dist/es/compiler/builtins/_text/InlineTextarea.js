/* with love from shopstory */
import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { dotNotationGet } from '@redsun-vn/easyblocks-utils';
import React, { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useTextValue } from '../useTextValue.js';

function InlineTextarea(_ref) {
  var path = _ref.path,
    placeholder = _ref.placeholder,
    stitches = _ref.stitches;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isEnabled = _useState2[0],
    setIsEnabled = _useState2[1];
  var textAreaRef = useRef(null);
  var _editorWindowAPI$edit = window.parent.editorWindowAPI.editorContext,
    form = _editorWindowAPI$edit.form,
    locale = _editorWindowAPI$edit.contextParams.locale,
    locales = _editorWindowAPI$edit.locales;
  var valuePath = "".concat(path, ".value");
  var value = dotNotationGet(form.values, valuePath);
  var inputProps = useTextValue(value, function (val) {
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
  return /*#__PURE__*/React.createElement("div", {
    onMouseDown: function onMouseDown(event) {
      if (event.detail === 2) {
        var _textAreaRef$current;
        event.preventDefault();
        flushSync(function () {
          setIsEnabled(true);
        });
        (_textAreaRef$current = textAreaRef.current) === null || _textAreaRef$current === void 0 || _textAreaRef$current.select();
      }
    }
  }, /*#__PURE__*/React.createElement(TextareaAutosize, _extends({
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

export { InlineTextarea };
