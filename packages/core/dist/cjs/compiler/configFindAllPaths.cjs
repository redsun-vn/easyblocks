/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var traverseComponents = require('./traverseComponents.cjs');

function configFindAllPaths(config, editorContext, predicate) {
  var matchedConfigPaths = [];
  traverseComponents.traverseComponents(config, editorContext, function (_ref) {
    var path = _ref.path,
      componentConfig = _ref.componentConfig;
    if (predicate(componentConfig, editorContext)) {
      matchedConfigPaths.push(path);
    }
  });
  return matchedConfigPaths;
}

exports.configFindAllPaths = configFindAllPaths;
