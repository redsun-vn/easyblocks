/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function traverseCompiledRichTextComponentConfig(config, callback) {
  config.elements.forEach(function (reactElement) {
    callback(reactElement.props.compiled);
    reactElement.props.compiled.components.elements.forEach(function (compiledLineElement) {
      callback(compiledLineElement);
      compiledLineElement.components.elements.forEach(function (compiledTextPart) {
        callback(compiledTextPart);
      });
    });
  });
}

exports.traverseCompiledRichTextComponentConfig = traverseCompiledRichTextComponentConfig;
