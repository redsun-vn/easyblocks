/* with love from shopstory */
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';

function parseFocusedRichTextPartConfigPath(focusedRichTextPartConfigPath) {
  var focusedRichTextPartConfigPathMatch = focusedRichTextPartConfigPath.match(/\d+(\.elements\.\d+){2,3}/);
  if (focusedRichTextPartConfigPathMatch === null) {
    throw new Error("Invalid @easyblocks/rich-text-part config path");
  }
  var _focusedRichTextPartC = _slicedToArray(focusedRichTextPartConfigPathMatch, 1),
    richTextPartConfigPath = _focusedRichTextPartC[0];
  var path = richTextPartConfigPath.split(".elements.").map(function (index) {
    return +index;
  });
  var rangeMatch = focusedRichTextPartConfigPath.match(/\.\{(\d+),(\d+)\}$/);
  var range = rangeMatch !== null ? [+rangeMatch[1], +rangeMatch[2]] : null;
  return {
    path: path,
    range: range
  };
}

export { parseFocusedRichTextPartConfigPath };
