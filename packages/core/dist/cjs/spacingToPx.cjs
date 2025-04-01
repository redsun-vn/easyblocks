/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./node_modules/.pnpm/@redsun-vn_easyblocks-reduce-css-calc@1.0.4/node_modules/@redsun-vn/easyblocks-reduce-css-calc/dist/index.cjs');

function parseSpacing(spacing) {
  if (spacing.endsWith("px")) {
    var value = parseFloat(spacing);
    if (isNaN(value)) {
      throw new Error("incorrect spacing: ".concat(spacing));
    }
    return {
      unit: "px",
      value: value
    };
  }
  if (spacing.endsWith("vw")) {
    var _value = parseFloat(spacing);
    if (isNaN(_value)) {
      throw new Error("incorrect spacing: ".concat(spacing));
    }
    return {
      unit: "vw",
      value: _value
    };
  }
  throw new Error("incorrect spacing: ".concat(spacing, "."));
}
function spacingToPx(spacing, width) {
  var reducedSpacing = index.reduceCSSCalc("calc(".concat(spacing, ")"), /* wrapping calc is necessary, otherwise max(10px,20px) doesn't work */
  {
    precision: 5,
    map: {
      vw: width,
      percent: width
    }
  });
  var parsed = parseSpacing(reducedSpacing);
  if (parsed.unit === "px") {
    return parsed.value;
  }
  throw new Error("Error while running spacingToPx for spacing: ".concat(spacing, " and width: ").concat(width));
}

exports.parseSpacing = parseSpacing;
exports.spacingToPx = spacingToPx;
