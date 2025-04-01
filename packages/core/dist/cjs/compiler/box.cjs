/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var flattenResponsiveStyles = require('./flattenResponsiveStyles.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

function compileBox(input, devices) {
  if (_typeof__default["default"](input) === "object" && input.$res) {
    var ret = {};
    for (var key in input) {
      if (key !== "$res") {
        ret["@" + key] = input[key];
      }
    }
    return ret;
  } else if (_typeof__default["default"](input) === "object" && input !== null) {
    var _ret = {};

    /**
     * FIXME: there's a bug here!!!
     *
     * I don't know what to do about it. We add items in a correct order to the ret object, and JS should keep this order
     * but it clearly doesn't work and order gets broken. This breaks where "unset" is set in CSS and hence, inheritance is broken.
     *
     * This can be fixed by adding "specific media queries" (from - to) here. It's gonna work.
     */

    for (var _key in input) {
      var val = input[_key];
      if (_typeof__default["default"](val) === "object" && val.$res === true) {
        // const maxBreakpoint = responsiveValueGetMaxDefinedBreakpoint(val, devices);

        var isFirst = true;
        for (var i = devices.length - 1; i >= 0; i--) {
          var breakpoint = devices[i].id;
          if (val[breakpoint] === null || val[breakpoint] === undefined) {
            continue;
          }
          if (isFirst) {
            _ret[_key] = val[breakpoint];
            isFirst = false;
          } else {
            if (!_ret["@" + breakpoint]) {
              _ret["@" + breakpoint] = {};
            }
            _ret["@" + breakpoint][_key] = val[breakpoint];
          }
        }
        continue;
      }
      _ret[_key] = compileBox(val, devices);
    }
    return _ret;
  }
  return input;
}
function getBoxStyles(styles, devices) {
  var flattenStyles = flattenResponsiveStyles.flattenResponsiveStyles(styles);
  var ret = {};

  // First copy all the non-responsive values
  for (var key in flattenStyles) {
    if (!key.startsWith("@") && key !== "__isBox" && key !== "__hash") {
      ret[key] = flattenStyles[key];
    }
  }

  // now copy breakpoint values in correct order
  for (var i = devices.length - 1; i >= 0; i--) {
    var device = devices[i];
    var breakpoint = device.id;

    // correct order!
    if (flattenStyles["@" + breakpoint]) {
      var resolvedKey = resolveDeviceIdToMediaQuery(device);
      ret[resolvedKey] = flattenStyles["@" + breakpoint];
    }
  }
  return ret;
}
function resolveDeviceIdToMediaQuery(device) {
  return "@media (max-width: ".concat(device.breakpoint - 1, "px)");
}

exports.compileBox = compileBox;
exports.getBoxStyles = getBoxStyles;
