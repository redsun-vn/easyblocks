/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var slate = require('slate');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function getFocusedRichTextPartsConfigPaths(editor) {
  if (editor.selection !== null) {
    var isBackward = slate.Range.isBackward(editor.selection);
    var anchorProperty = isBackward ? "focus" : "anchor";
    var focusProperty = isBackward ? "anchor" : "focus";
    var anchor = editor.selection[anchorProperty];
    var focus = editor.selection[focusProperty];
    var selectedTextNodes = Array.from(slate.Editor.nodes(editor, {
      match: slate.Text.isText
    }));
    if (selectedTextNodes.length === 1) {
      var range = {
        start: anchor.offset,
        end: focus.offset
      };
      var _selectedTextNodes$ = _slicedToArray__default["default"](selectedTextNodes[0], 2),
        textNode = _selectedTextNodes$[0],
        textPath = _selectedTextNodes$[1];
      return [buildFocusedRichTextPartConfigPath(textNode, textPath, range)];
    }
    var focusedRichTextPartsConfigPaths = selectedTextNodes.map(function (_ref, textEntryIndex) {
      var _ref2 = _slicedToArray__default["default"](_ref, 2),
        textNode = _ref2[0],
        textPath = _ref2[1];
      if (textNode.text === "") {
        return null;
      }
      var range = null;
      if (textEntryIndex === 0) {
        range = {
          start: anchor.offset,
          end: textNode.text.length
        };
      }
      if (textEntryIndex === selectedTextNodes.length - 1) {
        range = {
          start: 0,
          end: focus.offset
        };
      }
      return buildFocusedRichTextPartConfigPath(textNode, textPath, range);
    }).filter(function (configPath) {
      return configPath !== null;
    });
    return focusedRichTextPartsConfigPaths;
  }
  return [];
}
function buildFocusedRichTextPartConfigPath(textNode, path, range) {
  var focusedRichTextPartConfigPath = path.join(".elements.");
  if (range !== null && (isPartialSelection(range, textNode) || isCaretSelection(range))) {
    focusedRichTextPartConfigPath += ".{".concat(range.start, ",").concat(range.end, "}");
  }
  return focusedRichTextPartConfigPath;
}
function isPartialSelection(range, textNode) {
  return range.end - range.start !== textNode.text.length;
}
function isCaretSelection(range) {
  return range.end - range.start === 0;
}

exports.getFocusedRichTextPartsConfigPaths = getFocusedRichTextPartsConfigPaths;
