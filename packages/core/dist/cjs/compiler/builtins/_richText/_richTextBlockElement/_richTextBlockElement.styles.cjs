/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function px(value) {
  if (typeof value === "number") {
    return value === 0 ? "0" : "".concat(value, "px");
  }
  return value;
}
var BULLETED_LIST_MIN_INLINE_SPACING = 8;
var NUMBERED_LIST_MIN_COUNTER_SPACING = 8;
var NUMBERED_LIST_MAX_COUNTER_SPACING = "0.5ch";
/**
 * Numbered list consists of number and dot. We can safely calculate required space for number by
 * counting digits of list length and using `ch` unit. Dot character differentiate between fonts
 * and we reserve at least 0.5ch of space.
 */
var NUMBERED_LIST_DOT_CHARACTER_SAFE_WIDTH = "0.5ch";
var BULLET_CHARACTER = "\u2022";
function richTextBlockElementStyles(_ref) {
  var _ref$values = _ref.values,
    elements = _ref$values.elements,
    type = _ref$values.type,
    _ref$params = _ref.params,
    accessibilityRole = _ref$params.accessibilityRole,
    align = _ref$params.align,
    mainColor = _ref$params.mainColor,
    mainFont = _ref$params.mainFont,
    mainFontSize = _ref$params.mainFontSize;
  var maxDigitsCount = elements.length.toString().length;
  var paddingInline = "clamp(".concat(px(BULLETED_LIST_MIN_INLINE_SPACING), ", calc(").concat(px(mainFontSize), " * 0.5), ").concat(px(mainFontSize), ")");
  var bulletedListMarkerStyles = {
    paddingLeft: paddingInline,
    paddingRight: paddingInline,
    content: BULLET_CHARACTER
  };
  var numberedListMarkerStyles = {
    minWidth: "calc(".concat(maxDigitsCount, " * 1ch + ").concat(NUMBERED_LIST_DOT_CHARACTER_SAFE_WIDTH, ")"),
    paddingRight: "clamp(".concat(px(NUMBERED_LIST_MIN_COUNTER_SPACING), ", 0.5ch, ").concat(NUMBERED_LIST_MAX_COUNTER_SPACING, ")"),
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
    content: "counter(list-item)\".\""
  };
  var markerStyles = _objectSpread({
    boxSizing: "content-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 0,
    flexShrink: 0,
    fontSize: mainFontSize
  }, type === "bulleted-list" ? bulletedListMarkerStyles : numberedListMarkerStyles);
  var listStyles = _objectSpread(_objectSpread({
    counterSet: "list-item",
    paddingLeft: 0,
    listStyle: "none",
    color: mainColor
  }, mainFont), {}, {
    "& > li": _objectSpread(_objectSpread({
      color: mainColor
    }, mainFont), {}, {
      // Instead of using ::marker pseudo-element, we use ::before because it gives us more control over its appearance.
      "&::before": markerStyles
    })
  });
  return {
    styled: {
      Paragraph: {
        __as: accessibilityRole
      },
      BulletedList: _objectSpread({
        __as: "ul"
      }, listStyles),
      NumberedList: _objectSpread({
        __as: "ol"
      }, listStyles)
    },
    components: {
      elements: {
        itemProps: elements.map(function () {
          return {
            blockType: type,
            align: align
          };
        })
      }
    }
  };
}

exports.richTextBlockElementStyles = richTextBlockElementStyles;
