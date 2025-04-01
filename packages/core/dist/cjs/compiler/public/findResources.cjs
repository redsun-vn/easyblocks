/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var resourcesUtils = require('../../resourcesUtils.cjs');
var configTraverse = require('../configTraverse.cjs');
var createCompilationContext = require('../createCompilationContext.cjs');
var normalize = require('../normalize.cjs');
var normalizeInput = require('../normalizeInput.cjs');
var index = require('../schema/index.cjs');
var responsiveValueEntries = require('../../responsiveness/responsiveValueEntries.cjs');
var isTrulyResponsiveValue = require('../../responsiveness/isTrulyResponsiveValue.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var findExternals = function findExternals(input, config, contextParams) {
  var inputConfigComponent = normalizeInput.normalizeInput(input);
  var externalsWithSchemaProps = [];
  var compilationContext = createCompilationContext.createCompilationContext(config, contextParams, input._component);
  var normalizedConfig = normalize.normalize(inputConfigComponent, compilationContext);
  configTraverse.configTraverse(normalizedConfig, compilationContext, function (_ref) {
    var config = _ref.config,
      value = _ref.value,
      schemaProp = _ref.schemaProp;
    // This kinda tricky, because "text" is a special case. It can be either local or external.
    // To prevent false positives, we need to check if it's local text reference and make sure that we won't
    // treat "text" that's actually external as non external.
    if (schemaProp.type === "text" && resourcesUtils.isLocalTextReference(value, "text") || schemaProp.type !== "text" && !index.isExternalSchemaProp(schemaProp, compilationContext.types)) {
      return;
    }
    var hasInputComponentRootParams = compilationContext.definitions.components.some(function (c) {
      return c.id === normalizedConfig._component && c.rootParams !== undefined;
    });
    var configId = normalizedConfig._id === config._id && hasInputComponentRootParams ? "$" : config._id;
    if (isTrulyResponsiveValue.isTrulyResponsiveValue(value)) {
      responsiveValueEntries.responsiveValueEntries(value).forEach(function (_ref2) {
        var _ref3 = _slicedToArray__default["default"](_ref2, 2),
          breakpoint = _ref3[0],
          currentValue = _ref3[1];
        if (currentValue === undefined) {
          return;
        }
        externalsWithSchemaProps.push({
          id: resourcesUtils.getExternalReferenceLocationKey(configId, schemaProp.prop, breakpoint),
          schemaProp: schemaProp,
          externalReference: currentValue
        });
      });
    } else {
      externalsWithSchemaProps.push({
        id: resourcesUtils.getExternalReferenceLocationKey(configId, schemaProp.prop),
        schemaProp: schemaProp,
        externalReference: value
      });
    }
  });
  return externalsWithSchemaProps;
};

exports.findExternals = findExternals;
