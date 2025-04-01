/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var $text_styles = require('./_text.styles.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var textEditableComponent = {
  id: "@easyblocks/text",
  label: "Simple Text",
  styles: $text_styles.textStyles,
  type: "item",
  thumbnail: "https://shopstory.s3.eu-central-1.amazonaws.com/picker_icon_text.png",
  schema: [{
    prop: "value",
    label: "Text",
    type: "text"
  }, {
    prop: "color",
    label: "Color",
    type: "color"
  }, {
    prop: "font",
    label: "Font",
    type: "font"
  }, {
    prop: "accessibilityRole",
    type: "select",
    label: "Role",
    params: {
      options: [{
        value: "p",
        label: "Paragraph"
      }].concat(_toConsumableArray__default["default"](easyblocksUtils.range(1, 6).map(function (index) {
        return {
          value: "h".concat(index),
          label: "Heading ".concat(index)
        };
      })))
    },
    group: "Accessibility and SEO"
  }]
};

exports.textEditableComponent = textEditableComponent;
