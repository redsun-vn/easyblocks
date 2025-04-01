/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * This is a copy of validate-color function from validate-color npm package. This package has problem with bundling, so I copied it here. It was modified 100 years ago anyway and had 32 stars, so nothing fancy really.
 */

// Good article on HTML Colors:
// https://dev.to/alvaromontoro/the-ultimate-guide-to-css-colors-2020-edition-1bh1#hsl

// Check if parameter is defined and a string
var isString = function isString(color) {
  return color && typeof color === "string";
};
// All existing HTML color names
var htmlColorNames = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenrod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "Goldenrod", "Gray", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenrodYellow", "LightGray", "LightGreen", "LightPink", "LightSalmon", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquamarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenrod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
// These 3 values are valid, usable color names, which are special in their own way
var htmlColorNamesSpecial = ["currentColor", "inherit", "transparent"];

// Validate HTML color name (red, yellow, etc)
var validateHTMLColorName = function validateHTMLColorName(color) {
  var status = false;
  if (isString(color)) {
    htmlColorNames.map(function (c) {
      if (color.toLowerCase() === c.toLowerCase()) {
        status = true;
      }
      return null;
    });
  }
  return status;
};

// Validate HTML color special name (currentColor, inherit, etc)
var validateHTMLColorSpecialName = function validateHTMLColorSpecialName(color) {
  var status = false;
  if (isString(color)) {
    htmlColorNamesSpecial.map(function (c) {
      if (color.toLowerCase() === c.toLowerCase()) {
        status = true;
      }
      return null;
    });
  }
  return status;
};

// Validate HTML color 'hex'
var validateHTMLColorHex = function validateHTMLColorHex(color) {
  if (isString(color)) {
    var regex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$/i;
    return !!color && regex.test(color);
  }
  return false;
};

// Validate HTML color 'rgb'
// -- legacy notation
// color: rgb(255, 255, 255);
// color: rgba(255, 255, 255, 1);
// -- new notation
// color: rgb(255 255 255);
// color: rgb(255 255 255 / 1);
// Note that 'rgba()' is now merged into 'rgb()'
var validateHTMLColorRgb = function validateHTMLColorRgb(color) {
  if (isString(color)) {
    var regex = /(rgb)a?\((\s*\d+%?\s*?,?\s*){2}(\s*\d+%?\s*?,?\s*\)?)(\s*,?\s*\/?\s*(0?\.?\d+%?\s*)?|1|0)?\)$/i;
    return !!color && regex.test(color);
  }
  return false;
};
var optionalCommaOrRequiredSpace = "((\\s*,\\s*)|(\\s+))";
var optionalDecimals = "(\\.\\d+)?";
var anyPercentage = "((\\d*".concat(optionalDecimals, ")%)");
var hundredPercent = "(([0-9]|[1-9][0-9]|100)%)";
var alphaPercentage = "(((".concat(hundredPercent, "))|(0?").concat(optionalDecimals, ")|1))?");
var endingWithAlphaPercentage = "\\s*?\\)?)(\\s*?(\\/?)\\s+".concat(alphaPercentage, "\\s*?\\)$");

// Validate HTML color 'hsl'
// -- These units are valid for the first parameter
// 'deg': degrees | full circle = 360
// 'gra': gradians | full circle = 400
// 'radians': radians | full circle = 2π (approx. 6.28)
// 'turn': turns | full circle = 1
var validateHTMLColorHsl = function validateHTMLColorHsl(color) {
  if (isString(color)) {
    // Validate each possible unit value separately, as their values differ
    var degRegex = "(-?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-5][0-9]|360)(deg)?)";
    var graRegex = "(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-9][0-9]|400)gra)";
    var radRegex = "((([0-5])?\\.\\d+|6\\.([0-9]|1[0-9]|2[0-8])|[0-6])rad)";
    var turnRegex = "((0?".concat(optionalDecimals, "|1)turn)");
    var regexLogic = "(hsl)a?\\((\\s*?(".concat(degRegex, "|").concat(graRegex, "|").concat(radRegex, "|").concat(turnRegex, ")").concat(optionalCommaOrRequiredSpace, ")(\\s*?(0|").concat(hundredPercent, ")").concat(optionalCommaOrRequiredSpace, ")(\\s*?(0|").concat(hundredPercent, ")\\s*?\\)?)(\\s*?(\\/?|,?)\\s*?(((").concat(hundredPercent, "))|(0?").concat(optionalDecimals, ")|1))?\\)$");
    var regex = new RegExp(regexLogic);
    return !!color && regex.test(color);
  }
  return false;
};

// Validate HTML color 'hwb'
// -- 'hwb' accepts 'deg' as unit in its 1st property, which stands for 'hue'
// 'deg': degrees | full circle = 360
var validateHTMLColorHwb = function validateHTMLColorHwb(color) {
  if (isString(color)) {
    var degRegex = "(-?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-5][0-9]|360)(deg)?)";
    var regexLogic = "(hwb\\(\\s*?".concat(degRegex, "\\s+)((0|").concat(hundredPercent, ")\\s+)((0|").concat(hundredPercent, ")").concat(endingWithAlphaPercentage);
    var regex = new RegExp(regexLogic);
    return !!color && regex.test(color);
  }
  return false;
};

// Validate HTML color 'lab'
// -- 'lab' 2nd & 3rd parameters are any number between -160 & 160
var validateHTMLColorLab = function validateHTMLColorLab(color) {
  if (isString(color)) {
    var labParam = "(-?(([0-9]|[1-9][0-9]|1[0-5][0-9])".concat(optionalDecimals, "?|160))");
    var regexLogic = "(lab\\(\\s*?".concat(anyPercentage, "\\s+").concat(labParam, "\\s+").concat(labParam).concat(endingWithAlphaPercentage);
    var regex = new RegExp(regexLogic);
    return !!color && regex.test(color);
  }
  return false;
};
var validateColor = function validateColor(color) {
  // Former validation - source: https://www.regextester.com/103656
  // if (isString(color)) {
  //   const regex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1|0)?\)$/i;
  //   return color && regex.test(color);
  // }
  // New validation
  if (color && validateHTMLColorHex(color) || validateHTMLColorName(color) || validateHTMLColorSpecialName(color) || validateHTMLColorRgb(color) || validateHTMLColorHsl(color) || validateHTMLColorHwb(color) || validateHTMLColorLab(color)) {
    return true;
  }
  return false;
};

exports.validateColor = validateColor;
exports.validateHTMLColorHex = validateHTMLColorHex;
exports.validateHTMLColorHsl = validateHTMLColorHsl;
exports.validateHTMLColorHwb = validateHTMLColorHwb;
exports.validateHTMLColorLab = validateHTMLColorLab;
exports.validateHTMLColorName = validateHTMLColorName;
exports.validateHTMLColorRgb = validateHTMLColorRgb;
exports.validateHTMLColorSpecialName = validateHTMLColorSpecialName;
