/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getAbsoluteRichTextPartPath(relativeRichTextPartPath, richTextPath, locale) {
  return "".concat(richTextPath, ".elements.").concat(locale, ".").concat(relativeRichTextPartPath);
}

exports.getAbsoluteRichTextPartPath = getAbsoluteRichTextPartPath;
