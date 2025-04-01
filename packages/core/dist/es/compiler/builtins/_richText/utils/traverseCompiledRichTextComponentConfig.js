/* with love from shopstory */
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

export { traverseCompiledRichTextComponentConfig };
