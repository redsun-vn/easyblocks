'use client';
/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');
var $richText_client = require('../compiler/builtins/_richText/_richText.client.cjs');
var $richTextBlockElement_client = require('../compiler/builtins/_richText/_richTextBlockElement/_richTextBlockElement.client.cjs');
var $richTextLineElement_client = require('../compiler/builtins/_richText/_richTextLineElement/_richTextLineElement.client.cjs');
var $richTextPart_client = require('../compiler/builtins/_richText/_richTextPart/_richTextPart.client.cjs');
var $text_client = require('../compiler/builtins/_text/_text.client.cjs');
var ComponentBuilder = require('./ComponentBuilder/ComponentBuilder.cjs');
var EasyblocksExternalDataProvider = require('./EasyblocksExternalDataProvider.cjs');
var EasyblocksMetadataProvider = require('./EasyblocksMetadataProvider.cjs');
var MissingComponent = require('./MissingComponent.cjs');
var index = require('../_virtual/index.cjs');

const builtinComponents = {
  "@easyblocks/missing-component": MissingComponent.MissingComponent,
  "@easyblocks/rich-text.client": $richText_client.RichTextClient,
  "@easyblocks/rich-text-block-element": $richTextBlockElement_client.RichTextBlockElementClient,
  "@easyblocks/rich-text-line-element": $richTextLineElement_client.RichTextLineElementClient,
  "@easyblocks/rich-text-part": $richTextPart_client.RichTextPartClient,
  "@easyblocks/text.client": $text_client.TextClient,
  "EditableComponentBuilder.client": ComponentBuilder.ComponentBuilder
};
function Easyblocks(_ref) {
  let {
    renderableDocument,
    externalData,
    componentOverrides,
    components
  } = _ref;
  index.react.exports.useEffect(() => {
    document.documentElement.style.setProperty("--shopstory-viewport-width", `calc(100vw - ${window.innerWidth - document.documentElement.clientWidth}px)`);
  });
  const renderableContent = renderableDocument.renderableContent;
  if (renderableContent === null) {
    return null;
  }
  if (componentOverrides) {
    const overridesEntries = Object.entries(componentOverrides);
    overridesEntries.forEach(_ref2 => {
      let [componentProp, componentOverride] = _ref2;
      renderableContent.components[componentProp] = [componentOverride];
    });
  }
  return /*#__PURE__*/index$1.createElement(EasyblocksMetadataProvider.EasyblocksMetadataProvider, {
    meta: renderableDocument.meta
  }, /*#__PURE__*/index$1.createElement(EasyblocksExternalDataProvider.EasyblocksExternalDataProvider, {
    externalData: externalData ?? {}
  }, /*#__PURE__*/index$1.createElement(ComponentBuilder.ComponentBuilder, {
    compiled: renderableContent,
    path: "",
    components: {
      ...components,
      ...builtinComponents
    }
  })));
}

exports.Easyblocks = Easyblocks;
