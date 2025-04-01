/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resourcesUtils = require('./resourcesUtils.cjs');
var compile = require('./compiler/public/compile.cjs');
var findResources = require('./compiler/public/findResources.cjs');
var validation = require('./compiler/validation.cjs');

var defaultCompiler = {
  compile: compile.compile,
  findExternals: findResources.findExternals,
  validate: validation.validate
};
function buildEntry(_ref) {
  var entry = _ref.entry,
    config = _ref.config,
    locale = _ref.locale,
    _ref$compiler = _ref.compiler,
    compiler = _ref$compiler === void 0 ? defaultCompiler : _ref$compiler,
    _ref$externalData = _ref.externalData,
    externalData = _ref$externalData === void 0 ? {} : _ref$externalData,
    isExternalDataChanged = _ref.isExternalDataChanged;
  if (!compiler.validate(entry)) {
    throw new Error("Invalid entry");
  }
  var contextParams = {
    locale: locale
  };
  var compilationResult = compiler.compile(entry, config, contextParams);
  var resourcesWithSchemaProps = compiler.findExternals(entry, config, contextParams);
  var pendingExternalData = findChangedExternalData(resourcesWithSchemaProps, externalData, isExternalDataChanged);
  return {
    renderableContent: compilationResult.compiled,
    meta: compilationResult.meta,
    externalData: pendingExternalData,
    configAfterAuto: compilationResult.configAfterAuto
  };
}
function findChangedExternalData(resourcesWithSchemaProps, externalData, isExternalDataPending) {
  var changedExternalData = {};
  function defaultIsExternalDataPending(id, resource, type) {
    // If null, then it's empty external value and it's not pending
    if (resource.externalId === null) {
      return false;
    }

    // If it's already fetched, then it's not pending
    if (externalData[id]) {
      return false;
    }

    // If id is a string and it's either local text reference or a reference to document's data, then it's not pending
    if (typeof resource.externalId === "string" && (resourcesUtils.isLocalTextReference({
      id: resource.externalId
    }, type) || resource.externalId.startsWith("$."))) {
      return false;
    }
    return true;
  }
  resourcesWithSchemaProps.forEach(function (_ref2) {
    var id = _ref2.id,
      externalReference = _ref2.externalReference,
      schemaProp = _ref2.schemaProp;
    var params = getExternalTypeParams(schemaProp);
    var externalData = {
      id: id,
      externalId: externalReference.id
    };
    if (isExternalDataPending) {
      if (!isExternalDataPending(externalData, function (resource) {
        return defaultIsExternalDataPending(id, resource, schemaProp.type);
      })) {
        return;
      }
    } else {
      var isPendingDefault = defaultIsExternalDataPending(id, externalData, schemaProp.type);
      if (!isPendingDefault) {
        return;
      }
    }
    if (changedExternalData[id]) {
      return;
    }
    changedExternalData[id] = {
      id: externalReference.id,
      widgetId: externalReference.widgetId,
      params: params
    };
  });
  return changedExternalData;
}
function getExternalTypeParams(schemaProp) {
  if (schemaProp.type === "text") {
    return;
  }
  return schemaProp.params;
}

exports.buildEntry = buildEntry;
