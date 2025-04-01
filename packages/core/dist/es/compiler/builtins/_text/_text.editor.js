'use client';
/* with love from shopstory */
import _extends from '@babel/runtime/helpers/extends';
import { dotNotationGet } from '@redsun-vn/easyblocks-utils';
import React from 'react';
import { InlineTextarea } from './InlineTextarea.js';

function TextEditor(props) {
  var _configValue$id;
  var Text = props.Text,
    value = props.value,
    _props$__easyblocks = props.__easyblocks,
    path = _props$__easyblocks.path,
    runtime = _props$__easyblocks.runtime;
  var form = window.parent.editorWindowAPI.editorContext.form;
  var valuePath = "".concat(path, ".value");
  var configValue = dotNotationGet(form.values, valuePath);
  var isLocalTextReference = (_configValue$id = configValue.id) === null || _configValue$id === void 0 ? void 0 : _configValue$id.startsWith("local.");
  return /*#__PURE__*/React.createElement(Text.type, _extends({}, Text.props, {
    as: "div"
  }), isLocalTextReference ? /*#__PURE__*/React.createElement(InlineTextarea, {
    path: path,
    placeholder: "Here goes text content",
    stitches: runtime.stitches
  }) : value !== null && value !== void 0 ? value : /*#__PURE__*/React.createElement("span", null, "\xA0"));
}

export { TextEditor };
