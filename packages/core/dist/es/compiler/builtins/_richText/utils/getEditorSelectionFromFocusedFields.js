/* with love from shopstory */
import { last, dotNotationGet } from '@redsun-vn/easyblocks-utils';
import { parseFocusedRichTextPartConfigPath } from './parseRichTextPartConfigPath.js';

function getEditorSelectionFromFocusedFields(focusedFields, form) {
  try {
    var anchorFocusedField = focusedFields[0];
    var focusFocusedField = last(focusedFields);
    var parsedAnchorField = parseFocusedRichTextPartConfigPath(anchorFocusedField);
    var parsedFocusedField = parseFocusedRichTextPartConfigPath(focusFocusedField);
    if (!parsedAnchorField.path.length || !parsedFocusedField.path.length) {
      return null;
    }
    return {
      anchor: {
        offset: parsedAnchorField.range ? parsedAnchorField.range[0] : 0,
        path: parsedAnchorField.path
      },
      focus: {
        offset: parsedFocusedField.range ? parsedFocusedField.range[1] : dotNotationGet(form.values, focusFocusedField).value.length,
        path: parsedFocusedField.path
      }
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { getEditorSelectionFromFocusedFields };
