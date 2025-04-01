/* with love from shopstory */
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { isLocalTextReference, getExternalReferenceLocationKey } from '../../resourcesUtils.js';
import { configTraverse } from '../configTraverse.js';
import { createCompilationContext } from '../createCompilationContext.js';
import { normalize } from '../normalize.js';
import { normalizeInput } from '../normalizeInput.js';
import { isExternalSchemaProp } from '../schema/index.js';
import { responsiveValueEntries } from '../../responsiveness/responsiveValueEntries.js';
import { isTrulyResponsiveValue } from '../../responsiveness/isTrulyResponsiveValue.js';

var findExternals = function findExternals(input, config, contextParams) {
  var inputConfigComponent = normalizeInput(input);
  var externalsWithSchemaProps = [];
  var compilationContext = createCompilationContext(config, contextParams, input._component);
  var normalizedConfig = normalize(inputConfigComponent, compilationContext);
  configTraverse(normalizedConfig, compilationContext, function (_ref) {
    var config = _ref.config,
      value = _ref.value,
      schemaProp = _ref.schemaProp;
    // This kinda tricky, because "text" is a special case. It can be either local or external.
    // To prevent false positives, we need to check if it's local text reference and make sure that we won't
    // treat "text" that's actually external as non external.
    if (schemaProp.type === "text" && isLocalTextReference(value, "text") || schemaProp.type !== "text" && !isExternalSchemaProp(schemaProp, compilationContext.types)) {
      return;
    }
    var hasInputComponentRootParams = compilationContext.definitions.components.some(function (c) {
      return c.id === normalizedConfig._component && c.rootParams !== undefined;
    });
    var configId = normalizedConfig._id === config._id && hasInputComponentRootParams ? "$" : config._id;
    if (isTrulyResponsiveValue(value)) {
      responsiveValueEntries(value).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          breakpoint = _ref3[0],
          currentValue = _ref3[1];
        if (currentValue === undefined) {
          return;
        }
        externalsWithSchemaProps.push({
          id: getExternalReferenceLocationKey(configId, schemaProp.prop, breakpoint),
          schemaProp: schemaProp,
          externalReference: currentValue
        });
      });
    } else {
      externalsWithSchemaProps.push({
        id: getExternalReferenceLocationKey(configId, schemaProp.prop),
        schemaProp: schemaProp,
        externalReference: value
      });
    }
  });
  return externalsWithSchemaProps;
};

export { findExternals };
