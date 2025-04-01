/* with love from shopstory */
import _typeof from '@babel/runtime/helpers/typeof';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { assertDefined, uniqueId, deepCompare, deepClone, dotNotationSet, dotNotationGet, bubbleDown, entries, raiseError, toArray } from '@redsun-vn/easyblocks-utils';
import { xxHash32 } from 'js-xxhash';
import { isComponentConfig } from '../checkers.js';
import { applyAutoUsingResponsiveTokens } from './applyAutoUsingResponsiveTokens.js';
import { compileBox } from './box.js';
import { compileComponentValues } from './compileComponentValues.js';
import { compileFromSchema } from './compileFromSchema.js';
import { getDevicesWidths } from './devices.js';
import { findComponentDefinitionById, findComponentDefinition } from './findComponentDefinition.js';
import { getMostCommonValueFromRichTextParts } from './getMostCommonValueFromRichTextParts.js';
import { linearizeSpace } from './linearizeSpace.js';
import { parsePath } from './parsePath.js';
import { scalarizeConfig, resop2 } from './resop.js';
import { isExternalSchemaProp, isSchemaPropComponentOrComponentCollection, isSchemaPropComponent, isSchemaPropComponentCollectionLocalised, isSchemaPropActionTextModifier, isSchemaPropTextModifier, isSchemaPropCollection } from './schema/index.js';
import { getTinaField } from './tinaFieldProviders.js';
import { getFallbackLocaleForLocale } from '../locales.js';
import { responsiveValueAt } from '../responsiveness/responsiveValueAt.js';
import { responsiveValueFill } from '../responsiveness/responsiveValueFill.js';
import { responsiveValueNormalize } from '../responsiveness/responsiveValueNormalize.js';

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function compileComponent(editableElement, compilationContext, contextProps,
// contextProps are already compiled! They're result of compilation function.
meta, cache, parentComponentEditingInfo) {
  var configPrefix = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
  if (!isComponentConfig(editableElement)) {
    console.error("[compile] wrong input for compileComponent", editableElement);
    throw new Error("[compile] wrong input for compileComponent");
  }
  if (contextProps.$width === undefined || contextProps.$width === -1) {
    throw new Error("assertion failed: incorrect $width in compileComponent: ".concat(contextProps.$width, ", component: ").concat(editableElement._id, ", ").concat(editableElement._component));
  }
  var cachedResult = cache.get(editableElement._id);
  var componentDefinition = findComponentDefinitionById(editableElement._component, compilationContext);
  if (!componentDefinition) {
    componentDefinition = assertDefined(findComponentDefinitionById("@easyblocks/missing-component", compilationContext));
    var error = "Easyblocks can\u2019t find definition for component \"".concat(editableElement._component, "\" in your config. Please contact your developers to resolve this issue.");
    editableElement = {
      _component: componentDefinition.id,
      _id: uniqueId(),
      error: error
    };
    console.warn(error);
    parentComponentEditingInfo = undefined;
  }
  var ownProps = createOwnComponentProps({
    config: editableElement,
    contextProps: contextProps,
    componentDefinition: componentDefinition,
    compilationContext: compilationContext
  });
  var hasComponentConfigChanged = true;
  var ownPropsAfterAuto;
  var compiled = {
    _component: editableElement._component,
    _id: editableElement._id,
    props: {},
    components: {},
    styled: {}
  };
  var configAfterAuto;
  var editingInfo;
  var compiledValues = {};
  var subcomponentsContextProps = {};
  var editingContextProps;
  if (cachedResult) {
    hasComponentConfigChanged = !deepCompare(ownProps, cachedResult.values);
    if (!hasComponentConfigChanged) {
      ownPropsAfterAuto = cachedResult.valuesAfterAuto;
      compiledValues = cachedResult.compiledValues;
      compiled = cachedResult.compiledConfig;
      configAfterAuto = deepClone(_objectSpread(_objectSpread({}, cachedResult.valuesAfterAuto.values), cachedResult.valuesAfterAuto.params));
      subcomponentsContextProps = cachedResult.contextProps;
      editingContextProps = cachedResult.editingContextProps;
    }
  }
  addComponentToSerializedComponentDefinitions(editableElement, meta, "components", compilationContext);
  var _calculateWidths = calculateWidths(compilationContext, contextProps),
    $width = _calculateWidths.$width,
    $widthAuto = _calculateWidths.$widthAuto;
  if (hasComponentConfigChanged) {
    // We are going to mutate this object so let's disconnect it from its source object
    ownPropsAfterAuto = deepClone(ownProps);

    /**
     * APPLY AUTO
     */

    var DEFAULT_SPACE_AUTO_CONSTANT = 16;

    // linearize space
    componentDefinition.schema.forEach(function (schemaProp) {
      if (isSchemaPropTokenized(schemaProp)) {
        ownPropsAfterAuto.values[schemaProp.prop] = applyAutoUsingResponsiveTokens(ownPropsAfterAuto.values[schemaProp.prop], compilationContext);
      }
      if (schemaProp.type === "space") {
        var _params$autoConstant, _params;
        ownPropsAfterAuto.values[schemaProp.prop] = linearizeSpace(ownPropsAfterAuto.values[schemaProp.prop], compilationContext, $width, (_params$autoConstant = (_params = schemaProp.params) === null || _params === void 0 ? void 0 : _params.autoConstant) !== null && _params$autoConstant !== void 0 ? _params$autoConstant : DEFAULT_SPACE_AUTO_CONSTANT);
      }
    });
    itemFieldsForEach(ownPropsAfterAuto.values, compilationContext, function (arg) {
      var value = arg.itemPropValue;
      if (isSchemaPropTokenized(arg.itemSchemaProp)) {
        value = applyAutoUsingResponsiveTokens(value, compilationContext);
      }
      if (arg.itemSchemaProp.type === "space") {
        var _params$autoConstant2, _params2;
        value = linearizeSpace(value, compilationContext, $width, (_params$autoConstant2 = (_params2 = arg.itemSchemaProp.params) === null || _params2 === void 0 ? void 0 : _params2.autoConstant) !== null && _params$autoConstant2 !== void 0 ? _params$autoConstant2 : DEFAULT_SPACE_AUTO_CONSTANT);
      }
      dotNotationSet(ownPropsAfterAuto.values, arg.itemPropPath, value);
    });
    var autoFunction = componentDefinition.auto;
    if (autoFunction) {
      var ownValuesAfterAuto = autoFunction({
        values: ownPropsAfterAuto.values,
        params: _objectSpread(_objectSpread({}, ownPropsAfterAuto.params), {}, {
          $width: $width,
          $widthAuto: $widthAuto
        }),
        devices: compilationContext.devices
      });
      ownPropsAfterAuto.values = ownValuesAfterAuto;
    }

    // Fill all responsive values. We can assume that values after auto for each breakpoint MUST be defined!!!
    // IMPORTANT: For now we make it realtive to device widths, so Webflow way
    for (var prop in ownPropsAfterAuto.values) {
      ownPropsAfterAuto.values[prop] = responsiveValueFill(ownPropsAfterAuto.values[prop], compilationContext.devices, getDevicesWidths(compilationContext.devices));
    }
    for (var _prop in ownPropsAfterAuto.params) {
      ownPropsAfterAuto.params[_prop] = responsiveValueFill(ownPropsAfterAuto.params[_prop], compilationContext.devices, getDevicesWidths(compilationContext.devices));
    }
    itemFieldsForEach(ownPropsAfterAuto.values, compilationContext, function (arg) {
      dotNotationSet(ownPropsAfterAuto.values, arg.itemPropPath, responsiveValueFill(arg.itemPropValue, compilationContext.devices, getDevicesWidths(compilationContext.devices)));
    });

    // First we compile all the props and store them in compiledValues
    var _compiledValues = compileComponentValues(ownPropsAfterAuto.values, componentDefinition, compilationContext, cache);
    compiledValues = _objectSpread(_objectSpread({}, deepClone(ownPropsAfterAuto.values)), _compiledValues);

    // Compile item props
    itemFieldsForEach(ownPropsAfterAuto.values, compilationContext, function (_ref) {
      var itemPropValue = _ref.itemPropValue,
        itemIndex = _ref.itemIndex,
        itemSchemaProp = _ref.itemSchemaProp,
        collectionSchemaProp = _ref.collectionSchemaProp;
      var compiledValue = compileFromSchema(itemPropValue, itemSchemaProp, compilationContext, cache, {}, meta);
      compiledValues[collectionSchemaProp.prop][itemIndex][itemSchemaProp.prop] = compiledValue;
    });

    // We want to style block element based on the most common values from all text parts within all lines.
    // Only for this component, we compile nested @easyblocks/rich-text-part components values.
    if (editableElement._component === "@easyblocks/rich-text") {
      if (compiledValues.isListStyleAuto) {
        var _compileRichTextValue = compileRichTextValuesFromRichTextParts(editableElement, compilationContext, cache),
          _compileRichTextValue2 = _compileRichTextValue.mainColor,
          mainColor = _compileRichTextValue2 === void 0 ? compiledValues.mainColor : _compileRichTextValue2,
          _compileRichTextValue3 = _compileRichTextValue.mainFont,
          mainFont = _compileRichTextValue3 === void 0 ? compiledValues.mainFont : _compileRichTextValue3;
        compiledValues.mainColor = mainColor;
        compiledValues.mainFont = mainFont;
      }
      compiledValues.mainFontSize = mapResponsiveFontToResponsiveFontSize(compiledValues.mainFont);
    }
    compiled = _objectSpread(_objectSpread({}, compiled), {}, {
      components: {},
      styled: {}
    });
    var renderableComponentDefinition = componentDefinition;
    if (compilationContext.isEditing) {
      /**
       * Let's build default editingOutput (fields and component output)
       */

      var editorContext = compilationContext;
      editingInfo = buildDefaultEditingInfo(renderableComponentDefinition, configPrefix, editorContext, compiledValues, editableElement._component);

      /**
       * Let's run custom editing function
       */
      if (renderableComponentDefinition.editing) {
        var scalarizedConfig = scalarizeConfig(compiledValues, editorContext.breakpointIndex, editorContext.devices, renderableComponentDefinition.schema);
        var identityEditingField = assertDefined(editingInfo.fields.find(function (f) {
          return f.prop === "$myself";
        }));
        var editingInfoWithoutIdentityField = _objectSpread(_objectSpread({}, editingInfo), {}, {
          // Filter out identity field, since it's not users responsibility to care of it.
          fields: editingInfo.fields.filter(function (f) {
            return f.prop !== "$myself";
          })
        });
        var editingInfoInput = convertInternalEditingInfoToEditingInfo(editingInfoWithoutIdentityField, configPrefix);
        var editingInfoResult = renderableComponentDefinition.editing(_objectSpread({
          values: scalarizedConfig,
          params: ownPropsAfterAuto.params,
          editingInfo: editingInfoInput,
          device: editorContext.devices.find(function (device) {
            return device.id === editorContext.breakpointIndex;
          })
        }, componentDefinition.id === "@easyblocks/rich-text" || componentDefinition.id === "@easyblocks/rich-text-part" ? {
          __SECRET_INTERNALS__: {
            pathPrefix: configPrefix,
            editorContext: editorContext
          }
        } : {}));
        if (editingInfoResult) {
          var _internalEditingInfo$;
          var internalEditingInfo = convertEditingInfoToInternalEditingInfo(editingInfoResult, editingInfo, componentDefinition, editorContext, configPrefix);
          (_internalEditingInfo$ = internalEditingInfo.fields) === null || _internalEditingInfo$ === void 0 || _internalEditingInfo$.unshift(identityEditingField);
          _deepObjectMergeWithoutArrays(editingInfo, internalEditingInfo);
        }
      }

      /**
       * Save to __editing
       */

      applyEditingInfoToCompiledConfig(compiled, editingInfo, parentComponentEditingInfo, {
        width: $width,
        auto: $widthAuto
      });
      editingContextProps = editingInfo.components;
    }
    var _resop = resop2({
        values: compiledValues,
        params: ownPropsAfterAuto.params
      }, function (_ref2, breakpointIndex) {
        var values = _ref2.values,
          params = _ref2.params;
        if (!renderableComponentDefinition.styles) {
          return {};
        }
        var device = assertDefined(compilationContext.devices.find(function (device) {
          return device.id === breakpointIndex;
        }), "Missing device \"".concat(breakpointIndex, "\""));
        var stylesInput = _objectSpread({
          values: values,
          params: _objectSpread(_objectSpread({}, params), {}, {
            $width: assertDefined(responsiveValueAt($width, breakpointIndex)),
            $widthAuto: assertDefined(responsiveValueAt($widthAuto, breakpointIndex))
          }),
          isEditing: !!compilationContext.isEditing,
          device: device
        }, componentDefinition.id === "@easyblocks/rich-text-part" ? {
          __COMPILATION_CONTEXT__: compilationContext
        } : {});
        return renderableComponentDefinition.styles(stylesInput);
      }, compilationContext.devices, renderableComponentDefinition),
      props = _resop.props,
      components = _resop.components,
      styled = _resop.styled;
    validateStylesProps(props, componentDefinition);
    subcomponentsContextProps = components;

    // Move all the boxes to _compiled
    var _loop = function _loop(key) {
      var styles = styled[key];
      if (Array.isArray(styles)) {
        styles = styles.map(function (v) {
          return _objectSpread(_objectSpread({}, v), {}, {
            __isBox: true
          });
        });
      } else {
        styles = _objectSpread(_objectSpread({}, styles), {}, {
          __isBox: true
        });
      }
      var schemaProp = componentDefinition.schema.find(function (x) {
        return x.prop === key;
      });

      // Context props processed below
      if (schemaProp) {
        return 1; // continue
      }

      // If box

      compiled.styled[key] = compileBoxes(styles, compilationContext);
    };
    for (var key in styled) {
      if (_loop(key)) continue;
    }
    componentDefinition.schema.forEach(function (schemaProp) {
      if ("buildOnly" in schemaProp && schemaProp.buildOnly) {
        return;
      }
      if (isExternalSchemaProp(schemaProp, compilationContext.types) || schemaProp.type === "text") {
        // We simply copy ONLY the breakpoints which are defined in the raw data
        compiled.props[schemaProp.prop] = Object.fromEntries(Object.keys(editableElement[schemaProp.prop]).map(function (deviceId) {
          return [deviceId, compiledValues[schemaProp.prop][deviceId]];
        }));
      } else {
        compiled.props[schemaProp.prop] = responsiveValueNormalize(compiledValues[schemaProp.prop], compilationContext.devices);
      }
    });

    // we also add __props to props
    compiled.props = _objectSpread(_objectSpread({}, props), compiled.props);

    // We are going to mutate this object so let's disconnect it from its source object
    configAfterAuto = deepClone(_objectSpread(_objectSpread({}, ownPropsAfterAuto.values), ownPropsAfterAuto.params));
  }
  if (compilationContext.isEditing) {
    /**
     * Let's build default editingOutput (fields and component output)
     */

    var _editorContext = compilationContext;
    var _renderableComponentDefinition = componentDefinition;
    editingInfo = buildDefaultEditingInfo(_renderableComponentDefinition, configPrefix, _editorContext, compiledValues, editableElement._component);

    /**
     * Let's run custom editing function
     */
    if (_renderableComponentDefinition.editing) {
      var scalarizedValues = scalarizeConfig(compiledValues, _editorContext.breakpointIndex, _editorContext.devices, _renderableComponentDefinition.schema);
      var _identityEditingField = assertDefined(editingInfo.fields.find(function (f) {
        return f.prop === "$myself";
      }));
      var _editingInfoWithoutIdentityField = _objectSpread(_objectSpread({}, editingInfo), {}, {
        // Filter out identity field, since it's not users responsibility to care of it.
        fields: editingInfo.fields.filter(function (f) {
          return f.prop !== "$myself";
        })
      });
      var _editingInfoInput = convertInternalEditingInfoToEditingInfo(_editingInfoWithoutIdentityField, configPrefix);
      var _editingInfoResult = _renderableComponentDefinition.editing(_objectSpread({
        values: scalarizedValues,
        params: ownPropsAfterAuto.params,
        editingInfo: _editingInfoInput,
        device: _editorContext.devices.find(function (device) {
          return device.id === _editorContext.breakpointIndex;
        })
      }, componentDefinition.id === "@easyblocks/rich-text" || componentDefinition.id === "@easyblocks/rich-text-part" ? {
        __SECRET_INTERNALS__: {
          pathPrefix: configPrefix,
          editorContext: _editorContext
        }
      } : {}));
      if (_editingInfoResult) {
        var _internalEditingInfo$2;
        var _internalEditingInfo = convertEditingInfoToInternalEditingInfo(_editingInfoResult, editingInfo, componentDefinition, _editorContext, configPrefix);
        (_internalEditingInfo$2 = _internalEditingInfo.fields) === null || _internalEditingInfo$2 === void 0 || _internalEditingInfo$2.unshift(_identityEditingField);
        _deepObjectMergeWithoutArrays(editingInfo, _internalEditingInfo);
      }
    }
    if (editingInfo)
      // Save to __editing
      applyEditingInfoToCompiledConfig(compiled, editingInfo, parentComponentEditingInfo, {
        width: $width,
        auto: $widthAuto
      });
    editingContextProps = editingInfo.components;
  }
  compileSubcomponents(editableElement, contextProps, subcomponentsContextProps, compilationContext, meta, editingContextProps, configPrefix, compiled, configAfterAuto, cache);
  cache.set(ownProps.values._id, {
    values: ownProps,
    valuesAfterAuto: ownPropsAfterAuto,
    compiledValues: compiledValues,
    compiledConfig: compiled,
    contextProps: subcomponentsContextProps,
    editingContextProps: editingContextProps
  });
  if (process.env.SHOPSTORY_INTERNAL_COMPILATION_DEBUG === "true") {
    logCompilationDebugOutput({
      cachedResult: cachedResult,
      hasComponentConfigChanged: hasComponentConfigChanged,
      configPrefix: configPrefix,
      ownProps: ownProps,
      compiled: compiled
    });
  }
  return {
    compiledComponentConfig: compiled,
    configAfterAuto: configAfterAuto
  };
}
function validateStylesProps(props, componentDefinition) {
  var _loop2 = function _loop2() {
    var key = _Object$keys[_i];
    var schemaProp = componentDefinition.schema.find(function (s) {
      return s.prop === key;
    });
    if (!schemaProp || !("buildOnly" in schemaProp)) {
      return 1; // continue
    }
    if (!schemaProp.buildOnly) {
      throw new Error("You've returned property \"".concat(key, "\" in \"props\" object that conflicts with the same prop in schema of component \"").concat(componentDefinition.id, "\". You can either change the property name or set the schema property as build-only (`buildOnly: true`)."));
    }
  };
  for (var _i = 0, _Object$keys = Object.keys(props); _i < _Object$keys.length; _i++) {
    if (_loop2()) continue;
  }
}
function logCompilationDebugOutput(_ref3) {
  var cachedResult = _ref3.cachedResult,
    hasComponentConfigChanged = _ref3.hasComponentConfigChanged,
    configPrefix = _ref3.configPrefix,
    ownProps = _ref3.ownProps,
    compiled = _ref3.compiled;
  if (cachedResult && !hasComponentConfigChanged) {
    console.groupCollapsed("[cache] ", configPrefix ? configPrefix : "root");
  } else {
    console.groupCollapsed("[compiled] ", configPrefix ? configPrefix : "root");
  }
  console.log(ownProps);
  console.log(compiled);
  console.groupEnd();
}
function createOwnComponentProps(_ref4) {
  var config = _ref4.config,
    contextProps = _ref4.contextProps,
    componentDefinition = _ref4.componentDefinition,
    compilationContext = _ref4.compilationContext;
  // Copy all values and refs defined in schema, for component fields copy only _id, _component and its _itemProps but flattened
  var values = Object.fromEntries(componentDefinition.schema.map(function (schemaProp) {
    if (isSchemaPropComponentOrComponentCollection(schemaProp)) {
      var configValue = config[schemaProp.prop];
      if (configValue.length === 0) {
        return [schemaProp.prop, []];
      }
      if (isSchemaPropComponent(schemaProp)) {
        return [schemaProp.prop, [{
          _id: configValue[0]._id,
          _component: configValue[0]._component
        }]];
      }
      if (isSchemaPropComponentCollectionLocalised(schemaProp)) {
        var _resolveLocalisedValu, _resolveLocalisedValu2;
        configValue = (_resolveLocalisedValu = (_resolveLocalisedValu2 = resolveLocalisedValue(config[schemaProp.prop], compilationContext)) === null || _resolveLocalisedValu2 === void 0 ? void 0 : _resolveLocalisedValu2.value) !== null && _resolveLocalisedValu !== void 0 ? _resolveLocalisedValu : [];
      }
      var configValuesWithFlattenedItemProps = configValue.map(function (config) {
        if (schemaProp.itemFields) {
          var flattenedItemProps = flattenItemProps(config, componentDefinition, schemaProp, schemaProp.itemFields);
          return _objectSpread({
            _id: config._id,
            _component: config._component
          }, flattenedItemProps);
        }
        return {
          _id: config._id,
          _component: config._component
        };
      });
      return [schemaProp.prop, configValuesWithFlattenedItemProps];
    }
    return [schemaProp.prop, config[schemaProp.prop]];
  }));
  var ownValues = _objectSpread({
    // Copy id and component which uniquely identify component.
    _id: config._id,
    _component: config._component
  }, values);
  return {
    values: ownValues,
    params: contextProps
  };
}
function flattenItemProps(config, componentDefinition, collectionSchemaProp, itemsSchemas) {
  var itemProps = Object.fromEntries(itemsSchemas.map(function (itemSchemaProp) {
    return [itemSchemaProp.prop, config._itemProps[componentDefinition.id][collectionSchemaProp.prop][itemSchemaProp.prop]];
  }));
  return itemProps;
}
function addComponentToSerializedComponentDefinitions(component, meta, componentType, compilationContext) {
  var definitions = meta.vars.definitions[componentType];
  if (definitions.find(function (def) {
    return def.id === component._component;
  })) {
    return;
  }
  var internalDefinition = findComponentDefinition(component, compilationContext);
  var newDef = {
    id: internalDefinition.id,
    label: internalDefinition.label,
    schema: internalDefinition.schema,
    type: internalDefinition.type
  };
  if (compilationContext.isEditing) {
    var _internalDefinition$p;
    newDef.pasteSlots = (_internalDefinition$p = internalDefinition.pasteSlots) !== null && _internalDefinition$p !== void 0 ? _internalDefinition$p : [];
  }
  definitions.push(newDef);
}
function compileSubcomponents(editableElement, contextProps, subcomponentsContextProps, compilationContext, meta, editingInfoComponents, configPrefix, compiledComponentConfig, configAfterAuto,
// null means that we don't want auto
cache) {
  var componentDefinition = findComponentDefinition(editableElement, compilationContext);
  componentDefinition.schema.forEach(function (schemaProp) {
    if (isSchemaPropComponentOrComponentCollection(schemaProp)) {
      var _childContextProps$$w, _childContextProps$$w2;
      // Currently these are processed outside of compileSubcomponents
      if (isSchemaPropActionTextModifier(schemaProp) || isSchemaPropTextModifier(schemaProp)) {
        return;
      }
      var childContextProps = subcomponentsContextProps[schemaProp.prop] || {};

      // Subcomponents must always have $width and $widthAuto defined. If wasn't set explicitly then parent's one is used.
      childContextProps.$width = (_childContextProps$$w = childContextProps.$width) !== null && _childContextProps$$w !== void 0 ? _childContextProps$$w : contextProps.$width;
      childContextProps.$widthAuto = (_childContextProps$$w2 = childContextProps.$widthAuto) !== null && _childContextProps$$w2 !== void 0 ? _childContextProps$$w2 : contextProps.$widthAuto;
      if (schemaProp.type === "component-collection" || schemaProp.type === "component-collection-localised") {
        var _childContextProps$it;
        childContextProps.itemProps = (_childContextProps$it = childContextProps.itemProps) !== null && _childContextProps$it !== void 0 ? _childContextProps$it : [];
        var value;
        if (schemaProp.type === "component-collection") {
          value = editableElement[schemaProp.prop];
        } else {
          var resolvedValue = resolveLocalisedValue(editableElement[schemaProp.prop], compilationContext);
          if (!resolvedValue) {
            throw new Error("Can't resolve localised value for prop \"".concat(schemaProp.prop, "\" of component ").concat(editableElement._component));
          }
          value = resolvedValue.value;
        }
        value.forEach(function (_, index) {
          var _childContextProps$it2, _itemPropContextProps, _itemPropContextProps2;
          childContextProps.itemProps[index] = (_childContextProps$it2 = childContextProps.itemProps[index]) !== null && _childContextProps$it2 !== void 0 ? _childContextProps$it2 : {};
          var itemPropContextProps = childContextProps.itemProps[index];
          itemPropContextProps.$width = (_itemPropContextProps = itemPropContextProps.$width) !== null && _itemPropContextProps !== void 0 ? _itemPropContextProps : contextProps.$width;
          itemPropContextProps.$widthAuto = (_itemPropContextProps2 = itemPropContextProps.$widthAuto) !== null && _itemPropContextProps2 !== void 0 ? _itemPropContextProps2 : contextProps.$widthAuto;
        });
      }
      var compilationOutput = compileFromSchema(editableElement[schemaProp.prop], schemaProp, compilationContext, cache, childContextProps, meta, editingInfoComponents === null || editingInfoComponents === void 0 ? void 0 : editingInfoComponents[schemaProp.prop], "".concat(configPrefix).concat(configPrefix === "" ? "" : ".").concat(schemaProp.prop));
      compiledComponentConfig.components[schemaProp.prop] = compilationOutput.map(function (compilationOutput) {
        return compilationOutput.compiledComponentConfig;
      });

      // Merge config after auto
      if (compilationContext.isEditing && configAfterAuto !== null) {
        if (schemaProp.type === "component") {
          var _compilationOutput$0$, _compilationOutput$;
          configAfterAuto[schemaProp.prop] = [(_compilationOutput$0$ = (_compilationOutput$ = compilationOutput[0]) === null || _compilationOutput$ === void 0 ? void 0 : _compilationOutput$.configAfterAuto) !== null && _compilationOutput$0$ !== void 0 ? _compilationOutput$0$ : []];
        } else if (schemaProp.type === "component-collection" || schemaProp.type === "component-collection-localised") {
          var configsAfterAuto = compilationOutput.map(function (compilationOutput, index) {
            if (schemaProp.itemFields) {
              var itemPropsCollectionPath = "_itemProps.".concat(editableElement._component, ".").concat(schemaProp.prop);
              var itemProps = Object.fromEntries(schemaProp.itemFields.map(function (itemSchemaProp) {
                var itemPropValue = configAfterAuto[schemaProp.prop][index][itemSchemaProp.prop];
                return [itemSchemaProp.prop, itemPropValue];
              }));
              dotNotationSet(compilationOutput.configAfterAuto, itemPropsCollectionPath, itemProps);
            }
            return compilationOutput.configAfterAuto;
          });
          if (schemaProp.type === "component-collection-localised") {
            // We store after auto config within context of current locale only
            configAfterAuto[schemaProp.prop] = _defineProperty({}, compilationContext.contextParams.locale, configsAfterAuto);
          } else {
            configAfterAuto[schemaProp.prop] = configsAfterAuto;
          }
        }
      }
    }
  });
}
function calculateWidths(compilationContext, contextProps) {
  var $width = {
    $res: true
  };
  var $widthAuto = {
    $res: true
  };
  compilationContext.devices.forEach(function (device) {
    var _contextProps$$width$, _contextProps$$width, _contextProps$$widthA, _contextProps$$widthA2;
    $width[device.id] = (_contextProps$$width$ = (_contextProps$$width = contextProps.$width) === null || _contextProps$$width === void 0 ? void 0 : _contextProps$$width[device.id]) !== null && _contextProps$$width$ !== void 0 ? _contextProps$$width$ : -1;
    $widthAuto[device.id] = (_contextProps$$widthA = (_contextProps$$widthA2 = contextProps.$widthAuto) === null || _contextProps$$widthA2 === void 0 ? void 0 : _contextProps$$widthA2[device.id]) !== null && _contextProps$$widthA !== void 0 ? _contextProps$$widthA : $width[device.id] === -1 ? true : false;
  });
  return {
    $width: $width,
    $widthAuto: $widthAuto
  };
}
function itemFieldsForEach(config, compilationContext, callback) {
  var componentDefinition = findComponentDefinition(config, compilationContext);
  componentDefinition.schema.forEach(function (schemaProp) {
    if (isSchemaPropCollection(schemaProp)) {
      var _dotNotationGet;
      var itemFields = schemaProp.itemFields;
      var path = schemaProp.prop;
      if (schemaProp.type === "component-collection-localised") {
        var localizedValue = resolveLocalisedValue(config[schemaProp.prop], compilationContext);
        if (localizedValue) {
          path = "".concat(path, ".").concat(localizedValue.locale);
        } else {
          path = "".concat(path, ".").concat(compilationContext.contextParams.locale);
        }
      }
      var value = (_dotNotationGet = dotNotationGet(config, path)) !== null && _dotNotationGet !== void 0 ? _dotNotationGet : [];
      value.forEach(function (_, index) {
        if (itemFields) {
          itemFields.forEach(function (itemSchemaProp) {
            var itemPath = "".concat(path, ".").concat(index, ".").concat(itemSchemaProp.prop);
            var itemValue = dotNotationGet(config, itemPath);
            callback({
              collectionSchemaProp: schemaProp,
              itemIndex: index,
              itemSchemaProp: itemSchemaProp,
              itemPropPath: itemPath,
              itemPropValue: itemValue
            });
          });
        }
      });
    }
  });
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
function buildDefaultEditingInfo(definition, configPrefix, editorContext, compiledValues, templateId) {
  var scalarizedConfig = scalarizeConfig(compiledValues, editorContext.breakpointIndex, editorContext.devices, definition.schema);
  var schema = _toConsumableArray(definition.schema);
  var defaultFields = schema
  // Right now, component-collection schema prop isn't shown in the sidebar
  .filter(function (schemaProp) {
    return !isSchemaPropCollection(schemaProp);
  }).filter(function (schemaProp) {
    if (compiledValues.noTrace && schemaProp.prop.startsWith("trace")) {
      return false;
    }
    return true;
  }).map(function (schemaProp) {
    return getDefaultFieldDefinition(schemaProp, configPrefix, definition, editorContext, scalarizedConfig);
  });

  // noAction is a special property
  if (compiledValues.noAction) {
    defaultFields = defaultFields.filter(function (field) {
      return field.path !== "action";
    });
  }
  var pathInfo = parsePath(configPrefix, editorContext.form);
  var parentInfo = pathInfo.parent;
  if (parentInfo) {
    var parentDefinition = findComponentDefinitionById(parentInfo.templateId, editorContext);
    if (!parentDefinition) {
      throw new Error("Can't find parent definition: ".concat(parentInfo.templateId));
    }
    var parentSchemaProp = parentDefinition.schema.find(function (schemaProp) {
      return schemaProp.prop === parentInfo.fieldName;
    });
    if (!parentSchemaProp) {
      throw new Error("Can't find parent schemaProp: ".concat(parentInfo.templateId, " > ").concat(parentInfo.fieldName));
    }
    var required;
    if (parentSchemaProp.type === "component") {
      required = !!parentSchemaProp.required;
    } else {
      required = false;
    }
    var headerSchemaProp = {
      prop: "$myself",
      label: "Component type",
      type: "component$$$",
      picker: parentSchemaProp.picker,
      definition: parentDefinition,
      required: required,
      group: "Component"
    };
    var headerField = {
      component: "identity",
      hidden: false,
      label: "Component type",
      name: configPrefix,
      prop: "$myself",
      schemaProp: headerSchemaProp
    };
    defaultFields.unshift(headerField);
  } else {
    var rootComponentDefinition = assertDefined(findComponentDefinitionById(dotNotationGet(editorContext.form.values, "")._component, editorContext));
    var _headerSchemaProp = {
      prop: "$myself",
      label: "Component type",
      type: "component$$$",
      definition: rootComponentDefinition,
      required: true,
      group: "Component"
    };
    var _headerField = {
      component: "identity",
      hidden: false,
      label: "Component type",
      name: "",
      prop: "$myself",
      schemaProp: _headerSchemaProp
    };
    defaultFields.unshift(_headerField);
  }
  var fields = bubbleDown(function (x) {
    return x.prop === "Analytics";
  }, defaultFields);
  var editingInfo = {
    fields: fields,
    components: {}
  };
  definition.schema.forEach(function (schemaProp) {
    if (isSchemaPropCollection(schemaProp)) {
      editingInfo.components[schemaProp.prop] = {
        items: scalarizedConfig[schemaProp.prop].map(function (x, index) {
          var _schemaProp$itemField;
          return {
            fields: ((_schemaProp$itemField = schemaProp.itemFields) !== null && _schemaProp$itemField !== void 0 ? _schemaProp$itemField : []).map(function (itemSchemaProp) {
              return getDefaultFieldDefinition(itemSchemaProp, "".concat(configPrefix).concat(configPrefix === "" ? "" : ".").concat(schemaProp.prop, ".").concat(index, "._itemProps.").concat(definition.id, ".").concat(schemaProp.prop), definition, editorContext, scalarizedConfig);
            })
          };
        })
      };
    } else if (isSchemaPropComponent(schemaProp)) {
      editingInfo.components[schemaProp.prop] = {
        fields: []
      };
    }
  });
  return editingInfo;
}
function applyEditingInfoToCompiledConfig(compiledComponentConfig, editingInfo, parentEditingInfo, widthInfo) {
  var headerFields = editingInfo.fields.filter(function (field) {
    return field.prop === "$myself";
  });
  var nonHeaderFields = editingInfo.fields.filter(function (field) {
    return field.prop !== "$myself";
  });
  var fields = [].concat(_toConsumableArray(headerFields), _toConsumableArray(parentEditingInfo && "fields" in parentEditingInfo ? parentEditingInfo.fields : []), _toConsumableArray(nonHeaderFields));
  compiledComponentConfig.__editing = _objectSpread(_objectSpread({}, parentEditingInfo), {}, {
    fields: fields,
    components: {},
    widthInfo: widthInfo
  });
  for (var fieldName in editingInfo.components) {
    compiledComponentConfig.__editing.components[fieldName] = {};
    var childComponentEditingInfo = editingInfo.components[fieldName];

    // Here we copy only noInline. It's the only flag we need in parent component. It's only because we need noInline info even if there is no component in array (to know that we shouldn't render placeholder)
    if ("noInline" in childComponentEditingInfo && childComponentEditingInfo.noInline !== undefined) {
      compiledComponentConfig.__editing.components[fieldName].noInline = childComponentEditingInfo.noInline;
    }
  }
}
var _deepObjectMergeWithoutArrays = function deepObjectMergeWithoutArrays(target, source) {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (var _i2 = 0, _Object$keys2 = Object.keys(source); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];
    if (source[key] instanceof Object && !Array.isArray(source[key])) Object.assign(source[key], _deepObjectMergeWithoutArrays(target[key], source[key]));
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
};
function compileRichTextValuesFromRichTextParts(richTextConfig, compilationContext, cache) {
  var mainColor = getMostCommonValueFromRichTextParts(richTextConfig, "color", compilationContext, cache);
  var mainFont = getMostCommonValueFromRichTextParts(richTextConfig, "font", compilationContext, cache);
  return {
    mainColor: mainColor,
    mainFont: mainFont
  };
}
function mapResponsiveFontToResponsiveFontSize(responsiveFontValue) {
  return Object.fromEntries(entries(responsiveFontValue).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      breakpoint = _ref6[0],
      fontValue = _ref6[1];
    if (breakpoint === "$res") {
      return [breakpoint, fontValue];
    }
    return [breakpoint, fontValue.fontSize];
  }));
}
function addStylesHash(styles) {
  if ("__hash" in styles) {
    delete styles["__hash"];
  }
  var hash = xxHash32(JSON.stringify(styles));
  styles.__hash = hash.toString();
  return styles;
}
function compileBoxes(value, compilationContext) {
  if (Array.isArray(value)) {
    return value.map(function (x) {
      return compileBoxes(x, compilationContext);
    });
  } else if (_typeof(value) === "object" && value !== null) {
    if (value.__isBox) {
      return addStylesHash(compileBox(value, compilationContext.devices));
    }
    var ret = {};
    for (var key in value) {
      ret[key] = compileBoxes(value[key], compilationContext);
    }
    return ret;
  }
  return value;
}
function getDefaultFieldDefinition(schemaProp, configPrefix, definition, editorContext, compiledValues, templateId) {
  var tinaField = getTinaField(_objectSpread(_objectSpread({}, schemaProp), {}, {
    definition: definition
  }), editorContext, compiledValues[schemaProp.prop]);
  var visible = !isSchemaPropComponentOrComponentCollection(schemaProp);
  if (typeof schemaProp.visible === "boolean") {
    visible = schemaProp.visible;
  } else if (typeof schemaProp.visible === "function") {
    visible = schemaProp.visible(compiledValues, {
      editorContext: editorContext
    });
  }
  return _objectSpread(_objectSpread({}, tinaField), {}, {
    prop: schemaProp.prop,
    name: createFieldName(schemaProp, configPrefix),
    hidden: !visible
  });
}
function createFieldName(schemaProp, configPrefix) {
  return schemaProp.prop === "$myself" ? configPrefix : "".concat(configPrefix).concat(configPrefix === "" ? "" : ".").concat(schemaProp.prop);
}
function convertInternalEditingInfoToEditingInfo(editingInfo, configPrefix) {
  var fields = editingInfo.fields.map(function (f) {
    return convertInternalEditingFieldToEditingInfoField(f, configPrefix);
  });
  var components = Object.fromEntries(Object.entries(editingInfo.components).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      name = _ref8[0],
      childEditingInfo = _ref8[1];
    if ("items" in childEditingInfo) {
      var adaptedChildEditingInfo = childEditingInfo.items.map(function (item) {
        return {
          fields: item.fields.map(function (f) {
            return convertInternalEditingFieldToEditingInfoField(f, configPrefix);
          }),
          direction: item.direction,
          selectable: item.noInline
        };
      });
      return [name, adaptedChildEditingInfo];
    }
    return [name, {
      fields: childEditingInfo.fields.map(function (f) {
        return convertInternalEditingFieldToEditingInfoField(f, configPrefix);
      }),
      direction: childEditingInfo.direction,
      selectable: childEditingInfo.noInline
    }];
  }));
  return {
    fields: fields,
    components: components
  };
}
function convertInternalEditingFieldToEditingInfoField(field, configPrefix) {
  var path = field.schemaProp.prop === "$myself" ? field.schemaProp.prop : toRelativeFieldPath(field.name, configPrefix);
  return {
    path: path,
    type: "field",
    visible: typeof field.hidden === "boolean" ? !field.hidden : true,
    group: field.group,
    label: field.label
  };
}
function toRelativeFieldPath(path, configPrefix) {
  var adjustedPath = path;
  if (path.includes("_itemProps")) {
    var pathFragments = path.split(".");
    var itemPropsFragmentIndex = pathFragments.indexOf("_itemProps");
    var adjustedPathFragments = [].concat(_toConsumableArray(pathFragments.slice(0, itemPropsFragmentIndex)), [pathFragments.at(-1)]);
    adjustedPath = adjustedPathFragments.join(".");
  }
  return configPrefix ? adjustedPath.replace("".concat(configPrefix, "."), "") : adjustedPath;
}
function convertEditingInfoToInternalEditingInfo(editingInfo, internalEditingInfo, componentDefinition, editorContext, configPrefix) {
  var internalEditingInfoFields;
  if (editingInfo.fields) {
    if (!internalEditingInfoFields) {
      internalEditingInfoFields = [];
    }
    var _iterator = _createForOfIteratorHelper(editingInfo.fields),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var field = _step.value;
        var internalEditingInfoField = convertEditingFieldToInternalEditingField(field, internalEditingInfo, componentDefinition, editorContext, configPrefix);
        internalEditingInfoFields.push(internalEditingInfoField);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var internalEditingInfoComponents;
  if (editingInfo.components) {
    internalEditingInfoComponents = {};
    var _loop3 = function _loop3() {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
        name = _Object$entries$_i[0],
        childEditingInfo = _Object$entries$_i[1];
      var sourceInternalEditingInfoComponent = internalEditingInfo.components[name];
      if (!sourceInternalEditingInfoComponent) {
        throw new Error("Found component at path ".concat(configPrefix, " but it's not defined in the schema"));
      }
      if (Array.isArray(childEditingInfo)) {
        internalEditingInfoComponents[name] = {
          items: childEditingInfo.map(function (editingInfoItem, index) {
            var _editingInfoItem$fiel;
            var sourceInternalFields = sourceInternalEditingInfoComponent.items[index].fields;
            var internalFields = (_editingInfoItem$fiel = editingInfoItem.fields) === null || _editingInfoItem$fiel === void 0 ? void 0 : _editingInfoItem$fiel.map(function (field) {
              var internalEditingInfoField = convertEditingFieldToInternalEditingField(field, internalEditingInfo, componentDefinition, editorContext, configPrefix);
              return internalEditingInfoField;
            });
            var result = {
              fields: internalFields !== null && internalFields !== void 0 ? internalFields : sourceInternalFields
            };
            if (editingInfoItem.direction) {
              result.direction = editingInfoItem.direction;
            }
            if (editingInfoItem.selectable !== undefined) {
              result.noInline = !editingInfoItem.selectable;
            }
            return result;
          })
        };
      } else {
        var _result = {};
        if (childEditingInfo.fields) {
          _result.fields = childEditingInfo.fields.map(function (field) {
            var internalEditingInfoField = convertEditingFieldToInternalEditingField(field, internalEditingInfo, componentDefinition, editorContext, configPrefix);
            return internalEditingInfoField;
          });
        }
        if (childEditingInfo.direction) {
          _result.direction = childEditingInfo.direction;
        }
        if (childEditingInfo.selectable !== undefined) {
          _result.noInline = !childEditingInfo.selectable;
        }
        internalEditingInfoComponents[name] = _result;
      }
    };
    for (var _i3 = 0, _Object$entries = Object.entries(editingInfo.components); _i3 < _Object$entries.length; _i3++) {
      _loop3();
    }
  }
  var result = {};
  if (internalEditingInfoFields) {
    result.fields = internalEditingInfoFields;
  }
  if (internalEditingInfoComponents) {
    result.components = internalEditingInfoComponents;
  }
  return result;
}
function convertEditingFieldToInternalEditingField(field, internalEditingInfo, componentDefinition, editorContext, configPrefix) {
  if (componentDefinition.id === "@easyblocks/rich-text" || componentDefinition.id === "@easyblocks/rich-text-part") {
    // This is a special case. Rich text components have a really nasty `editing` function implementation
    // relying on `editorContext`, absolute paths and multi field portals. Ideally it would best to address this,
    // but right now let's keep it as it is and treat it like an exception

    // Even though the type definition for field doesn't allow `path` to be an array, $richText component
    // returns an array of paths.
    if (Array.isArray(field.path)) {
      var _field$path$0$split$a, _field$path$;
      var fieldName = (_field$path$0$split$a = (_field$path$ = field.path[0]) === null || _field$path$ === void 0 ? void 0 : _field$path$.split(".").at(-1)) !== null && _field$path$0$split$a !== void 0 ? _field$path$0$split$a : raiseError("Expected field name to be present");
      var sources = field.path.map(function (p) {
        return p.split(".").slice(0, -1).join(".");
      });
      return {
        portal: "multi-field",
        fieldName: fieldName,
        sources: sources
      };
    }
    var isAbsolutePath = isFieldPathAbsolutePath(field, editorContext);
    if (isAbsolutePath) {
      var _pathFragments$at;
      if (field.type === "fields") {
        var _field$filters;
        var groups = (_field$filters = field.filters) !== null && _field$filters !== void 0 && _field$filters.group ? toArray(field.filters.group) : undefined;
        return {
          portal: "component",
          source: field.path,
          groups: groups
        };
      }
      var pathFragments = field.path.split(".");
      var _fieldName = (_pathFragments$at = pathFragments.at(-1)) !== null && _pathFragments$at !== void 0 ? _pathFragments$at : raiseError("Expected field name to be present");
      var source = pathFragments.slice(0, -1).join(".");
      return {
        portal: "field",
        source: source,
        fieldName: _fieldName
      };
    }
  }
  if (field.type === "field") {
    var sourceInternalEditingInfoField = internalEditingInfo.fields.find(function (f) {
      return f.name === toAbsolutePath(field.path, configPrefix) || field.path === "$myself";
    });
    if (!sourceInternalEditingInfoField) {
      var _pathFragments = field.path.split(".");
      var isPathToComponentField = _pathFragments.length > 1;
      if (isPathToComponentField) {
        var componentSchemaProp = componentDefinition.schema.find(isSchemaPropComponentOrComponentCollection);
        if (componentSchemaProp) {
          if (isSchemaPropCollection(componentSchemaProp)) {
            var _componentSchemaProp$;
            var itemField = (_componentSchemaProp$ = componentSchemaProp.itemFields) === null || _componentSchemaProp$ === void 0 ? void 0 : _componentSchemaProp$.find(function (f) {
              return f.prop === _pathFragments.at(-1);
            });
            if (itemField) {
              var componentItemIndex = +_pathFragments[1];
              sourceInternalEditingInfoField = internalEditingInfo.components[componentSchemaProp.prop].items[componentItemIndex].fields.find(function (f) {
                return f.prop === itemField.prop;
              });
            }
          }
          if (componentSchemaProp.type === "component" && componentSchemaProp.required) {
            var absoluteFieldPath = toAbsolutePath(_pathFragments.slice(0, -1).join("."), configPrefix);
            var overrides = {};
            if (field.label !== undefined) {
              overrides.label = field.label;
            }
            if (field.group !== undefined) {
              overrides.group = field.group;
            }
            return {
              portal: "field",
              fieldName: _pathFragments.at(-1),
              source: absoluteFieldPath,
              overrides: overrides
            };
          }
        }
      }
      if (!sourceInternalEditingInfoField) {
        throw new Error("Field \"".concat(field.path, "\" for component \"").concat(componentDefinition.id, "\" not found."));
      }
    }
    return _objectSpread(_objectSpread({}, sourceInternalEditingInfoField), {}, {
      label: field.label,
      group: field.group,
      hidden: !field.visible
    });
  }
  if (field.type === "fields") {
    var _field$filters2;
    var _absoluteFieldPath = toAbsolutePath(field.path, configPrefix);
    return _objectSpread({
      portal: "component",
      source: _absoluteFieldPath
    }, ((_field$filters2 = field.filters) === null || _field$filters2 === void 0 ? void 0 : _field$filters2.group) !== undefined && {
      groups: toArray(field.filters.group)
    });
  }
  throw new Error("Unknown field type");
}
function isFieldPathAbsolutePath(field, editorContext) {
  var pathFragments = field.path.split(".");
  var rootValue = dotNotationGet(editorContext.form.values, "");
  var currentPathFragmentIndex = 0;
  var currentValue = dotNotationGet(rootValue, pathFragments[currentPathFragmentIndex]);
  while (currentValue !== undefined) {
    if (pathFragments.length - 1 === currentPathFragmentIndex) {
      return true;
    }
    currentValue = dotNotationGet(currentValue, pathFragments[++currentPathFragmentIndex]);
  }
  return false;
}
function toAbsolutePath(path, configPrefix) {
  if (configPrefix) {
    return "".concat(configPrefix, ".").concat(path);
  }
  return path;
}
function isSchemaPropTokenized(schemaProp) {
  return schemaProp.type === "color" || schemaProp.type === "space" || schemaProp.type === "font" || schemaProp.type === "aspectRatio" || schemaProp.type === "boxShadow" || schemaProp.type === "containerWidth";
}

export { compileComponent };
