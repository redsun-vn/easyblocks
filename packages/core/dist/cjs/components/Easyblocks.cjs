'use client';
/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var $richText_client = require('../compiler/builtins/_richText/_richText.client.cjs');
var $richTextBlockElement_client = require('../compiler/builtins/_richText/_richTextBlockElement/_richTextBlockElement.client.cjs');
var $richTextLineElement_client = require('../compiler/builtins/_richText/_richTextLineElement/_richTextLineElement.client.cjs');
var $richTextPart_client = require('../compiler/builtins/_richText/_richTextPart/_richTextPart.client.cjs');
var $text_client = require('../compiler/builtins/_text/_text.client.cjs');
var ComponentBuilder = require('./ComponentBuilder/ComponentBuilder.cjs');
var EasyblocksExternalDataProvider = require('./EasyblocksExternalDataProvider.cjs');
var EasyblocksMetadataProvider = require('./EasyblocksMetadataProvider.cjs');
var MissingComponent = require('./MissingComponent.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var builtinComponents = {
  "@easyblocks/missing-component": MissingComponent.MissingComponent,
  "@easyblocks/rich-text.client": $richText_client.RichTextClient,
  "@easyblocks/rich-text-block-element": $richTextBlockElement_client.RichTextBlockElementClient,
  "@easyblocks/rich-text-line-element": $richTextLineElement_client.RichTextLineElementClient,
  "@easyblocks/rich-text-part": $richTextPart_client.RichTextPartClient,
  "@easyblocks/text.client": $text_client.TextClient,
  "EditableComponentBuilder.client": ComponentBuilder.ComponentBuilder
};
function Easyblocks(_ref) {
  var renderableDocument = _ref.renderableDocument,
    externalData = _ref.externalData,
    componentOverrides = _ref.componentOverrides,
    components = _ref.components;
  React.useEffect(function () {
    document.documentElement.style.setProperty("--shopstory-viewport-width", "calc(100vw - ".concat(window.innerWidth - document.documentElement.clientWidth, "px)"));
  });
  var renderableContent = renderableDocument.renderableContent;
  if (renderableContent === null) {
    return null;
  }
  if (componentOverrides) {
    var overridesEntries = Object.entries(componentOverrides);
    overridesEntries.forEach(function (_ref2) {
      var _ref3 = _slicedToArray__default["default"](_ref2, 2),
        componentProp = _ref3[0],
        componentOverride = _ref3[1];
      renderableContent.components[componentProp] = [componentOverride];
    });
  }
  return /*#__PURE__*/React__default["default"].createElement(EasyblocksMetadataProvider.EasyblocksMetadataProvider, {
    meta: renderableDocument.meta
  }, /*#__PURE__*/React__default["default"].createElement(EasyblocksExternalDataProvider.EasyblocksExternalDataProvider, {
    externalData: externalData !== null && externalData !== void 0 ? externalData : {}
  }, /*#__PURE__*/React__default["default"].createElement(ComponentBuilder.ComponentBuilder, {
    compiled: renderableContent,
    path: "",
    components: _objectSpread(_objectSpread({}, components), builtinComponents)
  })));
}

exports.Easyblocks = Easyblocks;
