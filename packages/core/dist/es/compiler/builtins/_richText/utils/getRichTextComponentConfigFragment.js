/* with love from shopstory */
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { dotNotationGet, dotNotationSet } from '@redsun-vn/easyblocks-utils';
import { duplicateConfig } from '../../../duplicateConfig.js';
import { parseFocusedRichTextPartConfigPath } from './parseRichTextPartConfigPath.js';
import { stripRichTextPartSelection } from './stripRichTextTextPartSelection.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function getRichTextComponentConfigFragment(sourceRichTextComponentConfig, editorContext) {
  var focussedField = editorContext.focussedField,
    form = editorContext.form,
    contextParams = editorContext.contextParams;
  var newRichTextComponentConfig = _objectSpread(_objectSpread({}, sourceRichTextComponentConfig), {}, {
    elements: _defineProperty({}, contextParams.locale, [])
  });
  focussedField.forEach(function (focusedField) {
    var textPartConfig = dotNotationGet(form.values, stripRichTextPartSelection(focusedField));
    var _parseFocusedRichText = parseFocusedRichTextPartConfigPath(focusedField),
      path = _parseFocusedRichText.path,
      range = _parseFocusedRichText.range;
    var newTextPartConfig = duplicateConfig(textPartConfig, editorContext);
    if (range) {
      var _textPartConfig$value;
      newTextPartConfig.value = (_textPartConfig$value = textPartConfig.value).slice.apply(_textPartConfig$value, _toConsumableArray(range));
    }
    var lastParentConfigPath = "elements.".concat(contextParams.locale);
    path.slice(0, -1).forEach(function (pathIndex, index) {
      var currentConfigPath = lastParentConfigPath;
      if (index === 0) {
        currentConfigPath += ".".concat(pathIndex);
      } else {
        var parentConfig = dotNotationGet(newRichTextComponentConfig, lastParentConfigPath);
        currentConfigPath += ".elements.".concat(Math.min(parentConfig.elements.length, pathIndex));
      }
      var currentConfig = dotNotationGet(newRichTextComponentConfig, currentConfigPath);
      if (!currentConfig) {
        var sourceConfigPath = lastParentConfigPath + (index === 0 ? ".".concat(pathIndex) : ".elements.".concat(pathIndex));
        var sourceConfig = dotNotationGet(sourceRichTextComponentConfig, sourceConfigPath);
        var configCopy = _objectSpread(_objectSpread({}, sourceConfig), {}, {
          elements: []
        });
        dotNotationSet(newRichTextComponentConfig, currentConfigPath, configCopy);
      }
      lastParentConfigPath = currentConfigPath;
    });
    var textPartParentConfig = dotNotationGet(newRichTextComponentConfig, lastParentConfigPath);
    dotNotationSet(newRichTextComponentConfig, lastParentConfigPath, _objectSpread(_objectSpread({}, textPartParentConfig), {}, {
      elements: [].concat(_toConsumableArray(textPartParentConfig.elements), [newTextPartConfig])
    }));
  });
  return newRichTextComponentConfig;
}

export { getRichTextComponentConfigFragment };
