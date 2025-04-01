/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var slate = require('slate');
var slateReact = require('slate-react');
var withEasyblocks = require('../withEasyblocks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

// Slate's transforms methods mutates given editor instance.
// By creating temporary editor instance we can apply all transformations without
// touching original editor and read result from `temporaryEditor.children`
function createTemporaryEditor(editor) {
  var temporaryEditor = withEasyblocks.withEasyblocks(slateReact.withReact(slate.createEditor()));
  temporaryEditor.children = _toConsumableArray__default["default"](editor.children);
  temporaryEditor.selection = editor.selection ? _objectSpread({}, editor.selection) : null;
  return temporaryEditor;
}

exports.createTemporaryEditor = createTemporaryEditor;
