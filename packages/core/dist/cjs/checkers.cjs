/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var zod = require('zod');
var isCompiledComponentConfig = require('./isCompiledComponentConfig.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

function isRenderableContent(input) {
  return _typeof__default["default"](input) === "object" && input !== null && "renderableContent" in input && (isCompiledComponentConfig.isCompiledComponentConfig(input.renderableContent) || input.renderableContent === null);
}
function isNonEmptyRenderableContent(input) {
  return _typeof__default["default"](input) === "object" && input !== null && "renderableContent" in input && isCompiledComponentConfig.isCompiledComponentConfig(input.renderableContent);
}
function isEmptyRenderableContent(input) {
  return _typeof__default["default"](input) === "object" && input !== null && "renderableContent" in input && input.renderableContent === null;
}
var documentSchema = zod.z.object({
  documentId: zod.z.string(),
  projectId: zod.z.string(),
  rootContainer: zod.z.string().optional(),
  preview: zod.z.object({}).optional(),
  config: zod.z.optional(zod.z.object({}))
});
function isDocument(value) {
  return documentSchema.safeParse(value).success;
}
function isComponentConfig(value) {
  return _typeof__default["default"](value) === "object" && typeof (value === null || value === void 0 ? void 0 : value._component) === "string" && typeof (value === null || value === void 0 ? void 0 : value._id) === "string";
}
var localValueSchema = zod.z.object({
  value: zod.z.any(),
  widgetId: zod.z.string()
});
function isLocalValue(value) {
  return localValueSchema.safeParse(value).success;
}
function isResolvedCompoundExternalDataValue(value) {
  return "type" in value && value.type === "object" && "value" in value;
}
function isIdReferenceToDocumentExternalValue(id) {
  return typeof id === "string" && id.startsWith("$.");
}
function isEmptyExternalReference(externalDataConfigEntry) {
  return externalDataConfigEntry.id === null;
}

exports.isComponentConfig = isComponentConfig;
exports.isDocument = isDocument;
exports.isEmptyExternalReference = isEmptyExternalReference;
exports.isEmptyRenderableContent = isEmptyRenderableContent;
exports.isIdReferenceToDocumentExternalValue = isIdReferenceToDocumentExternalValue;
exports.isLocalValue = isLocalValue;
exports.isNonEmptyRenderableContent = isNonEmptyRenderableContent;
exports.isRenderableContent = isRenderableContent;
exports.isResolvedCompoundExternalDataValue = isResolvedCompoundExternalDataValue;
