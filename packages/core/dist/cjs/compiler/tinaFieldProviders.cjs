/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function getCommonFieldProps(schemaProp) {
  var label = schemaProp.label || schemaProp.prop;
  var group = schemaProp.group || "Properties";
  return {
    label: label,
    name: schemaProp.prop,
    group: group,
    schemaProp: schemaProp,
    description: schemaProp.description,
    isLabelHidden: schemaProp.isLabelHidden,
    layout: schemaProp.layout,
    params: "params" in schemaProp ? schemaProp.params : undefined
  };
}
var tinaFieldProviders = {
  text: function text(schemaProp, _, value) {
    if (!isValueLocalTextReference(value) && typeof value !== "string") {
      return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
        component: "external"
      });
    }
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "text",
      name: schemaProp.prop,
      normalize: schemaProp.normalize
    });
  },
  number: function number(schemaProp) {
    var _schemaProp$params, _schemaProp$params2;
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "number",
      step: 1,
      min: (_schemaProp$params = schemaProp.params) === null || _schemaProp$params === void 0 ? void 0 : _schemaProp$params.min,
      max: (_schemaProp$params2 = schemaProp.params) === null || _schemaProp$params2 === void 0 ? void 0 : _schemaProp$params2.max
    });
  },
  string: function string(schemaProp) {
    var _schemaProp$params4;
    if (schemaProp.responsive) {
      var _schemaProp$params3;
      return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
        component: "responsive2",
        subComponent: "text",
        normalize: (_schemaProp$params3 = schemaProp.params) === null || _schemaProp$params3 === void 0 ? void 0 : _schemaProp$params3.normalize
      });
    }
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "text",
      normalize: (_schemaProp$params4 = schemaProp.params) === null || _schemaProp$params4 === void 0 ? void 0 : _schemaProp$params4.normalize
    });
  },
  "boolean": function boolean(schemaProp) {
    if (schemaProp.responsive) {
      return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
        component: "responsive2",
        subComponent: "toggle"
      });
    }
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "toggle"
    });
  },
  select: function select(schemaProp) {
    if (schemaProp.responsive) {
      return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
        component: "responsive2",
        subComponent: "select",
        options: schemaProp.params.options
      });
    }
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "select",
      options: schemaProp.params.options
    });
  },
  "radio-group": function radioGroup(schemaProp) {
    if (schemaProp.responsive) {
      return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
        component: "responsive2",
        subComponent: "radio-group",
        options: schemaProp.params.options
      });
    }
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "radio-group",
      options: schemaProp.params.options
    });
  },
  component: function component(schemaProp) {
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "block",
      schemaProp: schemaProp
    });
  },
  "component-collection": function componentCollection() {
    throw new Error("component-collection is not yet supported in sidebar");
  },
  "component-collection-localised": function componentCollectionLocalised() {
    throw new Error("component-collection-localised is not yet supported in sidebar");
  },
  component$$$: function component$$$(schemaProp) {
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "identity",
      schemaProp: schemaProp
    });
  },
  external: function external(schemaProp, editorContext) {
    var externalTypeDefinition = editorContext.types[schemaProp.type];
    if (!externalTypeDefinition) {
      throw new Error("Can't find definition for type \"".concat(schemaProp.type, "\""));
    }
    if (schemaProp.responsive) {
      return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
        component: "responsive2",
        subComponent: "external"
      });
    }
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "external"
    });
  },
  position: function position(schemaProp) {
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
      component: "responsive2",
      subComponent: "position"
    });
  },
  custom: function custom(schemaProp, editorContext, value) {
    var customTypeDefinition = editorContext.types[schemaProp.type];
    if (!customTypeDefinition) {
      throw new Error("Can't find definition for type \"".concat(schemaProp.type, "\""));
    }
    if (customTypeDefinition.type === "external") {
      return tinaFieldProviders.external(schemaProp, editorContext, value);
    }
    if (customTypeDefinition.type === "token") {
      var tokens = easyblocksUtils.assertDefined(editorContext.theme[customTypeDefinition.token], "Missing token values within the Easyblocks config for \"".concat(customTypeDefinition.token, "\""));
      if ("params" in schemaProp && schemaProp.params && "prefix" in schemaProp.params && typeof schemaProp.params.prefix === "string") {
        // Copy tokens to prevent mutating original tokens
        tokens = _objectSpread({}, tokens);
        for (var key in tokens) {
          if (!key.startsWith(schemaProp.params.prefix + ".")) {
            delete tokens[key];
          } else {
            tokens[key] = _objectSpread(_objectSpread({}, tokens[key]), {}, {
              label: key.split("".concat(schemaProp.params.prefix, "."))[1]
            });
          }
        }
      }
      var commonTokenFieldProps = {
        tokens: tokens,
        allowCustom: !!customTypeDefinition.allowCustom,
        extraValues: "params" in schemaProp && schemaProp.params && "extraValues" in schemaProp.params ? schemaProp.params.extraValues : undefined
      };
      if (customTypeDefinition.responsiveness === "never") {
        return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
          component: "token"
        }, commonTokenFieldProps);
      }
      return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), {}, {
        // Token fields are always responsive
        component: "responsive2",
        subComponent: "token"
      }, commonTokenFieldProps);
    }
    return _objectSpread(_objectSpread({}, getCommonFieldProps(schemaProp)), customTypeDefinition.responsiveness === "always" || customTypeDefinition.responsiveness === "optional" && schemaProp.responsive ? {
      component: "responsive2",
      subComponent: "local"
    } : {
      component: "local"
    });
  }
};
function getTinaField(schemaProp, editorContext, value) {
  var fieldProvider = editorContext.types[schemaProp.type] && schemaProp.type !== "text" ? tinaFieldProviders.custom : tinaFieldProviders[schemaProp.type];
  return fieldProvider(schemaProp, editorContext, value);
}
function isValueLocalTextReference(value) {
  if (!(_typeof__default["default"](value) === "object" && value !== null)) {
    return false;
  }
  if (!("id" in value && typeof value.id === "string" && value.id.startsWith("local."))) {
    return false;
  }
  if (!("value" in value)) {
    return false;
  }
  if (!("widgetId" in value && typeof value.widgetId === "string" && value.widgetId === "@easyblocks/local-text")) {
    return false;
  }
  return true;
}

exports.getTinaField = getTinaField;
