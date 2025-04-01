/* with love from shopstory */
import { traverseComponents } from './traverseComponents.js';

function configFindAllPaths(config, editorContext, predicate) {
  var matchedConfigPaths = [];
  traverseComponents(config, editorContext, function (_ref) {
    var path = _ref.path,
      componentConfig = _ref.componentConfig;
    if (predicate(componentConfig, editorContext)) {
      matchedConfigPaths.push(path);
    }
  });
  return matchedConfigPaths;
}

export { configFindAllPaths };
