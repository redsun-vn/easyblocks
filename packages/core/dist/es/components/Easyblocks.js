'use client';
/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import React, { useEffect } from 'react';
import { RichTextClient } from '../compiler/builtins/_richText/_richText.client.js';
import { RichTextBlockElementClient } from '../compiler/builtins/_richText/_richTextBlockElement/_richTextBlockElement.client.js';
import { RichTextLineElementClient } from '../compiler/builtins/_richText/_richTextLineElement/_richTextLineElement.client.js';
import { RichTextPartClient } from '../compiler/builtins/_richText/_richTextPart/_richTextPart.client.js';
import { TextClient } from '../compiler/builtins/_text/_text.client.js';
import { ComponentBuilder } from './ComponentBuilder/ComponentBuilder.js';
import { EasyblocksExternalDataProvider } from './EasyblocksExternalDataProvider.js';
import { EasyblocksMetadataProvider } from './EasyblocksMetadataProvider.js';
import { MissingComponent } from './MissingComponent.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var builtinComponents = {
  "@easyblocks/missing-component": MissingComponent,
  "@easyblocks/rich-text.client": RichTextClient,
  "@easyblocks/rich-text-block-element": RichTextBlockElementClient,
  "@easyblocks/rich-text-line-element": RichTextLineElementClient,
  "@easyblocks/rich-text-part": RichTextPartClient,
  "@easyblocks/text.client": TextClient,
  "EditableComponentBuilder.client": ComponentBuilder
};
function Easyblocks(_ref) {
  var renderableDocument = _ref.renderableDocument,
    externalData = _ref.externalData,
    componentOverrides = _ref.componentOverrides,
    components = _ref.components;
  useEffect(function () {
    document.documentElement.style.setProperty("--shopstory-viewport-width", "calc(100vw - ".concat(window.innerWidth - document.documentElement.clientWidth, "px)"));
  });
  var renderableContent = renderableDocument.renderableContent;
  if (renderableContent === null) {
    return null;
  }
  if (componentOverrides) {
    var overridesEntries = Object.entries(componentOverrides);
    overridesEntries.forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        componentProp = _ref3[0],
        componentOverride = _ref3[1];
      renderableContent.components[componentProp] = [componentOverride];
    });
  }
  return /*#__PURE__*/React.createElement(EasyblocksMetadataProvider, {
    meta: renderableDocument.meta
  }, /*#__PURE__*/React.createElement(EasyblocksExternalDataProvider, {
    externalData: externalData !== null && externalData !== void 0 ? externalData : {}
  }, /*#__PURE__*/React.createElement(ComponentBuilder, {
    compiled: renderableContent,
    path: "",
    components: _objectSpread(_objectSpread({}, components), builtinComponents)
  })));
}

export { Easyblocks };
