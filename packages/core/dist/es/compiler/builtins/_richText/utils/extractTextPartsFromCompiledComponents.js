/* with love from shopstory */
import { traverseCompiledRichTextComponentConfig } from './traverseCompiledRichTextComponentConfig.js';

function extractTextPartsFromCompiledComponents(compiledRichText) {
  var extractedTextPartComponents = [];
  traverseCompiledRichTextComponentConfig(compiledRichText, function (compiledConfig) {
    if (compiledConfig._component === "@easyblocks/rich-text-part") {
      extractedTextPartComponents.push(compiledConfig);
    }
  });
  return extractedTextPartComponents;
}

export { extractTextPartsFromCompiledComponents };
