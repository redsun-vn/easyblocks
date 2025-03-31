/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var locales = require('../../../locales.cjs');
var uniqueId = require('../../../packages/utils/src/uniqueId.cjs');

function buildText(x, editorContext) {
  const defaultLocale = locales.getDefaultLocale(editorContext.locales);
  return {
    id: "locale." + uniqueId.uniqueId(),
    value: {
      [defaultLocale.code]: x
    }
  };
}

exports.buildText = buildText;
