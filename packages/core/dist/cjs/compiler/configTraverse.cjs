/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var findComponentDefinition = require('./findComponentDefinition.cjs');
var index = require('./schema/index.cjs');

/**
 * Traverses given `config` by invoking given `callback` for each schema prop defined within components from `context`
 */
function configTraverse(config, context, callback) {
  configTraverseInternal(config, context, callback, "");
}
function configTraverseArray(array, context, callback, path) {
  array.forEach(function (config, index) {
    configTraverseInternal(config, context, callback, "".concat(path, ".").concat(index));
  });
}
function configTraverseInternal(config, context, callback, path) {
  var componentDefinition = findComponentDefinition.findComponentDefinition(config, context);
  if (!componentDefinition) {
    console.warn("[configTraverse] Unknown component definition for: ".concat(config._component));
    return;
  }
  var pathPrefix = path === "" ? "" : path + ".";
  componentDefinition.schema.forEach(function (schemaProp) {
    if (index.isSchemaPropComponent(schemaProp) || schemaProp.type === "component-collection") {
      callback({
        config: config,
        value: config[schemaProp.prop],
        path: "".concat(pathPrefix).concat(schemaProp.prop),
        schemaProp: schemaProp
      });
      configTraverseArray(config[schemaProp.prop], context, callback, "".concat(pathPrefix).concat(schemaProp.prop));
    } else if (schemaProp.type === "component-collection-localised") {
      callback({
        config: config,
        value: config[schemaProp.prop],
        path: "".concat(pathPrefix).concat(schemaProp.prop),
        schemaProp: schemaProp
      });
      for (var locale in config[schemaProp.prop]) {
        configTraverseArray(config[schemaProp.prop][locale], context, callback, "".concat(pathPrefix).concat(schemaProp.prop, ".").concat(locale));
      }
    } else {
      var currentPath = "".concat(pathPrefix).concat(schemaProp.prop);
      callback({
        config: config,
        path: currentPath,
        value: config[schemaProp.prop],
        schemaProp: schemaProp
      });
    }
  });
}

exports.configTraverse = configTraverse;
