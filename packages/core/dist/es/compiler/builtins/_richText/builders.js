/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { uniqueId } from '@redsun-vn/easyblocks-utils';

function buildRichTextNoCodeEntry(options) {
  var _ref = options !== null && options !== void 0 ? options : {},
    accessibilityRole = _ref.accessibilityRole,
    font = _ref.font,
    color = _ref.color,
    text = _ref.text,
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? "en" : _ref$locale;
  var colorTokenValue = {
    value: "#000000",
    widgetId: "@easyblocks/color"
  };
  if (color) {
    colorTokenValue.tokenId = color;
  }
  var fontTokenValue = {
    value: {
      fontFamily: "sans-serif",
      fontSize: "16px"
    }
  };
  if (font) {
    fontTokenValue.tokenId = font;
  }
  return {
    _id: uniqueId(),
    _component: "@easyblocks/rich-text",
    accessibilityRole: accessibilityRole !== null && accessibilityRole !== void 0 ? accessibilityRole : "div",
    elements: _defineProperty({}, locale !== null && locale !== void 0 ? locale : "en", [buildRichTextBlockElementComponentConfig("paragraph", [buildRichTextLineElementComponentConfig({
      elements: [buildRichTextPartComponentConfig({
        color: colorTokenValue,
        font: fontTokenValue,
        value: text !== null && text !== void 0 ? text : "Lorem ipsum",
        TextWrapper: []
      })]
    })])]),
    isListStyleAuto: true,
    mainColor: colorTokenValue,
    mainFont: fontTokenValue
  };
}
function buildRichTextComponentConfig(_ref2) {
  var accessibilityRole = _ref2.accessibilityRole,
    locale = _ref2.locale,
    elements = _ref2.elements,
    isListStyleAuto = _ref2.isListStyleAuto,
    mainColor = _ref2.mainColor,
    mainFont = _ref2.mainFont;
  return {
    _id: uniqueId(),
    _component: "@easyblocks/rich-text",
    accessibilityRole: accessibilityRole !== null && accessibilityRole !== void 0 ? accessibilityRole : "div",
    elements: _defineProperty({}, locale, elements),
    isListStyleAuto: isListStyleAuto !== null && isListStyleAuto !== void 0 ? isListStyleAuto : true,
    mainColor: mainColor,
    mainFont: mainFont
  };
}
function buildRichTextBlockElementComponentConfig(type, elements) {
  return {
    _component: "@easyblocks/rich-text-block-element",
    elements: elements,
    type: type,
    _id: uniqueId()
  };
}
function buildRichTextParagraphBlockElementComponentConfig(_ref3) {
  var elements = _ref3.elements;
  return {
    _component: "@easyblocks/rich-text-block-element",
    elements: elements,
    type: "paragraph",
    _id: uniqueId()
  };
}
function buildRichTextBulletedListBlockElementComponentConfig(_ref4) {
  var elements = _ref4.elements;
  return {
    _component: "@easyblocks/rich-text-block-element",
    elements: elements,
    type: "bulleted-list",
    _id: uniqueId()
  };
}
function buildRichTextLineElementComponentConfig(_ref5) {
  var elements = _ref5.elements;
  return {
    _component: "@easyblocks/rich-text-line-element",
    elements: elements,
    _id: uniqueId()
  };
}
function buildRichTextPartComponentConfig(_ref6) {
  var color = _ref6.color,
    font = _ref6.font,
    value = _ref6.value,
    id = _ref6.id,
    TextWrapper = _ref6.TextWrapper;
  return {
    _id: id !== null && id !== void 0 ? id : uniqueId(),
    _component: "@easyblocks/rich-text-part",
    color: color,
    font: font,
    value: value,
    TextWrapper: TextWrapper !== null && TextWrapper !== void 0 ? TextWrapper : []
  };
}

export { buildRichTextBlockElementComponentConfig, buildRichTextBulletedListBlockElementComponentConfig, buildRichTextComponentConfig, buildRichTextLineElementComponentConfig, buildRichTextNoCodeEntry, buildRichTextParagraphBlockElementComponentConfig, buildRichTextPartComponentConfig };
