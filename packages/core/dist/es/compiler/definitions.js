/* with love from shopstory */
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _typeof from '@babel/runtime/helpers/typeof';
import { uniqueId } from '@redsun-vn/easyblocks-utils';
import { getFallbackLocaleForLocale, getFallbackForLocale } from '../locales.js';
import { buildRichTextNoCodeEntry } from './builtins/_richText/builders.js';
import { compileComponent } from './compileComponent.js';
import { getDevicesWidths } from './devices.js';
import { findComponentDefinitionById, findComponentDefinitionsByType } from './findComponentDefinition.js';
import { responsiveValueFlatten } from '../responsiveness/responsiveValueFlatten.js';
import { isLocalValue } from '../checkers.js';
import { isTrulyResponsiveValue } from '../responsiveness/isTrulyResponsiveValue.js';
import { responsiveValueAt } from '../responsiveness/responsiveValueAt.js';
import { responsiveValueMap } from '../responsiveness/responsiveValueMap.js';
import { responsiveValueFill } from '../responsiveness/responsiveValueFill.js';

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var textProvider = function textProvider(schemaProp, compilationContext) {
  var checkIfValid = function checkIfValid(x) {
    if (_typeof(x) !== "object" || x === null) {
      return false;
    }
    if (typeof x.id === "string") {
      if (x.id.startsWith("local.")) {
        // for local values "value" must be object
        if (_typeof(x.value) !== "object" || x.value === null) {
          return false;
        }
      }
    }
    return true;
  };
  return {
    normalize: function normalize(x) {
      if (x === undefined || x === null) {
        var _schemaProp$defaultVa;
        return {
          id: "local." + uniqueId(),
          value: _defineProperty({}, compilationContext.contextParams.locale, (_schemaProp$defaultVa = schemaProp.defaultValue) !== null && _schemaProp$defaultVa !== void 0 ? _schemaProp$defaultVa : "Lorem ipsum"),
          widgetId: "@easyblocks/local-text"
        };
      }
      if (checkIfValid(x)) {
        return x;
      }
      throw new Error("incorrect text type: ".concat(x));
    },
    compile: function compile(x) {
      if ("value" in x) {
        var value = x.value[compilationContext.contextParams.locale];

        // Let's apply fallback
        if (typeof value !== "string") {
          var _getFallbackForLocale;
          var fallbackValue = (_getFallbackForLocale = getFallbackForLocale(x.value, compilationContext.contextParams.locale, compilationContext.locales)) !== null && _getFallbackForLocale !== void 0 ? _getFallbackForLocale : "";
          return {
            id: x.id,
            value: fallbackValue,
            widgetId: "@easyblocks/local-text"
          };
        }
        return {
          id: x.id,
          value: value,
          widgetId: "@easyblocks/local-text"
        };
      }
      return _objectSpread({
        id: x.id,
        widgetId: x.widgetId
      }, x.id !== null && {
        key: x.key
      });
    },
    getHash: function getHash(value) {
      var _value$id;
      // TODO: those conditions will be removed after we merge external-local texts update
      if (typeof value === "string") {
        return value;
      }
      if (value === null) {
        return undefined;
      }
      return (_value$id = value.id) !== null && _value$id !== void 0 ? _value$id : undefined;
    }
  };
};
var schemaPropDefinitions = {
  text: textProvider,
  number: function number(schemaProp, compilationContext) {
    var normalize = getNormalize(compilationContext, schemaProp.defaultValue, 0, function (x) {
      return typeof x === "number" ? x : undefined;
    });
    return {
      normalize: normalize,
      compile: function compile(x) {
        return x;
      },
      getHash: function getHash(value) {
        return value.toString();
      }
    };
  },
  string: function string(schemaProp, compilationContext) {
    var normalize = schemaProp.responsive ? getResponsiveNormalize(compilationContext, schemaProp.defaultValue, "", function (x) {
      return typeof x === "string" ? x : undefined;
    }) : getNormalize(compilationContext, schemaProp.defaultValue, "", function (x) {
      return typeof x === "string" ? x : undefined;
    });
    return {
      normalize: normalize,
      compile: function compile(x) {
        return x;
      },
      getHash: function getHash(value, breakpointIndex) {
        if (isTrulyResponsiveValue(value)) {
          return responsiveValueAt(value, breakpointIndex);
        }
        return value;
      }
    };
  },
  "boolean": function boolean(schemaProp, compilationContext) {
    var normalize = schemaProp.responsive ? getResponsiveNormalize(compilationContext, schemaProp.defaultValue, false, function (x) {
      return typeof x === "boolean" ? x : undefined;
    }) : getNormalize(compilationContext, schemaProp.defaultValue, false, function (x) {
      return typeof x === "boolean" ? x : undefined;
    });
    return {
      normalize: normalize,
      compile: function compile(x) {
        return x;
      },
      getHash: function getHash(value, breakpointIndex) {
        if (isTrulyResponsiveValue(value)) {
          var breakpointValue = responsiveValueAt(value, breakpointIndex);
          return breakpointValue === null || breakpointValue === void 0 ? void 0 : breakpointValue.toString();
        }
        return value.toString();
      }
    };
  },
  select: getSelectSchemaPropDefinition(),
  "radio-group": getSelectSchemaPropDefinition(),
  component: function component(schemaProp, compilationContext) {
    // Here:
    // 1. if non-fixed => block field.
    // 2. if fixed => block field with "fixed" flag (no component picker).
    var normalize = function normalize(x) {
      if (!Array.isArray(x) || x.length === 0) {
        var componentDefinition;
        var _iterator = _createForOfIteratorHelper(schemaProp.accepts),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var componentIdOrType = _step.value;
            componentDefinition = findComponentDefinitionById(componentIdOrType, compilationContext);
            if (!componentDefinition) {
              var componentDefinitionsByType = findComponentDefinitionsByType(componentIdOrType, compilationContext);
              if (componentDefinitionsByType.length > 0) {
                componentDefinition = componentDefinitionsByType[0];
                break;
              }
            } else {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (schemaProp.required) {
          if (!componentDefinition) {
            throw new Error("Missing component definition for prop \"".concat(schemaProp.prop, "\" for specified accepted types: [").concat(schemaProp.accepts.join(", "), "]"));
          }
          return [normalizeComponent({
            _component: componentDefinition.id
          }, compilationContext)];
        }
        return [];
      }
      return [normalizeComponent(x[0], compilationContext)];
    };
    return {
      normalize: normalize,
      compile: function compile(arg, contextProps, serializedDefinitions, editingInfoComponent, configPrefix, cache) {
        if (arg.length === 0) {
          return [];
        }

        // FIXME: ?????
        var _compileComponent = compileComponent(arg[0], compilationContext, contextProps, serializedDefinitions || {
            components: []
          }, cache, editingInfoComponent, "".concat(configPrefix, ".0")),
          configAfterAuto = _compileComponent.configAfterAuto,
          compiledComponentConfig = _compileComponent.compiledComponentConfig;
        return [{
          configAfterAuto: configAfterAuto,
          compiledComponentConfig: compiledComponentConfig
        }];
      },
      getHash: function getHash(value) {
        if (value.length > 0) {
          return value[0]._component;
        }
        return "__BLOCK_EMPTY__";
      }
    };
  },
  "component-collection": function componentCollection(_, compilationContext) {
    var normalize = function normalize(x) {
      if (!Array.isArray(x)) {
        return [];
      }
      var ret = (x || []).map(function (item) {
        return normalizeComponent(item, compilationContext);
      });
      return ret;
    };
    return {
      normalize: normalize,
      compile: function compile(arr, contextProps, serializedDefinitions, editingInfoComponents, configPrefix, cache) {
        return arr.map(function (componentConfig, index) {
          var _items;
          return compileComponent(componentConfig, compilationContext, (contextProps.itemProps || [])[index] || {}, serializedDefinitions, cache, editingInfoComponents === null || editingInfoComponents === void 0 || (_items = editingInfoComponents.items) === null || _items === void 0 ? void 0 : _items[index], "".concat(configPrefix, ".").concat(index));
        });
      },
      getHash: function getHash(value) {
        return value.map(function (v) {
          return v._component;
        }).join(";");
      }
    };
  },
  "component-collection-localised": function componentCollectionLocalised(schemaProp, compilationContext) {
    var collectionSchemaPropDefinition = schemaPropDefinitions["component-collection"](_objectSpread(_objectSpread({}, schemaProp), {}, {
      type: "component-collection"
    }), compilationContext);
    return {
      normalize: function normalize(x) {
        if (x === undefined) {
          return {};
        }
        var normalized = {};
        for (var _locale in x) {
          if (_locale === "__fallback") {
            continue;
          }
          normalized[_locale] = collectionSchemaPropDefinition.normalize(x[_locale]);
        }
        return normalized;
      },
      compile: function compile(value, contextProps, serializedDefinitions, editingInfoComponents, configPrefix, cache) {
        var _resolvedLocalisedVal, _resolvedLocalisedVal2;
        var resolvedLocalisedValue = resolveLocalisedValue(value, compilationContext);
        return collectionSchemaPropDefinition.compile((_resolvedLocalisedVal = resolvedLocalisedValue === null || resolvedLocalisedValue === void 0 ? void 0 : resolvedLocalisedValue.value) !== null && _resolvedLocalisedVal !== void 0 ? _resolvedLocalisedVal : [], contextProps, serializedDefinitions, editingInfoComponents, "".concat(configPrefix, ".").concat((_resolvedLocalisedVal2 = resolvedLocalisedValue === null || resolvedLocalisedValue === void 0 ? void 0 : resolvedLocalisedValue.locale) !== null && _resolvedLocalisedVal2 !== void 0 ? _resolvedLocalisedVal2 : compilationContext.contextParams.locale), cache);
      },
      getHash: function getHash(value, breakpoint, devices) {
        var _value$compilationCon;
        return collectionSchemaPropDefinition.getHash((_value$compilationCon = value[compilationContext.contextParams.locale]) !== null && _value$compilationCon !== void 0 ? _value$compilationCon : [], breakpoint, devices);
      }
    };
  },
  component$$$: function component$$$() {
    return {
      normalize: function normalize(x) {
        return x;
      },
      compile: function compile(x) {
        return x;
      },
      getHash: function getHash(x) {
        return x._component;
      }
    };
  },
  // external: (schemaProp, compilationContext) => {
  //   if (schemaProp.responsive) {
  //     const defaultValue: ExternalReferenceEmpty = {
  //       id: null,
  //       widgetId: compilationContext.isEditing
  //         ? compilationContext.types[schemaProp.type]?.widgets[0]?.id
  //         : "",
  //     };

  //     const normalize = getResponsiveNormalize<ExternalReference>(
  //       compilationContext,
  //       defaultValue,
  //       defaultValue,
  //       externalNormalize(schemaProp.type)
  //     );

  //     return {
  //       normalize,
  //       compile: (x) => x,
  //       getHash: externalReferenceGetHash,
  //     };
  //   }

  //   return {
  //     normalize: (value) => {
  //       const normalized = externalNormalize(schemaProp.type)(
  //         value,
  //         compilationContext
  //       );

  //       if (!normalized) {
  //         return {
  //           id: null,
  //           widgetId: compilationContext.types[schemaProp.type]?.widgets[0]?.id,
  //         };
  //       }

  //       return normalized;
  //     },
  //     compile: (value) => {
  //       return value;
  //     },
  //     getHash: (value) => {
  //       if (value.id === null) {
  //         return `${schemaProp.type}.${value.widgetId}`;
  //       }

  //       return `${schemaProp.type}.${value.widgetId}.${value.id}`;
  //     },
  //   };
  // },
  position: function position(schemaProp, compilationContext) {
    return {
      normalize: getResponsiveNormalize(compilationContext, schemaProp.defaultValue, "top-left", function (x) {
        return typeof x === "string" ? x : "top-left";
      }),
      compile: function compile(x) {
        return x;
      },
      getHash: function getHash(value, currentBreakpoint) {
        if (isTrulyResponsiveValue(value)) {
          var breakpointValue = responsiveValueAt(value, currentBreakpoint);
          return breakpointValue === null || breakpointValue === void 0 ? void 0 : breakpointValue.toString();
        }
        return value;
      }
    };
  },
  custom: function custom(schemaProp, compilationContext) {
    var customTypeDefinition = compilationContext.types[schemaProp.type];
    return {
      normalize: function normalize(value) {
        if (customTypeDefinition.type === "inline") {
          var _schemaProp$defaultVa2;
          var defaultValue = (_schemaProp$defaultVa2 = schemaProp.defaultValue) !== null && _schemaProp$defaultVa2 !== void 0 ? _schemaProp$defaultVa2 : customTypeDefinition.defaultValue;
          var normalizeScalar = function normalizeScalar(v) {
            if (isLocalValue(v)) {
              var _v$value;
              if (customTypeDefinition.validate) {
                var isValueValid = customTypeDefinition.validate(v.value);
                if (isValueValid) {
                  return v;
                }
                return {
                  value: defaultValue,
                  widgetId: v.widgetId
                };
              }
              return {
                value: (_v$value = v.value) !== null && _v$value !== void 0 ? _v$value : defaultValue,
                widgetId: v.widgetId
              };
            }
            return {
              value: v !== null && v !== void 0 ? v : defaultValue,
              widgetId: customTypeDefinition.widget.id
            };
          };
          if (customTypeDefinition.responsiveness === "optional" && schemaProp.responsive || customTypeDefinition.responsiveness === "always") {
            var normalize = getResponsiveNormalize(compilationContext, defaultValue, defaultValue, normalizeScalar);
            return normalize(value);
          }
          if (customTypeDefinition.responsiveness === "never" && schemaProp.responsive) {
            console.warn("Custom type \"".concat(schemaProp.type, "\" is marked as \"never\" responsive, but schema prop is marked as responsive. This is not supported and the value for this field is going to stay not responsive. Please change custom type definition or schema prop definition."));
          }
          var result = normalizeScalar(value);
          if (result) {
            return result;
          }
          var defaultLocalValue = {
            value: defaultValue,
            widgetId: customTypeDefinition.widget.id
          };
          return defaultLocalValue;
        }
        if (customTypeDefinition.type === "token") {
          var _customTypeDefinition;
          var themeValues = compilationContext.theme[customTypeDefinition.token];
          var defaultThemeValueEntry = Object.entries(themeValues).find(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              v = _ref2[1];
            return v.isDefault;
          });
          var _defaultValue = function () {
            if (schemaProp.defaultValue) {
              return schemaProp.defaultValue;
            } else if (defaultThemeValueEntry) {
              return {
                tokenId: defaultThemeValueEntry[0]
              };
            } else {
              return customTypeDefinition.defaultValue;
            }
          }();
          var defaultWidgetId = (_customTypeDefinition = customTypeDefinition.widget) === null || _customTypeDefinition === void 0 ? void 0 : _customTypeDefinition.id;
          var createTokenNormalizer = function createTokenNormalizer(normalizeScalar) {
            return customTypeDefinition.responsiveness === "always" || customTypeDefinition.responsiveness === "optional" && schemaProp.responsive ? getResponsiveNormalize(compilationContext, schemaProp.defaultValue, customTypeDefinition.defaultValue, function (x) {
              return normalizeTokenValue(x, themeValues, _defaultValue, defaultWidgetId, normalizeScalar !== null && normalizeScalar !== void 0 ? normalizeScalar : function (x) {
                return x;
              });
            }) : getNormalize(compilationContext, schemaProp.defaultValue, customTypeDefinition.defaultValue, function (x) {
              return normalizeTokenValue(x, themeValues, _defaultValue, defaultWidgetId, normalizeScalar !== null && normalizeScalar !== void 0 ? normalizeScalar : function (x) {
                return x;
              });
            });
          };
          if (customTypeDefinition.token === "space") {
            var normalizeSpace = createTokenNormalizer(function (x) {
              var _customTypeDefinition2, _customTypeDefinition3;
              if (typeof x === "number") {
                return "".concat(x, "px");
              }
              var isValidSpacing = (_customTypeDefinition2 = (_customTypeDefinition3 = customTypeDefinition.validate) === null || _customTypeDefinition3 === void 0 ? void 0 : _customTypeDefinition3.call(customTypeDefinition, x)) !== null && _customTypeDefinition2 !== void 0 ? _customTypeDefinition2 : true;
              if (!isValidSpacing) {
                return;
              }
              return x;
            });
            return normalizeSpace(value);
          }
          if (customTypeDefinition.token === "icons") {
            var _normalizeTokenValue, _normalizeTokenValue2;
            var scalarValueNormalize = function scalarValueNormalize(x) {
              if (typeof x === "string" && x.trim().startsWith("<svg")) {
                return x;
              }
              return;
            };
            var iconDefaultValue = (_normalizeTokenValue = normalizeTokenValue(schemaProp.defaultValue, themeValues, customTypeDefinition.defaultValue, defaultWidgetId, scalarValueNormalize)) !== null && _normalizeTokenValue !== void 0 ? _normalizeTokenValue : customTypeDefinition.defaultValue;
            return (_normalizeTokenValue2 = normalizeTokenValue(value, themeValues, iconDefaultValue, defaultWidgetId, scalarValueNormalize)) !== null && _normalizeTokenValue2 !== void 0 ? _normalizeTokenValue2 : value;
          }
          var defaultTokenNormalizer = createTokenNormalizer();
          return defaultTokenNormalizer(value);
        }
        if (customTypeDefinition.type === "external") {
          if (schemaProp.responsive) {
            var _customTypeDefinition4;
            var _defaultValue2 = {
              id: null,
              widgetId: compilationContext.isEditing ? (_customTypeDefinition4 = customTypeDefinition.widgets[0]) === null || _customTypeDefinition4 === void 0 ? void 0 : _customTypeDefinition4.id : ""
            };
            var _normalize = getResponsiveNormalize(compilationContext, _defaultValue2, _defaultValue2, externalNormalize(schemaProp.type));
            return _normalize(value);
          }
          var normalized = externalNormalize(schemaProp.type)(value, compilationContext);
          if (!normalized) {
            var _customTypeDefinition5;
            return {
              id: null,
              widgetId: (_customTypeDefinition5 = customTypeDefinition.widgets[0]) === null || _customTypeDefinition5 === void 0 ? void 0 : _customTypeDefinition5.id
            };
          }
          return normalized;
        }
        throw new Error("Unknown type definition");
      },
      compile: function compile(x) {
        var val = responsiveValueMap(x, function (y) {
          if ("value" in y) {
            return y.value;
          }
          return y;
        });
        var flattened = responsiveValueFlatten(val, compilationContext.devices);
        return responsiveValueFill(flattened, compilationContext.devices, getDevicesWidths(compilationContext.devices));
      },
      getHash: function getHash(value, breakpointIndex) {
        function getTokenValue(value) {
          if (value.tokenId) {
            return value.tokenId;
          }
          if (_typeof(value.value) === "object") {
            return JSON.stringify(value.value);
          }
          var scalarVal = value.value;
          if (scalarVal.toString) {
            return scalarVal.toString();
          }
          throw new Error("unreachable");
        }
        if (customTypeDefinition.type === "external") {
          return externalReferenceGetHash(value, breakpointIndex);
        }
        if (isTrulyResponsiveValue(value)) {
          var breakpointValue = responsiveValueAt(value, breakpointIndex);
          if (!breakpointValue) {
            return;
          }
          if ("tokenId" in breakpointValue) {
            return getTokenValue(breakpointValue);
          }
          return _typeof(breakpointValue.value) === "object" ? JSON.stringify(breakpointValue.value) : breakpointValue.value;
        }
        if ("tokenId" in value) {
          return getTokenValue(value);
        }
        return _typeof(value.value) === "object" ? JSON.stringify(value.value) : value.value;
      }
    };
  }
};
function getNormalize(compilationContext, defaultValue, fallbackDefaultValue) {
  var normalize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (x) {
    return x;
  };
  return function (val) {
    var normalizedVal = normalize(val, compilationContext);
    if (normalizedVal !== undefined) {
      return normalizedVal;
    }
    var normalizedDefaultVal = normalize(defaultValue, compilationContext);
    if (normalizedDefaultVal !== undefined) {
      return normalizedDefaultVal;
    }
    return normalize(fallbackDefaultValue, compilationContext);
  };
}
function getResponsiveNormalize(compilationContext, defaultValue, fallbackDefaultValue) {
  var normalize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (x) {
    return x;
  };
  if (isTrulyResponsiveValue(defaultValue)) {
    /**
     * Here we must decide how this behaves. It's not obvious. If default is responsive, we cannot easily use default breakpoints.
     * It's because auto might be different. Changing one breakpoint changes "context" for others.
     */
    throw new Error("default responsive values not yet supported");
  }
  return function (val) {
    var scalarNormalize = getNormalize(compilationContext, defaultValue, fallbackDefaultValue, normalize);

    // if value is not really responsive
    if (!isTrulyResponsiveValue(val)) {
      return _defineProperty({
        $res: true
      }, compilationContext.mainBreakpointIndex, scalarNormalize(val));
    }
    var responsiveVal = responsiveValueMap(val, function (x) {
      return normalize(x, compilationContext);
    });

    // main breakpoint always set
    if (responsiveVal[compilationContext.mainBreakpointIndex] === undefined) {
      responsiveVal[compilationContext.mainBreakpointIndex] = scalarNormalize(undefined);
    }
    return responsiveVal;
  };
}
function getSelectSchemaPropDefinition() {
  return function (schemaProp, compilationContext) {
    return {
      normalize: schemaProp.responsive ? getResponsiveNormalize(compilationContext, schemaProp.defaultValue, getFirstOptionValue(schemaProp), function (x) {
        return isSelectValueCorrect(x, schemaProp.params.options) ? x : undefined;
      }) : getNormalize(compilationContext, schemaProp.defaultValue, getFirstOptionValue(schemaProp), function (x) {
        return isSelectValueCorrect(x, schemaProp.params.options) ? x : undefined;
      }),
      compile: function compile(x) {
        return x;
      },
      getHash: function getHash(value, currentBreakpoint) {
        if (isTrulyResponsiveValue(value)) {
          var breakpointValue = responsiveValueAt(value, currentBreakpoint);
          return breakpointValue === null || breakpointValue === void 0 ? void 0 : breakpointValue.toString();
        }
        return value;
      }
    };
  };
}
function isSelectValueCorrect(value, options) {
  if (typeof value !== "string") {
    return false;
  }
  return options.map(getSelectValue).indexOf(value) > -1;
}
function getSelectValue(arg) {
  if (typeof arg === "string") {
    return arg;
  }
  return arg.value;
}
function getFirstOptionValue(schemaProp) {
  if (schemaProp.params.options.length === 0) {
    throw new Error("Select field can't have 0 options");
  }
  var firstOption = schemaProp.params.options[0];
  var firstOptionValue = _typeof(firstOption) === "object" ? firstOption.value : firstOption;
  return firstOptionValue;
}
function normalizeTokenValue(x, themeValues, defaultValue, defaultWidgetId) {
  var _input$widgetId;
  var scalarValueNormalize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (x) {
    return undefined;
  };
  var input = x !== null && x !== void 0 ? x : defaultValue;
  var widgetId = (_input$widgetId = input.widgetId) !== null && _input$widgetId !== void 0 ? _input$widgetId : defaultWidgetId;

  // if (typeof input !== "object" && "value" in defaultValue) {
  //   const normalizedVal = scalarValueNormalize(defaultValue.value);

  //   if (normalizedVal !== undefined) {
  //     return {
  //       value: normalizedVal,
  //       widgetId,
  //     };
  //   }

  //   return;
  // }

  var hasTokenId = "tokenId" in input && typeof input.tokenId === "string";
  if (hasTokenId) {
    var val = themeValues[input.tokenId];
    if (val !== undefined) {
      return {
        value: val.value,
        tokenId: input.tokenId,
        widgetId: widgetId
      };
    }
  }
  if ("value" in input) {
    var normalizedVal = scalarValueNormalize(input.value);
    if (normalizedVal !== undefined) {
      return {
        tokenId: hasTokenId ? input.tokenId : undefined,
        value: normalizedVal,
        widgetId: widgetId
      };
    }
  }
  return;
}
function externalNormalize(externalType) {
  return function (x, compilationContext) {
    if (_typeof(x) === "object" && x !== null) {
      var _compilationContext$t;
      if ("id" in x && x.id !== null) {
        var _normalized = {
          id: x.id,
          widgetId: x.widgetId,
          key: x.key
        };
        return _normalized;
      }
      var normalized = {
        id: null,
        widgetId: typeof x.widgetId === "string" ? x.widgetId : (_compilationContext$t = compilationContext.types[externalType]) === null || _compilationContext$t === void 0 || (_compilationContext$t = _compilationContext$t.widgets[0]) === null || _compilationContext$t === void 0 ? void 0 : _compilationContext$t.id
      };
      return normalized;
    }
  };
}
function externalReferenceGetHash(value, breakpointIndex) {
  if (isTrulyResponsiveValue(value)) {
    var breakpointValue = responsiveValueAt(value, breakpointIndex);
    if (breakpointValue) {
      return externalReferenceGetHash(breakpointValue, breakpointIndex);
    }
    return;
  }
  if (value.id) {
    return "".concat(value.id, ".").concat(value.widgetId);
  }
}
function normalizeComponent(configComponent, compilationContext) {
  var _configComponent$_id;
  var ret = {
    _id: (_configComponent$_id = configComponent._id) !== null && _configComponent$_id !== void 0 ? _configComponent$_id : uniqueId(),
    _component: configComponent._component
  };

  // Normalize itemProps (before own props). If component definition is missing, we still normalize item props
  if (configComponent._itemProps) {
    ret._itemProps = {};
    var _loop = function _loop(templateId) {
      ret._itemProps[templateId] = {};
      var _loop2 = function _loop2(fieldName) {
        ret._itemProps[templateId][fieldName] = {};
        var values = configComponent._itemProps[templateId][fieldName];
        var ownerDefinition = findComponentDefinitionById(templateId, compilationContext);
        var ownerSchemaProp = ownerDefinition.schema.find(function (x) {
          return x.prop === fieldName;
        });
        if (!ownerSchemaProp) {
          return 1; // continue
        }
        (ownerSchemaProp.itemFields || []).forEach(function (itemFieldSchemaProp) {
          ret._itemProps[templateId][fieldName][itemFieldSchemaProp.prop] = getSchemaDefinition(itemFieldSchemaProp, compilationContext).normalize(values[itemFieldSchemaProp.prop]);
        });
      };
      for (var fieldName in configComponent._itemProps[templateId]) {
        if (_loop2(fieldName)) continue;
      }
    };
    for (var templateId in configComponent._itemProps) {
      _loop(templateId);
    }
  }
  var componentDefinition = findComponentDefinitionById(configComponent._component, compilationContext);
  if (!componentDefinition) {
    console.warn("[normalize] Unknown _component ".concat(configComponent._component));
    return ret;
  }
  componentDefinition.schema.forEach(function (schemaProp) {
    ret[schemaProp.prop] = getSchemaDefinition(schemaProp, compilationContext).normalize(configComponent[schemaProp.prop]);
  });

  // RichText is a really specific component. It must have concrete shape to work properly.
  // When using prop of type `component` with `accepts: ["@easyblocks/rich-text"]` it's going to be initialized with empty
  // `elements` property which in result will cause RichText to not work properly. To fix this, we're going
  // to initialize `elements` with default template - the same that's being added when user adds RichText to Stack manually.
  if (ret._component === "@easyblocks/rich-text") {
    var _ret$elements$compila;
    if (Object.keys(ret.elements).length === 0 || ((_ret$elements$compila = ret.elements[compilationContext.contextParams.locale]) === null || _ret$elements$compila === void 0 ? void 0 : _ret$elements$compila.length) === 0) {
      var _Object$entries$find, _compilationContext$t2, _Object$entries$find2, _compilationContext$t3;
      var richTextConfig = buildRichTextNoCodeEntry({
        locale: compilationContext.contextParams.locale,
        color: (_Object$entries$find = Object.entries((_compilationContext$t2 = compilationContext.theme.colors) !== null && _compilationContext$t2 !== void 0 ? _compilationContext$t2 : {}).find(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
            value = _ref5[1];
          return value.isDefault;
        })) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[0],
        font: (_Object$entries$find2 = Object.entries((_compilationContext$t3 = compilationContext.theme.fonts) !== null && _compilationContext$t3 !== void 0 ? _compilationContext$t3 : {}).find(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
            value = _ref7[1];
          return value.isDefault;
        })) === null || _Object$entries$find2 === void 0 ? void 0 : _Object$entries$find2[0]
      });
      ret.elements = richTextConfig.elements;
    }
  }
  return ret;
}
function getSchemaDefinition(schemaProp, compilationContext) {
  var provider = compilationContext.types[schemaProp.type] && schemaProp.type !== "text" ? schemaPropDefinitions.custom :
  // @ts-expect-error
  schemaPropDefinitions[schemaProp.type];
  return provider(schemaProp, compilationContext);
}
function resolveLocalisedValue(localisedValue, compilationContext) {
  var locale = compilationContext.contextParams.locale;
  if (localisedValue[locale] !== undefined) {
    return {
      value: localisedValue[locale],
      locale: locale
    };
  }
  var fallbackLocale = getFallbackLocaleForLocale(locale, compilationContext.locales);
  if (!fallbackLocale) {
    return;
  }
  return {
    value: localisedValue[fallbackLocale],
    locale: fallbackLocale
  };
}

export { getSchemaDefinition, normalizeComponent, resolveLocalisedValue, schemaPropDefinitions };
