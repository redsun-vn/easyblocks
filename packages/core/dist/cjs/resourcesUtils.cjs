/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkers = require('./checkers.cjs');
var responsiveValueMap = require('./responsiveness/responsiveValueMap.cjs');

function getExternalValue(externalDataValue) {
  if ("error" in externalDataValue) {
    return;
  }
  return externalDataValue.value;
}
function isLocalTextReference(resource, type) {
  if (resource.id === null) {
    return false;
  }
  return type === "text" && resource.id.startsWith("local.");
}
function getExternalReferenceLocationKey(configId, fieldName, deviceId) {
  var resourceId = "".concat(configId, ".").concat(fieldName);
  if (deviceId) {
    resourceId += ".".concat(deviceId);
  }
  return resourceId;
}
function getResolvedExternalDataValue(externalData, configId, fieldName, value) {
  var externalReferenceLocationKey = typeof value.id === "string" && value.id.startsWith("$.") ? value.id : getExternalReferenceLocationKey(configId, fieldName);
  var externalValue = externalData[externalReferenceLocationKey];
  if (externalValue === undefined || "error" in externalValue) {
    return;
  }
  return externalValue;
}
function resolveExternalValue(responsiveResource, configId, schemaProp, externalData) {
  return responsiveValueMap.responsiveValueMap(responsiveResource, function (r, breakpointIndex) {
    if (r.id) {
      // If resource field has `key` defined and its `id` starts with "$.", it means that it's a reference to the
      // root resource and we need to look for the resource with the same id as the root resource.
      var locationKey = r.key && typeof r.id === "string" && r.id.startsWith("$.") ? r.id : getExternalReferenceLocationKey(configId, schemaProp.prop, breakpointIndex);
      var externalDataValue = externalData[locationKey];
      var resourceValue;
      if (externalDataValue) {
        resourceValue = getExternalValue(externalDataValue);
      }
      if (externalDataValue === undefined || checkers.isEmptyRenderableContent(resourceValue)) {
        return;
      }
      if ("error" in externalDataValue) {
        return;
      }
      if (isCompoundExternalDataValue(externalDataValue)) {
        if (!r.key) {
          return;
        }
        var resolvedResourceValue = externalDataValue.value[r.key].value;
        if (!resolvedResourceValue) {
          return;
        }
        return resolvedResourceValue;
      }
      return resourceValue;
    }
    return;
  });
}
function isCompoundExternalDataValue(value) {
  return "type" in value && value.type === "object" && "value" in value || "error" in value;
}

exports.getExternalReferenceLocationKey = getExternalReferenceLocationKey;
exports.getExternalValue = getExternalValue;
exports.getResolvedExternalDataValue = getResolvedExternalDataValue;
exports.isCompoundExternalDataValue = isCompoundExternalDataValue;
exports.isLocalTextReference = isLocalTextReference;
exports.resolveExternalValue = resolveExternalValue;
