/* with love from shopstory */
import _typeof from '@babel/runtime/helpers/typeof';
import { z } from 'zod';
import { isCompiledComponentConfig } from './isCompiledComponentConfig.js';

function isRenderableContent(input) {
  return _typeof(input) === "object" && input !== null && "renderableContent" in input && (isCompiledComponentConfig(input.renderableContent) || input.renderableContent === null);
}
function isNonEmptyRenderableContent(input) {
  return _typeof(input) === "object" && input !== null && "renderableContent" in input && isCompiledComponentConfig(input.renderableContent);
}
function isEmptyRenderableContent(input) {
  return _typeof(input) === "object" && input !== null && "renderableContent" in input && input.renderableContent === null;
}
var documentSchema = z.object({
  documentId: z.string(),
  projectId: z.string(),
  rootContainer: z.string().optional(),
  preview: z.object({}).optional(),
  config: z.optional(z.object({}))
});
function isDocument(value) {
  return documentSchema.safeParse(value).success;
}
function isComponentConfig(value) {
  return _typeof(value) === "object" && typeof (value === null || value === void 0 ? void 0 : value._component) === "string" && typeof (value === null || value === void 0 ? void 0 : value._id) === "string";
}
var localValueSchema = z.object({
  value: z.any(),
  widgetId: z.string()
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

export { isComponentConfig, isDocument, isEmptyExternalReference, isEmptyRenderableContent, isIdReferenceToDocumentExternalValue, isLocalValue, isNonEmptyRenderableContent, isRenderableContent, isResolvedCompoundExternalDataValue };
