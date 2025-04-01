/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withEasyblocks } from '../withEasyblocks.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

// Slate's transforms methods mutates given editor instance.
// By creating temporary editor instance we can apply all transformations without
// touching original editor and read result from `temporaryEditor.children`
function createTemporaryEditor(editor) {
  var temporaryEditor = withEasyblocks(withReact(createEditor()));
  temporaryEditor.children = _toConsumableArray(editor.children);
  temporaryEditor.selection = editor.selection ? _objectSpread({}, editor.selection) : null;
  return temporaryEditor;
}

export { createTemporaryEditor };
