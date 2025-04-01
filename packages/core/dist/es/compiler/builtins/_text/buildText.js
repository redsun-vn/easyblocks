/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { uniqueId } from '@redsun-vn/easyblocks-utils';
import { getDefaultLocale } from '../../../locales.js';

function buildText(x, editorContext) {
  var defaultLocale = getDefaultLocale(editorContext.locales);
  return {
    id: "locale." + uniqueId(),
    value: _defineProperty({}, defaultLocale.code, x)
  };
}

export { buildText };
