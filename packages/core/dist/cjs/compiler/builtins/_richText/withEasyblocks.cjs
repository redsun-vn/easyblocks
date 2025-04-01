/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var slate = require('slate');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

/**
 * Tracks which ids were used during current normalization run
 */
var USED_IDS = new Set();

/**
 * Keeps track what was the previous id before generating the unique id. This is needed because Slate rerenders before
 * our config updates and it wouldn't know which compiled component to render.
 */
var NORMALIZED_IDS_TO_IDS = new Map();
function withEasyblocks(editor) {
  var normalizeNode = editor.normalizeNode;

  // editor.insertText = (text) => {
  //   // Verify if the current selection is placed at the end of an inline element. If yes, set the selection to start of
  //   // the next element before adding new text. This allows to break out from the inline element if it's placed at the end of line.
  //   if (editor.selection && Range.isCollapsed(editor.selection)) {
  //     const selectedNodeParent = Editor.parent(
  //       editor,
  //       editor.selection.focus.path
  //     );

  //     if (selectedNodeParent) {
  //       const [parentNode, parentNodePath] = selectedNodeParent;

  //       if (SlateElement.isElement(parentNode) && editor.isInline(parentNode)) {
  //         const isCursorSetAtTheEnd = Editor.isEnd(
  //           editor,
  //           editor.selection.focus,
  //           parentNodePath
  //         );

  //         const nodePointAfterInlineElement = Editor.after(
  //           editor,
  //           parentNodePath
  //         );

  //         if (isCursorSetAtTheEnd && nodePointAfterInlineElement) {
  //           Transforms.setSelection(editor, {
  //             anchor: nodePointAfterInlineElement,
  //             focus: nodePointAfterInlineElement,
  //           });
  //         }
  //       }
  //     }
  //   }

  //   insertText(text);
  // };

  editor.normalizeNode = function (entry) {
    // When copying text content from content editable element, Slate wraps pasted content into top most element.
    // We need to unwrap each block element that is nested within another block element.
    if (unwrapBlockElementsNestedWithinBlockElement(editor, entry)) {
      return;
    }

    // Slate by default compares text elements and merges them, but to compare them it uses strict equality comparison algorithm.
    // We need to compare them using our own algorithm.
    if (mergeVisuallyTheSameOrEmptyTextNodes(editor, entry)) {
      return;
    }

    // if (normalizeEmptyTextNodesAfterInlineElements(editor, entry)) {
    //   return;
    // }

    // Rich text and its elements contains collections. Each item of collection should have unique id.
    if (updateNonUniqueIds(editor, entry)) {
      return;
    }

    // Slate normalizes fields from deepest to lowest. The lowest element is editor element which has empty path.
    if (entry[1].length === 0) {
      USED_IDS.clear();
    }
    normalizeNode(entry);
  };
  return editor;
}
function unwrapBlockElementsNestedWithinBlockElement(editor, entry) {
  var _entry = _slicedToArray__default["default"](entry, 2),
    node = _entry[0],
    path = _entry[1];
  if (slate.Element.isElement(node) &&
  // This cast is fine since `RichTextBlockElementType` overlaps with type of `node.type`.
  ["bulleted-list", "numbered-list", "paragraph"].includes(node.type)) {
    var nodeParent = slate.Node.parent(editor, path);
    if (slate.Element.isElement(nodeParent)) {
      if (nodeParent.type === node.type) {
        slate.Transforms.unwrapNodes(editor, {
          at: path
        });
        return true;
      }

      // For now there is only one case where block element can be nested within block element of different type,
      // it can happen while pasting content from one $richText to another. We want to keep the type of pasted content
      // so instead of unwrapping nodes, we lift them one level up.
      if (nodeParent.type !== node.type && ["bulleted-list", "numbered-list", "paragraph"].includes(nodeParent.type)) {
        slate.Transforms.liftNodes(editor, {
          at: path
        });
        return true;
      }
    }
  }
  return false;
}
function updateNonUniqueIds(editor, entry) {
  var _entry2 = _slicedToArray__default["default"](entry, 2),
    node = _entry2[0],
    path = _entry2[1];
  if (slate.Text.isText(node) || slate.Element.isElement(node)) {
    if (USED_IDS.has(node.id)) {
      var newId = easyblocksUtils.uniqueId();
      NORMALIZED_IDS_TO_IDS.set(newId, node.id);
      slate.Transforms.setNodes(editor, {
        id: newId
      }, {
        at: path,
        match: function match(n) {
          return (slate.Text.isText(n) || slate.Element.isElement(n)) && n.id === node.id;
        }
      });
      return true;
    } else {
      USED_IDS.add(node.id);
    }
  }
  return false;
}
function mergeVisuallyTheSameOrEmptyTextNodes(editor, entry) {
  var _entry3 = _slicedToArray__default["default"](entry, 2),
    node = _entry3[0],
    path = _entry3[1];
  if (slate.Element.isElement(node) && (node.type === "text-line" || node.type === "list-item")) {
    var textLineChildren = Array.from(slate.Node.children(editor, path));
    if (textLineChildren.length > 1) {
      for (var childIndex = 0; childIndex < textLineChildren.length - 1; childIndex++) {
        var _textLineChildren$chi = _slicedToArray__default["default"](textLineChildren[childIndex], 2),
          currentChildNode = _textLineChildren$chi[0],
          currentChildPath = _textLineChildren$chi[1];
        var _textLineChildren = _slicedToArray__default["default"](textLineChildren[childIndex + 1], 2),
          nextChildNode = _textLineChildren[0],
          nextChildPath = _textLineChildren[1];
        if (slate.Text.isText(currentChildNode) && slate.Text.isText(nextChildNode)) {
          if (compareText(currentChildNode, nextChildNode)) {
            slate.Transforms.mergeNodes(editor, {
              at: nextChildPath,
              match: function match(node) {
                return slate.Text.isText(node);
              }
            });
            return true;
          }
          if (nextChildNode.text.trim() === "" && childIndex + 1 < textLineChildren.length - 1 && currentChildNode.TextWrapper.length === 0) {
            slate.Transforms.mergeNodes(editor, {
              at: nextChildPath,
              match: function match(node) {
                return slate.Text.isText(node);
              }
            });
            return true;
          }

          // `Transforms.mergeNodes` always merges node/nodes at given position into PREVIOUS node.
          // In this case, we want to merge node at current position into next one.
          if (currentChildNode.text.trim() === "" && nextChildNode !== undefined) {
            slate.Transforms.setNodes(editor, {
              color: nextChildNode.color,
              font: nextChildNode.font
            }, {
              at: currentChildPath,
              match: function match(node) {
                return slate.Text.isText(node);
              }
            });
          }
        }
      }
    }
  }
  return false;
}

