/* with love from shopstory */
import { findComponentDefinition } from './findComponentDefinition.js';
import { isSchemaPropComponent } from './schema/index.js';

/**
 * Traverses given `config` by invoking given `callback` for each schema prop defined within components from `context`
 */
function traverseComponents(config, context, callback) {
  traverseComponentsInternal(config, context, callback, "");
}
function traverseComponentsArray(array, context, callback, path) {
  array.forEach(function (config, index) {
    traverseComponentsInternal(config, context, callback, "".concat(path, ".").concat(index));
  });
}
function traverseComponentsInternal(componentConfig, context, callback, path) {
  var componentDefinition = findComponentDefinition(componentConfig, context);
  if (!componentDefinition) {
    console.warn("[traverseComponents] Unknown component definition", componentConfig);
    return;
  }
  var pathPrefix = path === "" ? "" : path + ".";
  callback({
    componentConfig: componentConfig,
    path: path
  });
  componentDefinition.schema.forEach(function (schemaProp) {
    if (isSchemaPropComponent(schemaProp) || schemaProp.type === "component-collection") {
      traverseComponentsArray(componentConfig[schemaProp.prop], context, callback, "".concat(pathPrefix).concat(schemaProp.prop));
    } else if (schemaProp.type === "component-collection-localised") {
      for (var locale in componentConfig[schemaProp.prop]) {
        traverseComponentsArray(componentConfig[schemaProp.prop][locale], context, callback, "".concat(pathPrefix).concat(schemaProp.prop, ".").concat(locale));
      }
    }
  });
}

export { traverseComponents };
