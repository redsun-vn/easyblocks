/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var locales = require('../../../locales.cjs');
var configFindAllPaths = require('../../configFindAllPaths.cjs');
var $richText_styles = require('./_richText.styles.cjs');
var $richTextBlockElement = require('./_richTextBlockElement/_richTextBlockElement.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var editing = function editing(_ref) {
  var values = _ref.values,
    params = _ref.params,
    editingInfo = _ref.editingInfo,
    __SECRET_INTERNALS__ = _ref.__SECRET_INTERNALS__;
  if (!__SECRET_INTERNALS__) {
    throw new Error("Missing __SECRET_INTERNALS__");
  }
  var pathPrefix = __SECRET_INTERNALS__.pathPrefix,
    editorContext = __SECRET_INTERNALS__.editorContext;
  var richTextConfig = easyblocksUtils.dotNotationGet(editorContext.form.values, pathPrefix);
  var richTextBlockPaths = configFindAllPaths.configFindAllPaths(richTextConfig, editorContext, function (config) {
    return config._component === "@easyblocks/rich-text-block-element";
  });
  var richTextBlockPath = richTextBlockPaths.length > 0 ? "".concat(pathPrefix, ".").concat(richTextBlockPaths[0]) : undefined;
  var accessibilityRoleFieldIndex = editingInfo.fields.findIndex(function (field) {
    return field.path === "accessibilityRole";
  });
  var fieldsBeforeAccessibilityRole = editingInfo.fields.slice(0, accessibilityRoleFieldIndex).filter(function (field) {
    if (field.path === "align" && params.passedAlign !== undefined) {
      return false;
    }
    return true;
  });
  var fieldsAfterAccessibilityRole = editingInfo.fields.slice(accessibilityRoleFieldIndex).map(function (field) {
    if (!richTextBlockPath) {
      return field;
    }
    var richTextBlockType = easyblocksUtils.dotNotationGet(editorContext.form.values, "".concat(richTextBlockPath, ".type"));
    if (richTextBlockType !== "paragraph") {
      if (field.path === "accessibilityRole") {
        return _objectSpread(_objectSpread({}, field), {}, {
          visible: false
        });
      }
      if (field.path === "isListStyleAuto") {
        return _objectSpread(_objectSpread({}, field), {}, {
          visible: true
        });
      }
      if (!values.isListStyleAuto && (field.path === "mainFont" || field.path === "mainColor")) {
        return _objectSpread(_objectSpread({}, field), {}, {
          visible: true
        });
      }
    }
    return field;
  });
  var richTextPartPaths = configFindAllPaths.configFindAllPaths(richTextConfig, editorContext, function (config) {
    return config._component === "@easyblocks/rich-text-part";
  });
  var currentLocaleRichTextPartPaths = richTextPartPaths.filter(isRichTextPartPathForLocale(editorContext.contextParams.locale));
  if (currentLocaleRichTextPartPaths.length === 0) {
    var fallbackLocale = locales.getFallbackLocaleForLocale(editorContext.contextParams.locale, editorContext.locales);
    if (fallbackLocale) {
      currentLocaleRichTextPartPaths = richTextPartPaths.filter(isRichTextPartPathForLocale(fallbackLocale));
    }
  }
  var richTextPartSources = currentLocaleRichTextPartPaths.map(function (path) {
    return "".concat(pathPrefix, ".").concat(path);
  });
  return {
    fields: [].concat(_toConsumableArray__default["default"](fieldsBeforeAccessibilityRole), [richTextPartSources.length > 0 ? {
      type: "field",
      path: richTextPartSources.map(function (source) {
        return "".concat(source, ".font");
      })
    } : null, richTextPartSources.length > 0 ? {
      type: "field",
      path: richTextPartSources.map(function (source) {
        return "".concat(source, ".color");
      })
    } : null, richTextBlockPath ? {
      type: "field",
      path: "".concat(richTextBlockPath, ".type"),
      label: "List style",
      group: "Text"
    } : null], _toConsumableArray__default["default"](fieldsAfterAccessibilityRole)).filter(easyblocksUtils.nonNullable())
  };
};
var richTextEditableComponent = {
  id: "@easyblocks/rich-text",
  label: "Text",
  thumbnail: "https://shopstory.s3.eu-central-1.amazonaws.com/picker_icon_text.png",
  schema: [{
    prop: "elements",
    type: "component-collection-localised",
    accepts: [$richTextBlockElement.richTextBlockElementEditableComponent.id],
    visible: false
  }, {
    prop: "align",
    label: "Align",
    type: "radio-group",
    responsive: true,
    params: {
      options: [{
        value: "left",
        label: "Left",
        icon: "AlignLeft",
        hideLabel: true
      }, {
        value: "center",
        label: "Center",
        icon: "AlignCenter",
        hideLabel: true
      }, {
        value: "right",
        label: "Right",
        icon: "AlignRight",
        hideLabel: true
      }]
    },
    defaultValue: "left",
    group: "Layout",
    buildOnly: true
  }, {
    prop: "accessibilityRole",
    type: "select",
    label: "Role",
    params: {
      options: [{
        value: "div",
        label: "Paragraph"
      }].concat(_toConsumableArray__default["default"](easyblocksUtils.range(1, 6).map(function (index) {
        return {
          value: "h".concat(index),
          label: "Heading ".concat(index)
        };
      })))
    },
    group: "Accessibility and SEO"
  }, {
    prop: "isListStyleAuto",
    type: "boolean",
    label: "Auto list styles",
    defaultValue: true,
    visible: false,
    group: "Text"
  }, {
    prop: "mainFont",
    type: "font",
    label: "Main font",
    visible: false,
    group: "Text"
  }, {
    prop: "mainColor",
    type: "color",
    label: "Main color",
    visible: false,
    group: "Text"
  }],
  type: "item",
  styles: $richText_styles.richTextStyles,
  editing: editing
};
function isRichTextPartPathForLocale(locale) {
  return function innerIsLocalizedRichTextPart(richTextPartConfigPath) {
    return richTextPartConfigPath.startsWith("elements.".concat(locale));
  };
}

exports.richTextEditableComponent = richTextEditableComponent;
