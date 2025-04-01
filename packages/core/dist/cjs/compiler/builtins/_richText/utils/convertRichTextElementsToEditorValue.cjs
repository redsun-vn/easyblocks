/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var easyblocksUtils = require('@redsun-vn/easyblocks-utils');

function convertRichTextElementsToEditorValue(richTextElements) {
  if (!richTextElements || richTextElements.length === 0) {
    return getPlaceholderRichTextElements();
  }
  return richTextElements.map(function (richTextBlockElementComponentConfig) {
    return convertRichTextBlockElementComponentConfigToEditorElement(richTextBlockElementComponentConfig);
  });
}
function convertRichTextPartComponentConfigToEditorText(richTextPartComponentConfig) {
  return {
    color: richTextPartComponentConfig.color,
    font: richTextPartComponentConfig.font,
    id: richTextPartComponentConfig._id,
    text: richTextPartComponentConfig.value,
    TextWrapper: richTextPartComponentConfig.TextWrapper
  };
}
function convertRichTextBlockElementComponentConfigToEditorElement(blockElementComponentConfig) {
  if (blockElementComponentConfig.type === "bulleted-list" || blockElementComponentConfig.type === "numbered-list") {
    return {
      id: blockElementComponentConfig._id,
      type: blockElementComponentConfig.type,
      children: blockElementComponentConfig.elements.map(function (lineElementComponentConfig) {
        return {
          type: "list-item",
          id: lineElementComponentConfig._id,
          children: lineElementComponentConfig.elements.map(function (childComponentConfig) {
            return convertRichTextPartComponentConfigToEditorText(childComponentConfig);
          })
        };
      })
    };
  }
  return {
    id: blockElementComponentConfig._id,
    type: blockElementComponentConfig.type,
    children: blockElementComponentConfig.elements.map(function (lineElementComponentConfig) {
      return {
        type: "text-line",
        id: lineElementComponentConfig._id,
        children: lineElementComponentConfig.elements.map(function (childComponentConfig) {
          return convertRichTextPartComponentConfigToEditorText(childComponentConfig);
        })
      };
    })
  };
}
function getPlaceholderRichTextElements() {
  return [{
    id: easyblocksUtils.uniqueId(),
    type: "paragraph",
    children: [{
      id: easyblocksUtils.uniqueId(),
      type: "text-line",
      children: [{
        id: easyblocksUtils.uniqueId(),
        color: {
          tokenId: "black",
          value: "black",
          widgetId: "@easyblocks/color"
        },
        font: {
          tokenId: "$body",
          value: ""
        },
        text: "",
        TextWrapper: []
      }]
    }]
  }];
}

exports.convertRichTextElementsToEditorValue = convertRichTextElementsToEditorValue;