// This function might be useful in the future, but right now it's not needed.

// Slate normalization rules states that an inline element cannot be first or last child of block element.
// Slate during its own normalization will add empty Text nodes before or/and after inline element.
// Those Text nodes will be missing properties we add during constructing Slate value based on Shopstory config
// thus it will make compilation error because of missing schema prop values.
// function normalizeEmptyTextNodesAfterInlineElements(
//   editor: Editor,
//   entry: NodeEntry<SlateNode>
// ): boolean {
//   const [node, path] = entry;

//   if (
//     SlateElement.isElement(node) &&
//     (node.type === "text-line" || node.type === "list-item")
//   ) {
//     for (let index = 0; index < node.children.length; index++) {
//       const childNode = node.children[index];
//       const previousNode = node.children[index - 1];
//       const nextNode = node.children[index + 1];

//       if (
//         previousNode &&
//         nextNode &&
//         isElementInlineWrapperElement(previousNode) &&
//         isElementInlineWrapperElement(nextNode)
//       ) {
//         if (Text.isText(childNode) && childNode.text === "") {
//           Transforms.removeNodes(editor, {
//             at: [...path, index],
//           });
//           return true;
//         }
//       }

//       if (
//         childNode &&
//         nextNode &&
//         isElementInlineWrapperElement(childNode) &&
//         isElementInlineWrapperElement(nextNode)
//       ) {
//         const nextNodePath = [...path, index + 1];

//         Transforms.mergeNodes(editor, {
//           at: nextNodePath,
//         });

//         return true;
//       }
//     }
//   }

//   return false;
// }

function filterNonComparableProperties(obj) {
  return easyblocksUtils.keys(obj).filter(function (key) {
    return ["color", "font", "TextWrapper"].includes(key);
  }).reduce(function (filteredObject, currentKey) {
    filteredObject[currentKey] = obj[currentKey];
    return filteredObject;
  }, {});
}
function compareText(text1, text2) {
  var areEqual = true;
  var part1Keys = easyblocksUtils.keys(filterNonComparableProperties(text1));
  var part2Keys = easyblocksUtils.keys(filterNonComparableProperties(text2));
  if (part1Keys.length !== part2Keys.length) {
    return false;
  }
  for (var index = 0; index < part1Keys.length; index++) {
    var key = part1Keys[index];
    var part1Value = text1[key];
    var part2Value = text2[key];
    var areValuesEqual = easyblocksUtils.deepCompare(part1Value, part2Value);
    if (!areValuesEqual) {
      areEqual = false;
      break;
    }
  }
  return areEqual;
}

exports.NORMALIZED_IDS_TO_IDS = NORMALIZED_IDS_TO_IDS;
exports.withEasyblocks = withEasyblocks;
