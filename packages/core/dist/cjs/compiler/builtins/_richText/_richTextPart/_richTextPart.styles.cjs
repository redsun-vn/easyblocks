/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DEFAULT_FONT_VALUES = {
  fontWeight: "initial",
  fontStyle: "initial"
};
function richTextPartStyles(_ref) {
  var _ref$values = _ref.values,
    color = _ref$values.color,
    font = _ref$values.font,
    TextWrapper = _ref$values.TextWrapper,
    isEditing = _ref.isEditing;
  var fontWithDefaults = _objectSpread(_objectSpread({}, DEFAULT_FONT_VALUES), font);
  var hasTextWrapper = TextWrapper.length > 0;
  var textStyles = _objectSpread({
    __as: "span",
    color: color
  }, fontWithDefaults);
  if (hasTextWrapper && !isEditing) {
    // Force pointer events to be enabled on the text when text wrapper is attached and we're not editing
    textStyles.pointerEvents = "auto";
  }
  if (isEditing) {
    // When editing, we're going to have nested spans rendered by Slate so we need to make sure they inherit the font
    // styles defined on Text component
    textStyles['& [data-slate-string="true"]'] = {
      fontFamily: "inherit",
      fontStyle: "inherit",
      color: "inherit"
    };
  }
  return {
    styled: {
      Text: textStyles
    }
  };
}

exports.richTextPartStyles = richTextPartStyles;
