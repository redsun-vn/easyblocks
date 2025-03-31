/* with love from shopstory */
import { getDefaultLocale } from '../../../locales.js';
import { uniqueId } from '../../../packages/utils/src/uniqueId.js';

function buildText(x, editorContext) {
  const defaultLocale = getDefaultLocale(editorContext.locales);
  return {
    id: "locale." + uniqueId(),
    value: {
      [defaultLocale.code]: x
    }
  };
}

export { buildText };
