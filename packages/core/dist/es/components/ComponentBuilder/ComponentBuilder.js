/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _typeof from '@babel/runtime/helpers/typeof';
import React, { Fragment } from 'react';
import { findComponentDefinitionById } from '../../compiler/findComponentDefinition.js';
import { isSchemaPropComponentOrComponentCollection, isSchemaPropComponent } from '../../compiler/schema/index.js';
import { componentPickerOpened, itemInserted } from '../../events.js';
import { isLocalTextReference, resolveExternalValue, getResolvedExternalDataValue } from '../../resourcesUtils.js';
import { resop } from '../../responsiveness/resop.js';
import { Box } from '../Box/Box.js';
import { useEasyblocksExternalData } from '../EasyblocksExternalDataProvider.js';
import { useEasyblocksMetadata } from '../EasyblocksMetadataProvider.js';
import { responsiveValueValues } from '../../responsiveness/responsiveValueValues.js';
import { responsiveValueReduce } from '../../responsiveness/responsiveValueReduce.js';
import { isTrulyResponsiveValue } from '../../responsiveness/isTrulyResponsiveValue.js';
import { responsiveValueGetDefinedValue } from '../../responsiveness/responsiveValueGetDefinedValue.js';

var _excluded = ["compiled", "passedProps", "path", "components"],
  _excluded2 = ["ref", "__isSelected"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function buildBoxes(compiled, name, actionWrappers, meta) {
  if (Array.isArray(compiled)) {
    return compiled.map(function (x, index) {
      return buildBoxes(x, "".concat(name, ".").concat(index), actionWrappers, meta);
    });
  } else if (_typeof(compiled) === "object" && compiled !== null) {
    if (compiled.__isBox) {
      var boxProps = {
        __compiled: compiled,
        __name: name,
        devices: meta.vars.devices,
        stitches: meta.stitches
      };
      return /*#__PURE__*/React.createElement(Box, boxProps);
    }
    var ret = {};
    for (var key in compiled) {
      ret[key] = buildBoxes(compiled[key], key, actionWrappers, meta);
    }
    return ret;
  }
  return compiled;
}
function getComponentDefinition(compiled, runtimeContext) {
  return findComponentDefinitionById(compiled._component, runtimeContext);
}

/**
 * Checks whether:
 * 1. component is renderable (if all non-optional externals are defined)
 * 2. is data loading...
 * 3. gets fields that are not defined
 *
 * @param compiled
 * @param runtimeContext
 * @param rendererContext
 */

function getRenderabilityStatus(compiled, meta, externalData) {
  var status = {
    renderable: true,
    isLoading: false,
    fieldsRequiredToRender: new Set()
  };
  var componentDefinition = getComponentDefinition(compiled, {
    definitions: meta.vars.definitions
  });
  if (!componentDefinition) {
    return {
      renderable: false,
      isLoading: false,
      fieldsRequiredToRender: new Set()
    };
  }
  var requiredExternalFields = componentDefinition.schema.filter(function (schemaProp) {
    if (schemaProp.type === "text") {
      return false;
    }
    var propValue = compiled.props[schemaProp.prop];
    if (_typeof(propValue) === "object" && propValue !== null && "id" in propValue && "widgetId" in propValue) {
      if ("optional" in schemaProp) {
        return !schemaProp.optional;
      }
      return true;
    }
    return false;
  });
  if (requiredExternalFields.length === 0) {
    return status;
  }
  var _iterator = _createForOfIteratorHelper(requiredExternalFields),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var resourceSchemaProp = _step.value;
      var externalReference = compiled.props[resourceSchemaProp.prop];
      var fieldStatus = getFieldStatus(externalReference, externalData, compiled._id, resourceSchemaProp.prop, meta.vars.devices);
      status.isLoading = status.isLoading || fieldStatus.isLoading;
      status.renderable = status.renderable && fieldStatus.renderable;
      if (!fieldStatus.renderable && !fieldStatus.isLoading) {
        status.fieldsRequiredToRender.add(resourceSchemaProp.label || resourceSchemaProp.prop);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return status;
}
function getCompiledSubcomponents(id, compiledArray, contextProps, schemaProp, path, meta, isEditing, components) {
  var originalPath = path;
  if (schemaProp.type === "component-collection-localised") {
    path = path + "." + meta.vars.locale;
  }
  if (schemaProp.noInline) {
    var _elements = compiledArray.map(function (compiledChild, index) {
      return "_component" in compiledChild ? /*#__PURE__*/React.createElement(ComponentBuilder, {
        path: "".concat(path, ".").concat(index),
        compiled: compiledChild,
        components: components
      }) : compiledChild;
    });
    if (isSchemaPropComponent(schemaProp)) {
      return _elements[0];
    } else {
      return _elements;
    }
  }
  var EditableComponentBuilder = isEditing ? components["EditableComponentBuilder.editor"] : components["EditableComponentBuilder.client"];
  var elements = compiledArray.map(function (compiledChild, index) {
    return "_component" in compiledChild ? /*#__PURE__*/React.createElement(EditableComponentBuilder, {
      compiled: compiledChild,
      index: index,
      length: compiledArray.length,
      path: "".concat(path, ".").concat(index),
      components: components
    }) : compiledChild;
  });
  var Placeholder = components["Placeholder"];

  // TODO: this code should be editor-only
  if (isEditing && Placeholder && elements.length === 0 && !contextProps.noInline &&
  // We don't want to show add button for this type
  schemaProp.type !== "component-collection-localised") {
    var type = getComponentMainType(schemaProp.accepts);
    elements = [/*#__PURE__*/React.createElement(Placeholder, {
      id: id,
      path: path,
      type: type,
      appearance: schemaProp.placeholderAppearance,
      onClick: function onClick() {
        function handleComponentPickerCloseMessage(event) {
          if (event.data.type === "@easyblocks-editor/component-picker-closed") {
            window.removeEventListener("message", handleComponentPickerCloseMessage);
            if (event.data.payload.config) {
              window.parent.postMessage(itemInserted({
                name: path,
                index: 0,
                block: event.data.payload.config
              }));
            }
          }
        }
        window.addEventListener("message", handleComponentPickerCloseMessage);
        window.parent.postMessage(componentPickerOpened(originalPath));
      },
      meta: meta
    })];
  }
  if (isSchemaPropComponent(schemaProp)) {
    var _elements$;
    return (_elements$ = elements[0]) !== null && _elements$ !== void 0 ? _elements$ : /*#__PURE__*/React.createElement(Fragment, null);
  } else {
    return elements;
  }
}
function ComponentBuilder(props) {
  var compiled = props.compiled,
    passedProps = props.passedProps,
    path = props.path,
    components = props.components,
    restProps = _objectWithoutProperties(props, _excluded);
  var allPassedProps = _objectSpread(_objectSpread({}, passedProps), restProps);
  var meta = useEasyblocksMetadata();
  var externalData = useEasyblocksExternalData();

  /**
   * Component is build in editing mode only if compiled.__editing is set.
   * This is the result of compilation.
   * The only case when compiled.__editing is set is when we're in Editor and for non-nested components.
   */
  var isEditing = compiled.__editing !== undefined;
  var pathSeparator = path === "" ? "" : ".";

  // Here we know we must render just component, without any wrappers
  var componentDefinition = getComponentDefinition(compiled, {
    definitions: meta.vars.definitions
  });
  var component = getComponent(componentDefinition, components, isEditing);
  var isMissingComponent = compiled._component === "@easyblocks/missing-component";
  var isMissingInstance = component === undefined;
  var isMissing = isMissingComponent || isMissingInstance;
  var MissingComponent = components["@easyblocks/missing-component"];
  if (isMissing) {
    if (!isEditing) {
      return null;
    }
    if (isMissingComponent) {
      return /*#__PURE__*/React.createElement(MissingComponent, {
        error: true
      }, "Missing");
    } else {
      console.warn("Missing \"".concat(compiled._component, "\""));
      return /*#__PURE__*/React.createElement(MissingComponent, {
        component: componentDefinition,
        error: true
      }, "Missing");
    }
  }
  var Component = component;
  var renderabilityStatus = getRenderabilityStatus(compiled, meta, externalData);
  if (!renderabilityStatus.renderable) {
    var fieldsRequiredToRender = Array.from(renderabilityStatus.fieldsRequiredToRender);
    return /*#__PURE__*/React.createElement(MissingComponent, {
      component: componentDefinition
    }, "Fill following fields to render the component: ".concat(fieldsRequiredToRender.join(", ")), renderabilityStatus.isLoading && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Loading data..."));
  }
  var shopstoryCompiledConfig = compiled;

  // Shopstory component
  var styled = buildBoxes(shopstoryCompiledConfig.styled, "", {}, meta);

  // Styled
  componentDefinition.schema.forEach(function (schemaProp) {
    if (isSchemaPropComponentOrComponentCollection(schemaProp)) {
      var _shopstoryCompiledCon;
      var contextProps = ((_shopstoryCompiledCon = shopstoryCompiledConfig.__editing) === null || _shopstoryCompiledCon === void 0 || (_shopstoryCompiledCon = _shopstoryCompiledCon.components) === null || _shopstoryCompiledCon === void 0 ? void 0 : _shopstoryCompiledCon[schemaProp.prop]) || {};
      var compiledChildren = shopstoryCompiledConfig.components[schemaProp.prop];
      styled[schemaProp.prop] = getCompiledSubcomponents(compiled._id, compiledChildren, contextProps, schemaProp, "".concat(path).concat(pathSeparator).concat(schemaProp.prop), meta, isEditing, components);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var _ref = allPassedProps || {};
    _ref.ref;
    var __isSelected = _ref.__isSelected,
    restPassedProps = _objectWithoutProperties(_ref, _excluded2);
  var runtime = {
    stitches: meta.stitches,
    resop: resop,
    devices: meta.vars.devices
  };
  var easyblocksProp = {
    id: shopstoryCompiledConfig._id,
    isEditing: isEditing,
    path: path,
    runtime: runtime,
    isSelected: __isSelected
  };
  var componentProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, restPassedProps), mapExternalProps(shopstoryCompiledConfig.props, shopstoryCompiledConfig._id, componentDefinition, externalData)), styled), {}, {
    __easyblocks: easyblocksProp
  });
  return /*#__PURE__*/React.createElement(Component, componentProps);
}
function getComponent(componentDefinition, components, isEditing) {
  var component;

  // We first try to find editor version of that component
  if (isEditing) {
    component = components[componentDefinition.id + ".editor"];
  }

  // If it still missing, we try to find client version of that component
  if (!component) {
    component = components[componentDefinition.id + ".client"];
  }
  if (!component) {
    // In most cases we're going to pick component by its id
    component = components[componentDefinition.id];
  }
  return component;
}
function mapExternalProps(props, configId, componentDefinition, externalData) {
  var resultsProps = {};
  var _loop = function _loop(propName) {
    var schemaProp = componentDefinition.schema.find(function (currentSchema) {
      return currentSchema.prop === propName;
    });
    if (schemaProp) {
      var propValue = props[propName];
      if (schemaProp.type === "text" && isLocalTextReference(propValue, "text")) {
        resultsProps[propName] = propValue.value;
      } else if (
      // FIXME: this is a mess
      !isTrulyResponsiveValue(propValue) && _typeof(propValue) === "object" && "id" in propValue && "widgetId" in propValue && !("value" in propValue) || isTrulyResponsiveValue(propValue) && responsiveValueValues(propValue).every(function (v) {
        return _typeof(v) === "object" && v && "id" in v && "widgetId" in v && !("value" in v);
      })) {
        resultsProps[propName] = resolveExternalValue(propValue, configId, schemaProp, externalData);
      } else {
        resultsProps[propName] = props[propName];
      }
    } else {
      resultsProps[propName] = props[propName];
    }
  };
  for (var propName in props) {
    _loop(propName);
  }
  return resultsProps;
}
function getFieldStatus(externalReference, externalData, configId, fieldName, devices) {
  return responsiveValueReduce(externalReference, function (currentStatus, value, deviceId) {
    if (!deviceId) {
      if (!value.id) {
        return {
          isLoading: false,
          renderable: false
        };
      }
      var _externalValue = getResolvedExternalDataValue(externalData, configId, fieldName, value);
      return {
        isLoading: currentStatus.isLoading || _externalValue === undefined,
        renderable: currentStatus.renderable && _externalValue !== undefined && (_externalValue.type === "object" ? value.key !== undefined : true)
      };
    }
    if (currentStatus.isLoading || !currentStatus.renderable) {
      return currentStatus;
    }
    var externalReferenceValue = responsiveValueGetDefinedValue(value, deviceId, devices);
    if (!externalReferenceValue || externalReferenceValue.id === null) {
      return {
        isLoading: false,
        renderable: false
      };
    }
    var externalValue = getResolvedExternalDataValue(externalData, configId, fieldName, externalReferenceValue);
    return {
      isLoading: currentStatus.isLoading || externalValue === undefined,
      renderable: currentStatus.renderable && externalValue !== undefined && (externalValue.type === "object" ? externalReferenceValue.key !== undefined : true)
    };
  }, {
    renderable: true,
    isLoading: false
  }, devices);
}
function getComponentMainType(componentTypes) {
  var type;
  if (componentTypes.includes("action") || componentTypes.includes("actionLink")) {
    type = "action";
  } else if (componentTypes.includes("card")) {
    type = "card";
  } else if (componentTypes.includes("symbol")) {
    type = "icon";
  } else if (componentTypes.includes("button")) {
    type = "button";
  } else if (componentTypes.includes("section") || componentTypes.includes("token")) {
    type = "section";
  } else if (componentTypes.includes("item")) {
    type = "item";
  } else if (componentTypes.includes("image") || componentTypes.includes("$image")) {
    type = "image";
  } else if (componentTypes.includes("actionTextModifier")) {
    type = "actionTextModifier";
  } else {
    type = "item";
  }
  return type;
}

export { ComponentBuilder };
