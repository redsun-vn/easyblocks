/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function textStyles(_ref) {
  var values = _ref.values,
    params = _ref.params;
  var align = params.passedAlign || "left";
  var fontWithDefaults = _objectSpread({
    fontWeight: "initial",
    fontStyle: "initial"
  }, values.font);
  return {
    styled: {
      Text: _objectSpread(_objectSpread({}, fontWithDefaults), {}, {
        __as: values.accessibilityRole,
        color: values.color,
        textAlign: align,
        "& textarea::placeholder": {
          color: "currentColor",
          opacity: 0.5
        },
        "& textarea": _objectSpread(_objectSpread({}, fontWithDefaults), {}, {
          color: values.color
        }),
        border: values.value === "" ? "1px dotted grey" : "none"
      })
    }
  };
}

exports.textStyles = textStyles;
