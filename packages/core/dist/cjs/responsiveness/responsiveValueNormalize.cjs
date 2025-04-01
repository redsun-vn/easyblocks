/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var isTrulyResponsiveValue = require('./isTrulyResponsiveValue.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

function responsiveValueNormalize(arg, devices) {
  if (!isTrulyResponsiveValue.isTrulyResponsiveValue(arg)) {
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
    if (_typeof__default["default"](val) === "object" && val !== null) {
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

exports.responsiveValueNormalize = responsiveValueNormalize;
