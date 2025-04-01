/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getAbsoluteRichTextPartPath = require('../getAbsoluteRichTextPartPath.cjs');
var getFocusedRichTextPartsConfigPaths = require('./getFocusedRichTextPartsConfigPaths.cjs');

function getFocusedFieldsFromSlateSelection(editor, richTextComponentConfigPath, locale) {
  if (editor.selection === null) {
    return undefined;
  }
  var focusedRichTextPartPaths = getFocusedRichTextPartsConfigPaths.getFocusedRichTextPartsConfigPaths(editor);
  var focusedFields = focusedRichTextPartPaths.map(function (richTextPartPath) {
    return getAbsoluteRichTextPartPath.getAbsoluteRichTextPartPath(richTextPartPath, richTextComponentConfigPath, locale);
  });
  return focusedFields;
}

exports.getFocusedFieldsFromSlateSelection = getFocusedFieldsFromSlateSelection;
