/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _typeof from '@babel/runtime/helpers/typeof';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function resop(config, callback, devices) {
  // Decompose config into scalar configs
  var scalarConfigs = {};
  devices.forEach(function (device) {
    scalarConfigs[device.id] = scalarizeConfig(config, device.id);
  });
  var scalarOutputs = {};

  // run callback for scalar configs
  devices.forEach(function (device) {
    scalarOutputs[device.id] = callback(scalarConfigs[device.id], device.id);
  });
  return squashCSSResults(scalarOutputs, devices);
}
function squashCSSResults(scalarValues, devices, disableNesting) {
  // Let's check whether scalarValues represent object (for nesting) or a scalar value.
  var objectsNum = 0;
  var noObjectsNum = 0;
  var arraysNum = 0;
  for (var breakpointName in scalarValues) {
    var val = scalarValues[breakpointName];
    if (Array.isArray(val) && !disableNesting) {
      arraysNum++;
    } else if (_typeof(val) === "object" && val !== null && !Array.isArray(val) && !disableNesting) {
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
  return responsiveValueNormalize(_objectSpread(_objectSpread({}, scalarValues), {}, {
    $res: true
  }), devices);
}
function responsiveValueForceGet(value, deviceId) {
  if (isTrulyResponsiveValue(value)) {
    if (value[deviceId] === undefined) {
      var error = "You called responsiveValueForceGet with value ".concat(JSON.stringify(value), " and deviceId: ").concat(deviceId, ". Value undefined.");
      throw new Error(error);
    }
    return value[deviceId];
  }
  return value;
}
function isTrulyResponsiveValue(x) {
  return _typeof(x) === "object" && x !== null && !Array.isArray(x) && x.$res === true;
}
function responsiveValueNormalize(arg, devices) {
  if (!isTrulyResponsiveValue(arg)) {
    return arg;
  }
  var previousVal = undefined;
  var ret = {
    $res: true
  };
  var numberOfDefinedValues = 0;
  for (var i = devices.length - 1; i >= 0; i--) {
    var breakpoint = devices[i].id;
    var val = arg[breakpoint];

    // TODO: if values are objects, it's to do
    if (_typeof(val) === "object" && val !== null) {
      if (JSON.stringify(val) !== JSON.stringify(previousVal)) {
        ret[breakpoint] = val;
        previousVal = val;
        numberOfDefinedValues++;
      }
    } else {
      if (val !== undefined && val !== previousVal) {
        ret[breakpoint] = val;
        previousVal = val;
        numberOfDefinedValues++;
      }
    }

    // [x, null, null, y] => [x, y]
    if (i < devices.length - 1) {
      var nextBreakpoint = devices[i + 1].id;
      if (numberOfDefinedValues === 1 && ret[breakpoint] === undefined && ret[nextBreakpoint] !== undefined) {
        ret[breakpoint] = ret[nextBreakpoint];
        delete ret[nextBreakpoint];
      }
    }
  }
  if (numberOfDefinedValues === 1) {
    return ret[devices[0].id];
  }
  return ret;
}
function scalarizeConfig(config, breakpoint) {
  var ret = {};
  for (var prop in config) {
    ret[prop] = responsiveValueForceGet(config[prop], breakpoint);
  }
  return ret;
}

export { resop };
