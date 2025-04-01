/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function isSchemaPropComponentCollectionLocalised(schemaProp) {
  return schemaProp.type === "component-collection-localised";
}
function isSchemaPropCollection(schemaProp) {
  return schemaProp.type === "component-collection" || schemaProp.type === "component-collection-localised";
}
function isSchemaPropComponent(schemaProp) {
  return schemaProp.type === "component";
}
function isSchemaPropComponentOrComponentCollection(schemaProp) {
  return isSchemaPropCollection(schemaProp) || isSchemaPropComponent(schemaProp);
}
function isSchemaPropActionTextModifier(schemaProp) {
  return schemaProp.type === "component" && schemaProp.accepts.includes("actionTextModifier");
}
function isSchemaPropTextModifier(schemaProp) {
  return schemaProp.type === "component" && schemaProp.accepts.includes("textModifier");
}
var internalTypes = new Set(["string", "number", "boolean", "select", "radio-group", "color", "space", "font", "icon", "text", "component", "component-collection", "position", "component$$$", "component-collection-localised", "aspectRatio", "containerWidth", "boxShadow"]);
function isCustomSchemaProp(schemaProp) {
  return !internalTypes.has(schemaProp.type);
}
function isExternalSchemaProp(schemaProp, types) {
  return types[schemaProp.type] && types[schemaProp.type].type === "external";
}
function textModifierSchemaProp(options) {
  return _objectSpread({
    type: "component",
    accepts: ["textModifier"],
    // Schema props of type "component" are hidden by default
    visible: true
  }, options);
}

export { isCustomSchemaProp, isExternalSchemaProp, isSchemaPropActionTextModifier, isSchemaPropCollection, isSchemaPropComponent, isSchemaPropComponentCollectionLocalised, isSchemaPropComponentOrComponentCollection, isSchemaPropTextModifier, textModifierSchemaProp };
