/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var spacingToPx = require('../spacingToPx.cjs');
var $richText = require('./builtins/_richText/_richText.cjs');
var $richTextBlockElement = require('./builtins/_richText/_richTextBlockElement/_richTextBlockElement.cjs');
var $richTextLineElement = require('./builtins/_richText/_richTextLineElement/_richTextLineElement.cjs');
var $richTextPart = require('./builtins/_richText/_richTextPart/_richTextPart.cjs');
var $text = require('./builtins/_text/_text.cjs');
var devices = require('./devices.cjs');
var themeValueToResponsiveValue = require('./themeValueToResponsiveValue.cjs');
var index = require('./validate-color/index.cjs');
var responsiveValueMap = require('../responsiveness/responsiveValueMap.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var _excluded = ["space"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function normalizeSpace(space) {
  return responsiveValueMap.responsiveValueMap(space, function (val) {
    if (typeof val === "number") {
      return "".concat(val, "px");
    }
    return val;
  });
}
function prepareDevices(configDevices) {
  var devices$1 = []; // let's make devices copy
  devices.DEFAULT_DEVICES.forEach(function (defaultDevice) {
    devices$1.push(_objectSpread({}, defaultDevice));
  });
  if (configDevices) {
    devices$1.forEach(function (device, index) {
      var configDevice = configDevices[device.id];
      if (configDevice) {
        var _configDevice$w, _configDevice$hidden;
        device.w = (_configDevice$w = configDevice.w) !== null && _configDevice$w !== void 0 ? _configDevice$w : device.w;
        device.h = configDevice.h !== undefined ? configDevice.h : device.h;
        device.hidden = (_configDevice$hidden = configDevice.hidden) !== null && _configDevice$hidden !== void 0 ? _configDevice$hidden : device.hidden;
        if (configDevice.startsFrom && index > 0) {
          var previousDevice = devices$1[index - 1];
          previousDevice.breakpoint = configDevice.startsFrom;
        }
      }
    });
  }
  return devices$1;
}
function createCompilationContext(config, contextParams, rootComponentId) {
  var _config$tokens, _config$components;
  var devices = prepareDevices(config.devices);
  var mainDevice = devices.find(function (x) {
    return x.isMain;
  });
  if (!mainDevice) {
    throw new Error("Missing main device in devices config.");
  }
  var _ref = (_config$tokens = config.tokens) !== null && _config$tokens !== void 0 ? _config$tokens : {},
    space = _ref.space,
    customTokens = _objectWithoutProperties__default["default"](_ref, _excluded);
  var theme = {
    space: {}
  };

  // TODO: allow for custom breakpoints!!! What happens with old ones when the new ones show up?

  if (space) {
    space.forEach(function (space) {
      var _space$isDefault;
      var val = space.value;

      // If value is "vw" and is not responsive then we should responsify it.
      // Why? Because responsive token behaves differently from non-responsive in terms of auto.
      // Responsive token automatically "fills" all the breakpoints.
      // If someone does 10vw it is responsive in nature, it's NEVER a scalar.
      if (typeof val === "string" && spacingToPx.parseSpacing(val).unit === "vw") {
        val = _defineProperty__default["default"]({
          $res: true
        }, mainDevice.id, val);
      }
      theme.space[space.id] = {
        value: normalizeSpace(themeValueToResponsiveValue.themeScalarValueToResponsiveValue(val, devices)),
        isDefault: (_space$isDefault = space.isDefault) !== null && _space$isDefault !== void 0 ? _space$isDefault : false,
        label: space.label
      };
    });
  }
  var types = _objectSpread(_objectSpread({}, createCustomTypes(config.types)), createBuiltinTypes());
  var allTypeIds = Object.keys(types);
  Object.entries(customTokens).forEach(function (_ref2) {
    var _ref3 = _slicedToArray__default["default"](_ref2, 2),
      id = _ref3[0],
      tokens = _ref3[1];
    var type = Object.values(types).find(function (type) {
      return type.type === "token" && type.token === id;
    });
    if (!type) {
      throw new Error("Can't find a matching type for a token \"".concat(id, "\" (found in Config.tokens)"));
    }
    theme[id] = Object.fromEntries(tokens.map(function (token) {
      var _token$isDefault;
      if (type.validate) {
        if (type.validate(token.value) !== true) {
          throw new Error("The value for token \"".concat(id, ".").concat(token.id, "\" (").concat(token.value, ") is incorrect. The validation function for its corresponding type must return 'true'. "));
        }
      }
      return [token.id, {
        label: token.label,
        value: token.value,
        isDefault: (_token$isDefault = token.isDefault) !== null && _token$isDefault !== void 0 ? _token$isDefault : false
      }];
    }));
  });
  var components = [$text.textEditableComponent, $richText.richTextEditableComponent, $richTextBlockElement.richTextBlockElementEditableComponent, $richTextLineElement.richTextLineElementEditableComponent, $richTextPart.richTextPartEditableComponent, {
    id: "@easyblocks/missing-component",
    label: "Missing component",
    schema: [{
      prop: "error",
      type: "string",
      visible: false
    }]
  }];
  var rootComponent = ((_config$components = config.components) !== null && _config$components !== void 0 ? _config$components : []).find(function (component) {
    return component.id === rootComponentId;
  });
  if (!rootComponent) {
    throw new Error("createCompilationContext: rootComponentId \"".concat(rootComponentId, "\" doesn't exist in config.components"));
  }
  if (rootComponent.rootParams && rootComponent.rootParams.length > 0) {
    ensureDocumentDataWidgetForExternalTypes(types);
  }
  var builtinTypes = ["string", "number", "boolean", "select", "radio-group", "text", "component", "component-collection", "component-collection-localised", "position"];

  // Validate if components have correct types
  if (config.components) {
    config.components.forEach(function (component) {
      if (component.schema) {
        component.schema.forEach(function (prop) {
          if (builtinTypes.includes(prop.type)) {
            return;
          }
          if (!allTypeIds.includes(prop.type)) {
            throw new Error("The field \"".concat(component.id, ".").concat(prop.prop, "\" has an unrecognized type: \"").concat(prop.type, "\". Custom types can be added in Config.types object"));
          }
        });
      }
    });
  }
  if (config.components) {
    var _config$components2;
    components.push.apply(components, _toConsumableArray__default["default"](((_config$components2 = config.components) !== null && _config$components2 !== void 0 ? _config$components2 : []).map(function (component) {
      // For root component with rootParams we should create special param types and move params to schema props
      if (component.id === rootComponent.id && rootComponent.rootParams) {
        var paramSchemaProps = [];
        rootComponent.rootParams.forEach(function (param) {
          var typeName = "param__" + param.prop;
          types[typeName] = {
            type: "external",
            widgets: param.widgets
          };
          paramSchemaProps.push({
            prop: param.prop,
            label: param.label,
            type: typeName,
            group: "Parameters",
            optional: true
          });
        });
        return _objectSpread(_objectSpread({}, component), {}, {
          schema: [].concat(paramSchemaProps, _toConsumableArray__default["default"](component.schema))
        });
      }
      return component;
    })));
  }
  if (!config.locales) {
    throw new Error("Required property config.locales doesn't exist in your config.");
  }
  if (config.locales.find(function (l) {
    return l.code === contextParams.locale;
  }) === undefined) {
    throw new Error("You passed locale \"".concat(contextParams.locale, "\" which doesn't exist in your config.locales"));
  }
  var compilationContext = {
    devices: devices,
    theme: theme,
    definitions: {
      components: components
    },
    types: types,
    mainBreakpointIndex: mainDevice.id,
    contextParams: contextParams,
    locales: config.locales,
    rootComponent: rootComponent
  };
  return compilationContext;
}
function createCustomTypes(types) {
  if (!types) {
    return {};
  }
  return Object.fromEntries(Object.entries(types).map(function (_ref4) {
    var _definition$responsiv2;
    var _ref5 = _slicedToArray__default["default"](_ref4, 2),
      id = _ref5[0],
      definition = _ref5[1];
    if (definition.type === "external") {
      var _definition$responsiv, _definition$widgets;
      return [id, _objectSpread(_objectSpread({}, definition), {}, {
        responsiveness: (_definition$responsiv = definition.responsiveness) !== null && _definition$responsiv !== void 0 ? _definition$responsiv : "never",
        widgets: (_definition$widgets = definition.widgets) !== null && _definition$widgets !== void 0 ? _definition$widgets : []
      })];
    }
    return [id, _objectSpread(_objectSpread({}, definition), {}, {
      responsiveness: (_definition$responsiv2 = definition.responsiveness) !== null && _definition$responsiv2 !== void 0 ? _definition$responsiv2 : "never"
    })];
  }));
}
function createBuiltinTypes() {
  return {
    space: {
      type: "token",
      responsiveness: "always",
      token: "space",
      defaultValue: {
        value: "0px"
      },
      widget: {
        id: "@easyblocks/space",
        label: "Space"
      },
      allowCustom: true,
      validate: function validate(value) {
        return typeof value === "string" && !!spacingToPx.parseSpacing(value);
      }
    },
    color: {
      type: "token",
      responsiveness: "always",
      token: "colors",
      defaultValue: {
        value: "#000000"
      },
      widget: {
        id: "@easyblocks/color",
        label: "Color"
      },
      allowCustom: true,
      validate: function validate(value) {
        return typeof value === "string" && index.validateColor(value);
      }
    },
    font: {
      type: "token",
      token: "fonts",
      responsiveness: "always",
      defaultValue: {
        value: {
          fontFamily: "sans-serif",
          fontSize: "16px"
        }
      }
    },
    aspectRatio: {
      type: "token",
      token: "aspectRatios",
      responsiveness: "always",
      widget: {
        id: "@easyblocks/aspectRatio",
        label: "Aspect ratio"
      },
      defaultValue: {
        value: "1:1"
      },
      allowCustom: true,
      validate: function validate(value) {
        return typeof value === "string" && (!!value.match(/[0-9]+:[0-9]+/) || value === "natural");
      }
    },
    boxShadow: {
      type: "token",
      token: "boxShadows",
      responsiveness: "always",
      defaultValue: {
        value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      }
    },
    icon: {
      type: "token",
      responsiveness: "never",
      token: "icons",
      defaultValue: {
        value: "<svg viewBox=\"0 -960 960 960\"><path fill=\"currentColor\" d=\"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z\"/></svg>"
      },
      widget: {
        id: "@easyblocks/icon",
        label: "Icon"
      },
      allowCustom: true,
      validate: function validate(value) {
        return typeof value === "string" && value.trim().startsWith("<svg");
      }
    },
    text: {
      type: "external",
      widgets: []
    }
  };
}
function ensureDocumentDataWidgetForExternalTypes(types) {
  var externalTypesNames = new Set(_toConsumableArray__default["default"](Object.keys(types).filter(function (t) {
    return types[t].type === "external";
  })));
  externalTypesNames.forEach(function (externalTypeName) {
    var externalTypeDefinition = types[externalTypeName];
    if (!externalTypeDefinition.widgets) {
      externalTypeDefinition.widgets = [];
    }
    var hasDocumentDataWidget = externalTypeDefinition.widgets.some(function (w) {
      return w.id === "@easyblocks/document-data";
    });
    if (!hasDocumentDataWidget) {
      externalTypeDefinition.widgets.push({
        id: "@easyblocks/document-data",
        label: "Document data"
      });
    }
  });
}

exports.createCompilationContext = createCompilationContext;
