/* with love from shopstory */
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { findPathOfFirstAncestorOfType } from '../../../parsePath.js';
import { richTextPartStyles } from './_richTextPart.styles.js';

var editing = function editing(_ref) {
  var editingInfo = _ref.editingInfo,
    __SECRET_INTERNALS__ = _ref.__SECRET_INTERNALS__;
  if (!__SECRET_INTERNALS__) {
    throw new Error("Missing __SECRET_INTERNALS__");
  }
  var pathPrefix = __SECRET_INTERNALS__.pathPrefix,
    editorContext = __SECRET_INTERNALS__.editorContext;
  var resultFields = [];
  var richTextPath = findPathOfFirstAncestorOfType(pathPrefix, "@easyblocks/rich-text", editorContext.form);
  var richTextBlockPath = findPathOfFirstAncestorOfType(pathPrefix, "@easyblocks/rich-text-block-element", editorContext.form);
  resultFields.push.apply(resultFields, [{
    type: "fields",
    path: richTextPath,
    filters: {
      group: ["Size", "Margins"]
    }
  }, {
    type: "field",
    path: "".concat(richTextPath, ".align")
  }].concat(_toConsumableArray(editingInfo.fields), [{
    type: "field",
    path: "".concat(richTextBlockPath, ".type")
  }, {
    type: "field",
    path: "".concat(richTextPath, ".isListStyleAuto")
  }, {
    type: "field",
    path: "".concat(richTextPath, ".mainFont")
  }, {
    type: "field",
    path: "".concat(richTextPath, ".mainColor")
  }, {
    type: "fields",
    path: richTextPath,
    filters: {
      group: ["Accessibility and SEO"]
    }
  }]));
  return {
    fields: resultFields
  };
};
var richTextPartEditableComponent = {
  id: "@easyblocks/rich-text-part",
  label: "Text",
  schema: [{
    prop: "value",
    type: "string",
    visible: false,
    group: "Text"
  }, {
    prop: "font",
    label: "Style",
    type: "font",
    group: "Text"
  }, {
    prop: "color",
    label: "Color",
    type: "color",
    group: "Text"
  }, {
    prop: "TextWrapper",
    label: "Text Wrapper",
    type: "component",
    noInline: true,
    accepts: ["@easyblocks/text-wrapper"],
    visible: true,
    group: "Text Wrapper",
    isLabelHidden: true
  }],
  editing: editing,
  styles: richTextPartStyles
};

export { richTextPartEditableComponent };
