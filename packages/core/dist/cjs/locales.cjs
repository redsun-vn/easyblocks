/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getDefaultLocale(locales) {
  var defaultLocale = locales.find(function (locale) {
    return locale.isDefault;
  });
  if (!defaultLocale) {
    throw new Error("No default locale found");
  }
  return defaultLocale;
}
function getFallbackLocaleForLocale(locale, locales) {
  do {
    var _locales$find$fallbac, _locales$find;
    var fallbackId = (_locales$find$fallbac = (_locales$find = locales.find(function (l) {
      return l.code === locale;
    })) === null || _locales$find === void 0 ? void 0 : _locales$find.fallback) !== null && _locales$find$fallbac !== void 0 ? _locales$find$fallbac : getDefaultLocale(locales).code;

    // Default locale, no fallback
    if (fallbackId === locale) {
      return;
    }
    return fallbackId;
  } while (true);
}
function getFallbackForLocale(translatedValues, locale, locales) {
  while (true) {
    var fallbackLocale = getFallbackLocaleForLocale(locale, locales);
    if (!fallbackLocale) {
      return;
    }
    var fallbackValue = translatedValues[fallbackLocale];
    if (fallbackValue !== undefined && fallbackValue !== null) {
      return fallbackValue;
    }
    locale = fallbackLocale;
  }
}

exports.getDefaultLocale = getDefaultLocale;
exports.getFallbackForLocale = getFallbackForLocale;
exports.getFallbackLocaleForLocale = getFallbackLocaleForLocale;
