/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var slate = require('slate');
var builders = require('../builders.cjs');

function convertEditorValueToRichTextElements(editorValue) {
  return editorValue.map(function (blockElement) {
    if (slate.Element.isElementType(blockElement, "bulleted-list")) {
      return convertEditorListElementToRichTextListBlockElement("bulleted-list", blockElement);
    }
    if (slate.Element.isElementType(blockElement, "numbered-list")) {
      return convertEditorListElementToRichTextListBlockElement("numbered-list", blockElement);
    }
    if (slate.Element.isElementType(blockElement, "paragraph")) {
      return convertEditorParagraphElementToRichTextParagraphBlockElement(blockElement);
    }
    throw new Error("Unknown block element");
  });
}
function convertEditorElementToRichTextLineElement(editorElement) {
  var lineElement = builders.buildRichTextLineElementComponentConfig({
    elements: editorElement.children.map(function (child) {
      return builders.buildRichTextPartComponentConfig({
        value: easyblocksUtils.cleanString(child.text),
        color: child.color,
        font: child.font,
        id: child.id,
        TextWrapper: child.TextWrapper
      });
    })
  });
  lineElement._id = editorElement.id;
  return lineElement;
}
function convertEditorListElementToRichTextListBlockElement(type, editorElement) {
  var listBlockElement = builders.buildRichTextBlockElementComponentConfig(type, editorElement.children.map(function (child) {
    return convertEditorElementToRichTextLineElement(child);
  }));
  listBlockElement._id = editorElement.id;
  return listBlockElement;
}
function convertEditorParagraphElementToRichTextParagraphBlockElement(editorElement) {
  var paragraphBlockElement = builders.buildRichTextBlockElementComponentConfig("paragraph", editorElement.children.map(function (child) {
    return convertEditorElementToRichTextLineElement(child);
  }));
  paragraphBlockElement._id = editorElement.id;
  return paragraphBlockElement;
}

exports.convertEditorValueToRichTextElements = convertEditorValueToRichTextElements;
