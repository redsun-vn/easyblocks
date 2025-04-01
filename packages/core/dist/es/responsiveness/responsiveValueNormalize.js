/* with love from shopstory */
import _typeof from '@babel/runtime/helpers/typeof';
import { isTrulyResponsiveValue } from './isTrulyResponsiveValue.js';

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

export { responsiveValueNormalize };
