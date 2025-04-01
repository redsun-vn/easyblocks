/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var locales = require('../locales.cjs');
var $richTextPart = require('./builtins/_richText/_richTextPart/_richTextPart.cjs');
var compileComponentValues = require('./compileComponentValues.cjs');
var findComponentDefinition = require('./findComponentDefinition.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * Returns the most common value for given `prop` parameter among all @easyblocks/rich-text-part components from `richTextComponentConfig`.
 */
function getMostCommonValueFromRichTextParts(richTextComponentConfig, prop, compilationContext, cache) {
  var _richTextComponentCon;
  var richTextBlockElements = (_richTextComponentCon = richTextComponentConfig.elements[compilationContext.contextParams.locale]) !== null && _richTextComponentCon !== void 0 ? _richTextComponentCon : locales.getFallbackForLocale(richTextComponentConfig.elements, compilationContext.contextParams.locale, compilationContext.locales);
  if (!richTextBlockElements) {
    return;
  }
  var richTextParts = richTextBlockElements.flatMap(function (blockElement) {
    return blockElement.elements.flatMap(function (lineElement) {
      return lineElement.elements;
    });
  });
  var richTextPartComponentDefinition = findComponentDefinition.findComponentDefinitionById($richTextPart.richTextPartEditableComponent.id, compilationContext);
  var deviceIdToRichTextPartValuesGroupedByPropValue = Object.fromEntries(compilationContext.devices.map(function (device) {
    var richTextPartsCompiledPropValues = richTextParts.flatMap(function (richTextPart) {
      return mapRichTextPartToCompiledPropValue(richTextPart, richTextPartComponentDefinition, compilationContext, prop, cache);
    });
    var richTextPartValuesLengthGroupedByPropValue = richTextPartsCompiledPropValues.reduce(function (acc, current) {
      return groupTotalValueLengthByCompiledPropValue(prop, device)(acc, current);
    }, {});
    return [device.id, richTextPartValuesLengthGroupedByPropValue];
  }).filter(function (entry) {
    return Object.keys(entry[1]).length > 0;
  }).map(function (entry) {
    return [entry[0], getCompiledValueFromEntryWithMaxTotalValueLength(entry)];
  }));
  if (Object.keys(deviceIdToRichTextPartValuesGroupedByPropValue).length === 0) {
    return;
  }
  return _objectSpread({
    $res: true
  }, deviceIdToRichTextPartValuesGroupedByPropValue);
}
function getCompiledValueFromEntryWithMaxTotalValueLength(entry) {
  var compiledPropValue = easyblocksUtils.entries(entry[1]).reduce(function (maxEntry, currentEntry) {
    return currentEntry[1] > maxEntry[1] ? currentEntry : maxEntry;
  })[0];
  try {
    return JSON.parse(compiledPropValue);
  } catch (_unused) {
    return compiledPropValue;
  }
}
function groupTotalValueLengthByCompiledPropValue(prop, device) {
  return function (acc, current) {
    var key = JSON.stringify(current[prop][device.id]);
    if (key === undefined) {
      return acc;
    }
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += current.value.length;
    return acc;
  };
}
function mapRichTextPartToCompiledPropValue(richTextPart, richTextPartComponentDefinition, compilationContext, prop, cache) {
  var compiledValues = compileComponentValues.compileComponentValues(richTextPart, richTextPartComponentDefinition, compilationContext, cache);
  return _defineProperty__default["default"]({
    value: richTextPart.value
  }, prop, compiledValues[prop]);
}

exports.getMostCommonValueFromRichTextParts = getMostCommonValueFromRichTextParts;
