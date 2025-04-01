/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { nonNullable } from '@redsun-vn/easyblocks-utils';
import { Range, Editor, Node, Text, Transforms } from 'slate';
import { convertEditorValueToRichTextElements } from './utils/convertEditorValueToRichTextElements.js';
import { getFocusedRichTextPartsConfigPaths } from './utils/getFocusedRichTextPartsConfigPaths.js';

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
  var isSelectionCollapsed = Range.isCollapsed(editor.selection);
  if (values.length === 1) {
    if (key === "TextWrapper" && isSelectionCollapsed) {
      expandCurrentSelectionToWholeTextPart(editor);
    }

    // If `values` contains one element, we want to apply this value to all text nodes.
    Editor.addMark(editor, key, values[0]);
    if (key === "TextWrapper") {
      if (values[0].length > 0) {
        var firstSelectedNodeEntry = Node.first(editor, editor.selection.anchor.path);
        var lastSelectedNodeEntry = Node.last(editor, editor.selection.focus.path);
        if (Text.isText(firstSelectedNodeEntry[0])) {
          var firstSelectedNode = firstSelectedNodeEntry[0];
          var lastSelectedNode = lastSelectedNodeEntry[0];
          if (firstSelectedNode !== lastSelectedNode) {
            Transforms.setNodes(editor, {
              color: firstSelectedNode.color,
              font: firstSelectedNode.font
            }, {
              match: Text.isText
            });
          }
        }
      }
    }
  } else {
    // If `values` contains multiple values, we want to update each selected text node separately with its
    // corresponding value. To do that, we need to obtain selection range for each selected text node
    // and apply correct value.
    var selectedTextNodeEntries = Array.from(Editor.nodes(editor, {
      match: Text.isText
    }));
    var selectedTextNodesRanges = selectedTextNodeEntries.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        textNodePath = _ref2[1];
      return Range.intersection(editor.selection, Editor.range(editor, textNodePath));
    }).filter(nonNullable());
    Editor.withoutNormalizing(editor, function () {
      selectedTextNodesRanges.reverse().forEach(function (range, index) {
        Transforms.setNodes(editor, _defineProperty({}, key, values[index]), {
          at: range,
          match: Text.isText,
          split: true
        });
      });
    });
  }
  var richTextElements = convertEditorValueToRichTextElements(editor.children);
  var newFocusedRichTextParts = getFocusedRichTextPartsConfigPaths(editor);
  return {
    elements: richTextElements,
    focusedRichTextParts: newFocusedRichTextParts
  };
}
function expandCurrentSelectionToWholeTextPart(editor) {
  var textPartPath = Editor.path(editor, editor.selection.anchor.path);
  Transforms.setSelection(editor, {
    anchor: Editor.start(editor, textPartPath),
    focus: Editor.end(editor, textPartPath)
  });
}

export { updateSelection };
