/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var slate = require('slate');
var convertEditorValueToRichTextElements = require('./utils/convertEditorValueToRichTextElements.cjs');
var getFocusedRichTextPartsConfigPaths = require('./utils/getFocusedRichTextPartsConfigPaths.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function isEditorSelection(editor) {
  return editor.selection !== null;
}
function updateSelection(editor, key) {
  for (var _len = arguments.length, values = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    values[_key - 2] = arguments[_key];
  }
  if (!isEditorSelection(editor)) {
    return;
  }
  var isSelectionCollapsed = slate.Range.isCollapsed(editor.selection);
  if (values.length === 1) {
    if (key === "TextWrapper" && isSelectionCollapsed) {
      expandCurrentSelectionToWholeTextPart(editor);
    }

    // If `values` contains one element, we want to apply this value to all text nodes.
    slate.Editor.addMark(editor, key, values[0]);
    if (key === "TextWrapper") {
      if (values[0].length > 0) {
        var firstSelectedNodeEntry = slate.Node.first(editor, editor.selection.anchor.path);
        var lastSelectedNodeEntry = slate.Node.last(editor, editor.selection.focus.path);
        if (slate.Text.isText(firstSelectedNodeEntry[0])) {
          var firstSelectedNode = firstSelectedNodeEntry[0];
          var lastSelectedNode = lastSelectedNodeEntry[0];
          if (firstSelectedNode !== lastSelectedNode) {
            slate.Transforms.setNodes(editor, {
              color: firstSelectedNode.color,
              font: firstSelectedNode.font
            }, {
              match: slate.Text.isText
            });
          }
        }
      }
    }
  } else {
    // If `values` contains multiple values, we want to update each selected text node separately with its
    // corresponding value. To do that, we need to obtain selection range for each selected text node
    // and apply correct value.
    var selectedTextNodeEntries = Array.from(slate.Editor.nodes(editor, {
      match: slate.Text.isText
    }));
    var selectedTextNodesRanges = selectedTextNodeEntries.map(function (_ref) {
      var _ref2 = _slicedToArray__default["default"](_ref, 2),
        textNodePath = _ref2[1];
      return slate.Range.intersection(editor.selection, slate.Editor.range(editor, textNodePath));
    }).filter(easyblocksUtils.nonNullable());
    slate.Editor.withoutNormalizing(editor, function () {
      selectedTextNodesRanges.reverse().forEach(function (range, index) {
        slate.Transforms.setNodes(editor, _defineProperty__default["default"]({}, key, values[index]), {
          at: range,
          match: slate.Text.isText,
          split: true
        });
      });
    });
  }
  var richTextElements = convertEditorValueToRichTextElements.convertEditorValueToRichTextElements(editor.children);
  var newFocusedRichTextParts = getFocusedRichTextPartsConfigPaths.getFocusedRichTextPartsConfigPaths(editor);
  return {
    elements: richTextElements,
    focusedRichTextParts: newFocusedRichTextParts
  };
}
function expandCurrentSelectionToWholeTextPart(editor) {
  var textPartPath = slate.Editor.path(editor, editor.selection.anchor.path);
  slate.Transforms.setSelection(editor, {
    anchor: slate.Editor.start(editor, textPartPath),
    focus: slate.Editor.end(editor, textPartPath)
  });
}

exports.updateSelection = updateSelection;
