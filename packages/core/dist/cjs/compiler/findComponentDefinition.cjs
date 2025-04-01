/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var easyblocksUtils = require('@redsun-vn/easyblocks-utils');

function allDefs(context) {
  return (context === null || context === void 0 ? void 0 : context.definitions.components) || [];
}

/**
 * Versions with context and custom components sweep
 */

function findComponentDefinition(config, context) {
  return $findComponentDefinition(config, context);
}
function findComponentDefinitionById(id, context) {
  return $findComponentDefinitionById(id, context);
}
function findComponentDefinitionsByType(tag, context) {
  return allDefs(context).filter(function (def) {
    var _def$type;
    return easyblocksUtils.toArray((_def$type = def.type) !== null && _def$type !== void 0 ? _def$type : []).includes(tag);
  });
}

/**
 * Generic
 */

function $findComponentDefinition(config, context) {
  if (!config) {
    return undefined;
  }
  return $findComponentDefinitionById(config._component, context);
}
function $findComponentDefinitionById(id, context) {
  return allDefs(context).find(function (component) {
    return component.id === id;
  });
}

exports.findComponentDefinition = findComponentDefinition;
exports.findComponentDefinitionById = findComponentDefinitionById;
exports.findComponentDefinitionsByType = findComponentDefinitionsByType;
