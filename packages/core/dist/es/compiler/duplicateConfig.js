/* with love from shopstory */
import { deepClone, uniqueId } from '@redsun-vn/easyblocks-utils';
import { configTraverse } from './configTraverse.js';
import { traverseComponents } from './traverseComponents.js';

function duplicateConfig(inputConfig, compilationContext) {
  // deep copy first
  var config = deepClone(inputConfig);

  // refresh component ids
  traverseComponents(config, compilationContext, function (_ref) {
    var componentConfig = _ref.componentConfig;
    componentConfig._id = uniqueId();
  });

  // every text must get new local id
  configTraverse(config, compilationContext, function (_ref2) {
    var value = _ref2.value,
      schemaProp = _ref2.schemaProp;
    if (schemaProp.type === "text") {
      value.id = "local." + uniqueId();
    }
  });
  return config;
}

export { duplicateConfig };
