/* with love from shopstory */
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { range } from '@redsun-vn/easyblocks-utils';
import { textStyles } from './_text.styles.js';

var textEditableComponent = {
  id: "@easyblocks/text",
  label: "Simple Text",
  styles: textStyles,
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
      }].concat(_toConsumableArray(range(1, 6).map(function (index) {
        return {
          value: "h".concat(index),
          label: "Heading ".concat(index)
        };
      })))
    },
    group: "Accessibility and SEO"
  }]
};

export { textEditableComponent };
