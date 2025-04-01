/* with love from shopstory */
import { getAbsoluteRichTextPartPath } from '../getAbsoluteRichTextPartPath.js';
import { getFocusedRichTextPartsConfigPaths } from './getFocusedRichTextPartsConfigPaths.js';

function getFocusedFieldsFromSlateSelection(editor, richTextComponentConfigPath, locale) {
  if (editor.selection === null) {
    return undefined;
  }
  var focusedRichTextPartPaths = getFocusedRichTextPartsConfigPaths(editor);
  var focusedFields = focusedRichTextPartPaths.map(function (richTextPartPath) {
    return getAbsoluteRichTextPartPath(richTextPartPath, richTextComponentConfigPath, locale);
  });
  return focusedFields;
}

export { getFocusedFieldsFromSlateSelection };
