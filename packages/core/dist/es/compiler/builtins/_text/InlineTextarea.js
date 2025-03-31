/* with love from shopstory */
import _extends from '@babel/runtime/helpers/extends';
import React from '../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js';
import '../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/index.js';
import TextareaAutosize from 'react-textarea-autosize';
import { useTextValue } from '../useTextValue.js';
import { r as react } from '../../../_virtual/index.js';
import { dotNotationGet } from '../../../packages/utils/src/object/dotNotationGet.js';
import { r as reactDom } from '../../../_virtual/index2.js';

function InlineTextarea(_ref) {
  let {
    path,
    placeholder,
    stitches
  } = _ref;
  const [isEnabled, setIsEnabled] = react.exports.useState(false);
  const textAreaRef = react.exports.useRef(null);
  const {
    form,
    contextParams: {
      locale
    },
    locales
  } = window.parent.editorWindowAPI.editorContext;
  const valuePath = `${path}.value`;
  const value = dotNotationGet(form.values, valuePath);
  const inputProps = useTextValue(value, val => {
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
  return /*#__PURE__*/React.createElement("div", {
    onMouseDown: event => {
      if (event.detail === 2) {
        event.preventDefault();
        reactDom.exports.flushSync(() => {
          setIsEnabled(true);
        });
        textAreaRef.current?.select();
      }
    }
  }, /*#__PURE__*/React.createElement(TextareaAutosize, _extends({
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

export { InlineTextarea };
