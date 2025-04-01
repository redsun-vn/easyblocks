/* with love from shopstory */
import { cleanString } from '@redsun-vn/easyblocks-utils';
import { Element } from 'slate';
import { buildRichTextBlockElementComponentConfig, buildRichTextLineElementComponentConfig, buildRichTextPartComponentConfig } from '../builders.js';

function convertEditorValueToRichTextElements(editorValue) {
  return editorValue.map(function (blockElement) {
    if (Element.isElementType(blockElement, "bulleted-list")) {
      return convertEditorListElementToRichTextListBlockElement("bulleted-list", blockElement);
    }
    if (Element.isElementType(blockElement, "numbered-list")) {
      return convertEditorListElementToRichTextListBlockElement("numbered-list", blockElement);
    }
    if (Element.isElementType(blockElement, "paragraph")) {
      return convertEditorParagraphElementToRichTextParagraphBlockElement(blockElement);
    }
    throw new Error("Unknown block element");
  });
}
function convertEditorElementToRichTextLineElement(editorElement) {
  var lineElement = buildRichTextLineElementComponentConfig({
    elements: editorElement.children.map(function (child) {
      return buildRichTextPartComponentConfig({
        value: cleanString(child.text),
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
  var listBlockElement = buildRichTextBlockElementComponentConfig(type, editorElement.children.map(function (child) {
    return convertEditorElementToRichTextLineElement(child);
  }));
  listBlockElement._id = editorElement.id;
  return listBlockElement;
}
function convertEditorParagraphElementToRichTextParagraphBlockElement(editorElement) {
  var paragraphBlockElement = buildRichTextBlockElementComponentConfig("paragraph", editorElement.children.map(function (child) {
    return convertEditorElementToRichTextLineElement(child);
  }));
  paragraphBlockElement._id = editorElement.id;
  return paragraphBlockElement;
}

export { convertEditorValueToRichTextElements };
