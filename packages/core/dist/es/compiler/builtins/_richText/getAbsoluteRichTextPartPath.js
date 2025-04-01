/* with love from shopstory */
function getAbsoluteRichTextPartPath(relativeRichTextPartPath, richTextPath, locale) {
  return "".concat(richTextPath, ".elements.").concat(locale, ".").concat(relativeRichTextPartPath);
}

export { getAbsoluteRichTextPartPath };
