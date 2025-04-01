/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _typeof = require('@babel/runtime/helpers/typeof');
var index = require('./schema/index.cjs');
var responsiveValueNormalize = require('../responsiveness/responsiveValueNormalize.cjs');
var responsiveValueGet = require('../responsiveness/responsiveValueGet.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 *  Input like: { breakpoint1: sth, breakpoint2: sth, breakpoint3: sth, ... }
 */
function squashCSSResults(scalarValues, devices, disableNesting) {
  // Let's check whether scalarValues represent object (for nesting) or a scalar value.
  var objectsNum = 0;
  var noObjectsNum = 0;
  var arraysNum = 0;
  for (var breakpointName in scalarValues) {
    var val = scalarValues[breakpointName];
    if (Array.isArray(val) && !disableNesting) {
      arraysNum++;
    } else if (_typeof__default["default"](val) === "object" && val !== null && !Array.isArray(val) && !disableNesting) {
      objectsNum++;
    } else if (val !== null && val !== undefined) {
      noObjectsNum++;
    }
  }

  // Only one flag can be > 0!!! Otherwise breakpoints return incompatible types
  if (objectsNum > 0 && (noObjectsNum > 0 || arraysNum > 0) || arraysNum > 0 && (noObjectsNum > 0 || objectsNum > 0) || noObjectsNum > 0 && (arraysNum > 0 || objectsNum > 0)) {
    throw new Error("This shouldn't happen. Mismatched types for different breakpoints!!!");
  }
  if (arraysNum > 0) {
    var biggestArrayLength = 0;
    for (var breakpoint in scalarValues) {
      biggestArrayLength = Math.max(biggestArrayLength, scalarValues[breakpoint].length); // {...allKeysObject, ...scalarValues[breakpoint]};
    }
    var ret = [];
    for (var i = 0; i < biggestArrayLength; i++) {
      var newScalarValues = {};
      for (var _breakpoint in scalarValues) {
        var value = undefined;
        if (scalarValues[_breakpoint]) {
          value = scalarValues[_breakpoint][i];
        }
        newScalarValues[_breakpoint] = value;
      }
      ret[i] = squashCSSResults(newScalarValues, devices);
    }
    return ret;
  }

  // If object -> recursion
  if (objectsNum > 0) {
    // allKeys is the object that has all the keys from all the scalar configs
    var allKeysObject = {};

    /**
     * Scalar values are like:
     *
     * {
     *    b1: { a: 10, b: 20 }
     *    b2: { a: 100, c: 300 }
     * }
     */

    for (var _breakpoint2 in scalarValues) {
      allKeysObject = _objectSpread(_objectSpread({}, allKeysObject), scalarValues[_breakpoint2]);
    }

    // scalarValues.forEach(scalarConfig => {
    //     allKeysObject = {...allKeysObject, ...scalarConfig};
    // });

    var allKeys = Object.keys(allKeysObject);
    var _ret = {};

    /**
     * All keys are like: ['a', 'b', 'c']
     *
     * All used keys across all breakpoints
     */

    allKeys.forEach(function (key) {
      var newScalarValues = {};
      for (var _breakpoint3 in scalarValues) {
        var _value = undefined;
        if (scalarValues[_breakpoint3]) {
          _value = scalarValues[_breakpoint3][key];
        }
        newScalarValues[_breakpoint3] = _value;
      }
      /**
       * newScalarValues values are like:
       *
       * For key 'a':
       * {
       *      b1: 10,
       *      b2: 100
       * }
       *
       * For key 'b':
       * {
       *     b1: 20,
       *     b2: undefined
       * }
       *
       */

      /**
       * For fonts we don't want nesting + recursion. We want entire object to be passed to results.
       *
       * Later, renderer must know how to render xfont property :)
       *
       * Otherwise, media query conflicts arise and bad values are set.
       */
      _ret[key] = squashCSSResults(newScalarValues, devices, key === "xfont");
    });
    return _ret;
  }

  // Here we are sure we have scalar value, not some object to be nested. We must do 2 things:
  // - add "unset" instead of null / undefined
  // - create ResponsiveValue and normalize

  for (var _key in scalarValues) {
    if (scalarValues[_key] === undefined || scalarValues[_key] === null) {
      scalarValues[_key] = "unset";
    }
  }

  // Values (non-objects -> no nesting)
  return responsiveValueNormalize.responsiveValueNormalize(_objectSpread(_objectSpread({}, scalarValues), {}, {
    $res: true
  }), devices);
}
function scalarizeNonComponentProp(value, breakpoint, schemaProp) {
  if (schemaProp) {
    // This function should never be called with component type
    if (schemaProp.type.startsWith("component")) {
      throw new Error("unreachable");
    }

    // Text values aren't responsive
    if (schemaProp.type === "text") {
      return value;
    }

    // other props are potentially responsive, so let's run responsiveValueGet
    return responsiveValueGet.responsiveValueForceGet(value, breakpoint);
  }

  // for context props we just treat them as responsive
  return responsiveValueGet.responsiveValueForceGet(value, breakpoint);
}
function scalarizeCollection(configs, breakpoint, devices, itemFieldsSchema) {
  return configs.map(function (child) {
    var scalarizedChild = _objectSpread({}, child);
    var _loop = function _loop() {
      var _Object$entries$_i = _slicedToArray__default["default"](_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      var schemaProp = itemFieldsSchema.find(function (itemFieldSchemaProp) {
        return itemFieldSchemaProp.prop === key;
      });
      if (schemaProp) {
        scalarizedChild[schemaProp.prop] = scalarizeNonComponentProp(value, breakpoint, schemaProp);
      } else {
        scalarizedChild[key] = scalarizeNonComponentProp(value, breakpoint);
      }
    };
    for (var _i = 0, _Object$entries = Object.entries(scalarizedChild); _i < _Object$entries.length; _i++) {
      _loop();
    }
    return scalarizedChild;
  });
}
function scalarizeConfig(config, breakpoint, devices, schema) {
  var ret = {};

  /**
   * There is a bit of chaos here. To understand what is happening, we must know what "Config" is in context of resop.
   *
   * Config is not a "real" config we're using in the Shopstory in almost all places. We're dealing here with "intermediate compiled config" used during compilation. What it means:
   * 1. It has _component, _id, etc.
   * 2. All the props from schema that are *not* components are compiled and are available.
   * 3. All the props from schema that are components have only _component and _id (exception below)
   * 4. component-collections has child Configs that have item props that are also compiled and are added *to the root level of the config*. They're simply context props. (IMPORTANT! -> localised is already non-localised ;p)
   * 5. context props from compilation are also added to the config.
   *
   * PROBLEM:
   *
   * As long as we know the component "own props" (we have schema) and item props, we have no idea about context props types. It means that we can only blindly apply responsiveValueGet on them.
   *
   * SOLUTION:
   *
   * context props should be typed. Each editable component should have schema of own props and of context props.
   *
   */
  var _loop2 = function _loop2(prop) {
    var schemaProp = schema.find(function (x) {
      return x.prop === prop;
    });

    // If schemaProp is defined, it means "own prop". Otherwise it must be a context prop (they're not "typed" yet and we don't have any information what types of context props we have)
    if (schemaProp) {
      // subcomponents don't get scalarized
      if (index.isSchemaPropComponent(schemaProp)) {
        ret[prop] = config[prop];
      }
      // component collection should have item props scalarized. We know the types of item props!
      // component collection localised is already dealing with value that is NON-LOCALISED (it was flattened earlier)
      else if (index.isSchemaPropCollection(schemaProp)) {
        ret[prop] = scalarizeCollection(config[prop], breakpoint, devices, schemaProp.itemFields || []);
      } else {
        ret[prop] = scalarizeNonComponentProp(config[prop], breakpoint, schemaProp);
      }
    } else {
      // context props automatically get scalarized
      ret[prop] = scalarizeNonComponentProp(config[prop], breakpoint);
    }
  };
  for (var prop in config) {
    _loop2(prop);
  }
  return ret;
}
function getUndefinedBreakpoints(resVal, devices) {
  var undefinedBreakpoints = [];
  devices.forEach(function (device) {
    if (resVal[device.id] === undefined) {
      undefinedBreakpoints.push(device.id);
    }
  });
  return undefinedBreakpoints;
}
function hasDefinedBreakpoints(resVal, devices) {
  var undefinedBreakpoints = getUndefinedBreakpoints(resVal, devices);
  return undefinedBreakpoints.length < devices.length;
}
function resop2(input, callback, devices, componentDefinition) {
  var _componentDefinition$;
  var schema = (_componentDefinition$ = componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.schema) !== null && _componentDefinition$ !== void 0 ? _componentDefinition$ : [];

  // Decompose config into scalar configs
  var scalarInputs = {};
  devices.forEach(function (device) {
    scalarInputs[device.id] = {
      params: scalarizeConfig(input.params, device.id, devices, []),
      values: scalarizeConfig(input.values, device.id, devices, schema)
    };
  });
  var scalarOutputs = {};

  // run callback for scalar configs
  devices.forEach(function (device) {
    scalarOutputs[device.id] = callback(scalarInputs[device.id], device.id);
  });

  /**
   * Let's first squash all __props, components and item props
   */

  var componentPropNames = {};
  var componentItemPropsNamesAndLength = {};
  var propNames = new Set();

  // Let's add keys
  schema.forEach(function (schemaProp) {
    if (index.isSchemaPropComponentOrComponentCollection(schemaProp)) {
      componentPropNames[schemaProp.prop] = new Set();
    }
    if (index.isSchemaPropCollection(schemaProp)) {
      componentItemPropsNamesAndLength[schemaProp.prop] = {
        lengths: new Set(),
        names: new Set()
      };
    }
  });

  // Let's find all output prop names
  devices.forEach(function (device) {
    var _scalarOutputs$device;
    // prop names
    var propsObject = (_scalarOutputs$device = scalarOutputs[device.id].props) !== null && _scalarOutputs$device !== void 0 ? _scalarOutputs$device : {};
    if (_typeof__default["default"](propsObject) !== "object" || propsObject === null) {
      throw new Error("__props must be object, it is not for breakpoint: ".concat(device.id));
    }
    for (var propName in propsObject) {
      propNames.add(propName);
    }

    // component prop names
    schema.forEach(function (schemaProp) {
      if (index.isSchemaPropComponentOrComponentCollection(schemaProp)) {
        var _scalarOutputs$device2, _scalarOutputs$device3;
        var componentObject = (_scalarOutputs$device2 = (_scalarOutputs$device3 = scalarOutputs[device.id].components) === null || _scalarOutputs$device3 === void 0 ? void 0 : _scalarOutputs$device3[schemaProp.prop]) !== null && _scalarOutputs$device2 !== void 0 ? _scalarOutputs$device2 : {};
        if (_typeof__default["default"](componentObject) !== "object" || componentObject === null) {
          throw new Error("resop error: component must be undefined or an object, it is not for device ".concat(device.id, " and prop ").concat(schemaProp.prop, ". Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
        }
        for (var _key2 in componentObject) {
          if (_key2 === "itemProps") {
            continue;
          }
          componentPropNames[schemaProp.prop].add(_key2);
        }
        if (index.isSchemaPropCollection(schemaProp)) {
          var _componentObject$item;
          var itemPropsArray = (_componentObject$item = componentObject.itemProps) !== null && _componentObject$item !== void 0 ? _componentObject$item : [];
          if (!Array.isArray(itemPropsArray)) {
            throw new Error("resop error: item props must be undefined or an array (".concat(schemaProp.prop, "). Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
          }
          itemPropsArray.forEach(function (itemObject, index) {
            if (_typeof__default["default"](itemObject) !== "object" || itemObject === null) {
              throw new Error("resop error: item in itemProps array must be object (".concat(schemaProp.prop, ".itemProps.").concat(index, "). Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
            }
            for (var _key3 in itemObject) {
              componentItemPropsNamesAndLength[schemaProp.prop].names.add(_key3);
            }
          });
          componentItemPropsNamesAndLength[schemaProp.prop].lengths.add(itemPropsArray.length);
        }
      }
    });
  });

  // Let's verify array lengths
  for (var componentName in componentItemPropsNamesAndLength) {
    var lengths = componentItemPropsNamesAndLength[componentName].lengths;
    if (lengths.size > 1) {
      throw new Error("resop: incompatible item props arrays length for component: ".concat(componentName, ". Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
    }
    var length = Array.from(lengths)[0];

    // If non-zero length, then there are extra requirements
    if (length > 0) {
      var itemsLength = input.values[componentName].length;
      if (itemsLength === 0 ? length > 1 : itemsLength !== length) {
        throw new Error("resop: item props arrays length incompatible with items length for component: ".concat(componentName, ". Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
      }
    }
  }

  // Let's compress
  var output = {
    props: {},
    components: {},
    styled: {}
  };

  // squash props
  propNames.forEach(function (propName) {
    var squashedValue = {
      $res: true
    };
    devices.forEach(function (device) {
      var _scalarOutputs$device4;
      squashedValue[device.id] = (_scalarOutputs$device4 = scalarOutputs[device.id]) === null || _scalarOutputs$device4 === void 0 || (_scalarOutputs$device4 = _scalarOutputs$device4.props) === null || _scalarOutputs$device4 === void 0 ? void 0 : _scalarOutputs$device4[propName];
    });
    if (hasDefinedBreakpoints(squashedValue, devices)) {
      var undefinedBreakpoints = getUndefinedBreakpoints(squashedValue, devices);
      if (undefinedBreakpoints.length > 0) {
        throw new Error("resop: undefined value (breakpoints: ".concat(undefinedBreakpoints, ") for __props.").concat(propName, ". Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
      }
      output.props[propName] = responsiveValueNormalize.responsiveValueNormalize(squashedValue, devices); // props should be normalized
    }
  });

  // Squash components
  var _loop3 = function _loop3(_componentName) {
    output.components[_componentName] = {};
    componentPropNames[_componentName].forEach(function (componentPropName) {
      var squashedValue = {
        $res: true
      };
      devices.forEach(function (device) {
        var _scalarOutputs$device5;
        squashedValue[device.id] = (_scalarOutputs$device5 = scalarOutputs[device.id].components) === null || _scalarOutputs$device5 === void 0 || (_scalarOutputs$device5 = _scalarOutputs$device5[_componentName]) === null || _scalarOutputs$device5 === void 0 ? void 0 : _scalarOutputs$device5[componentPropName];
      });
      if (hasDefinedBreakpoints(squashedValue, devices)) {
        var undefinedBreakpoints = getUndefinedBreakpoints(squashedValue, devices);
        if (undefinedBreakpoints.length > 0) {
          throw new Error("resop: undefined value (breakpoints ".concat(undefinedBreakpoints, ") for ").concat(_componentName, ".").concat(componentPropName, ". Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
        }
        output.components[_componentName][componentPropName] = squashedValue;
      }
    });
  };
  for (var _componentName in componentPropNames) {
    _loop3(_componentName);
  }

  // Squash item props
  var _loop4 = function _loop4(_componentName2) {
    output.components[_componentName2].itemProps = [];
    var length = Array.from(componentItemPropsNamesAndLength[_componentName2].lengths)[0];
    var _loop5 = function _loop5(i) {
      output.components[_componentName2].itemProps[i] = {};
      componentItemPropsNamesAndLength[_componentName2].names.forEach(function (itemPropName) {
        var squashedValue = {
          $res: true
        };
        devices.forEach(function (device) {
          var _scalarOutputs$device6;
          squashedValue[device.id] = (_scalarOutputs$device6 = scalarOutputs[device.id].components) === null || _scalarOutputs$device6 === void 0 || (_scalarOutputs$device6 = _scalarOutputs$device6[_componentName2]) === null || _scalarOutputs$device6 === void 0 || (_scalarOutputs$device6 = _scalarOutputs$device6.itemProps) === null || _scalarOutputs$device6 === void 0 || (_scalarOutputs$device6 = _scalarOutputs$device6[i]) === null || _scalarOutputs$device6 === void 0 ? void 0 : _scalarOutputs$device6[itemPropName];
        });
        if (hasDefinedBreakpoints(squashedValue, devices)) {
          var undefinedBreakpoints = getUndefinedBreakpoints(squashedValue, devices);
          if (undefinedBreakpoints.length > 0) {
            throw new Error("resop: undefined value (breakpoints ".concat(undefinedBreakpoints, ") for ").concat(_componentName2, ".").concat(i, ".").concat(itemPropName, ". Template: ").concat(componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.id));
          }
          output.components[_componentName2].itemProps[i][itemPropName] = squashedValue;
        }
      });
    };
    for (var i = 0; i < length; i++) {
      _loop5(i);
    }
  };
  for (var _componentName2 in componentItemPropsNamesAndLength) {
    _loop4(_componentName2);
  }
  var styledOnlyScalarOutputs = Object.fromEntries(Object.entries(scalarOutputs).map(function (_ref) {
    var _ref2 = _slicedToArray__default["default"](_ref, 2),
      deviceId = _ref2[0],
      result = _ref2[1];
    return [deviceId, result.styled];
  }));
  output.styled = squashCSSResults(styledOnlyScalarOutputs, devices);
  return output;
}

exports.resop2 = resop2;
exports.scalarizeConfig = scalarizeConfig;
