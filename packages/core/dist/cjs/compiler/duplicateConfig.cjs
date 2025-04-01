/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var configTraverse = require('./configTraverse.cjs');
var traverseComponents = require('./traverseComponents.cjs');

function duplicateConfig(inputConfig, compilationContext) {
  // deep copy first
  var config = easyblocksUtils.deepClone(inputConfig);

  // refresh component ids
  traverseComponents.traverseComponents(config, compilationContext, function (_ref) {
    var componentConfig = _ref.componentConfig;
    componentConfig._id = easyblocksUtils.uniqueId();
  });

  // every text must get new local id
  configTraverse.configTraverse(config, compilationContext, function (_ref2) {
    var value = _ref2.value,
      schemaProp = _ref2.schemaProp;
    if (schemaProp.type === "text") {
      value.id = "local." + easyblocksUtils.uniqueId();
    }
  });
  return config;
}

exports.duplicateConfig = duplicateConfig;
