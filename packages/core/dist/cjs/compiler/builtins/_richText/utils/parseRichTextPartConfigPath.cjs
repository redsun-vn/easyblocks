/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function parseFocusedRichTextPartConfigPath(focusedRichTextPartConfigPath) {
  var focusedRichTextPartConfigPathMatch = focusedRichTextPartConfigPath.match(/\d+(\.elements\.\d+){2,3}/);
  if (focusedRichTextPartConfigPathMatch === null) {
    throw new Error("Invalid @easyblocks/rich-text-part config path");
  }
  var _focusedRichTextPartC = _slicedToArray__default["default"](focusedRichTextPartConfigPathMatch, 1),
    richTextPartConfigPath = _focusedRichTextPartC[0];
  var path = richTextPartConfigPath.split(".elements.").map(function (index) {
    return +index;
  });
  var rangeMatch = focusedRichTextPartConfigPath.match(/\.\{(\d+),(\d+)\}$/);
  var range = rangeMatch !== null ? [+rangeMatch[1], +rangeMatch[2]] : null;
  return {
    path: path,
    range: range
  };
}

exports.parseFocusedRichTextPartConfigPath = parseFocusedRichTextPartConfigPath;
