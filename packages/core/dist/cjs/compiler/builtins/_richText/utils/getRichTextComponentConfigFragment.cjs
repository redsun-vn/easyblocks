/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var duplicateConfig = require('../../../duplicateConfig.cjs');
var parseRichTextPartConfigPath = require('./parseRichTextPartConfigPath.cjs');
var stripRichTextTextPartSelection = require('./stripRichTextTextPartSelection.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function getRichTextComponentConfigFragment(sourceRichTextComponentConfig, editorContext) {
  var focussedField = editorContext.focussedField,
    form = editorContext.form,
    contextParams = editorContext.contextParams;
  var newRichTextComponentConfig = _objectSpread(_objectSpread({}, sourceRichTextComponentConfig), {}, {
    elements: _defineProperty__default["default"]({}, contextParams.locale, [])
  });
  focussedField.forEach(function (focusedField) {
    var textPartConfig = easyblocksUtils.dotNotationGet(form.values, stripRichTextTextPartSelection.stripRichTextPartSelection(focusedField));
    var _parseFocusedRichText = parseRichTextPartConfigPath.parseFocusedRichTextPartConfigPath(focusedField),
      path = _parseFocusedRichText.path,
      range = _parseFocusedRichText.range;
    var newTextPartConfig = duplicateConfig.duplicateConfig(textPartConfig, editorContext);
    if (range) {
      var _textPartConfig$value;
      newTextPartConfig.value = (_textPartConfig$value = textPartConfig.value).slice.apply(_textPartConfig$value, _toConsumableArray__default["default"](range));
    }
    var lastParentConfigPath = "elements.".concat(contextParams.locale);
    path.slice(0, -1).forEach(function (pathIndex, index) {
      var currentConfigPath = lastParentConfigPath;
      if (index === 0) {
        currentConfigPath += ".".concat(pathIndex);
      } else {
        var parentConfig = easyblocksUtils.dotNotationGet(newRichTextComponentConfig, lastParentConfigPath);
        currentConfigPath += ".elements.".concat(Math.min(parentConfig.elements.length, pathIndex));
      }
      var currentConfig = easyblocksUtils.dotNotationGet(newRichTextComponentConfig, currentConfigPath);
      if (!currentConfig) {
        var sourceConfigPath = lastParentConfigPath + (index === 0 ? ".".concat(pathIndex) : ".elements.".concat(pathIndex));
        var sourceConfig = easyblocksUtils.dotNotationGet(sourceRichTextComponentConfig, sourceConfigPath);
        var configCopy = _objectSpread(_objectSpread({}, sourceConfig), {}, {
          elements: []
        });
        easyblocksUtils.dotNotationSet(newRichTextComponentConfig, currentConfigPath, configCopy);
      }
      lastParentConfigPath = currentConfigPath;
    });
    var textPartParentConfig = easyblocksUtils.dotNotationGet(newRichTextComponentConfig, lastParentConfigPath);
    easyblocksUtils.dotNotationSet(newRichTextComponentConfig, lastParentConfigPath, _objectSpread(_objectSpread({}, textPartParentConfig), {}, {
      elements: [].concat(_toConsumableArray__default["default"](textPartParentConfig.elements), [newTextPartConfig])
    }));
  });
  return newRichTextComponentConfig;
}

exports.getRichTextComponentConfigFragment = getRichTextComponentConfigFragment;
