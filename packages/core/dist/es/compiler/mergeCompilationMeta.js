/* with love from shopstory */
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function mergeCompilationMeta(meta1, meta2) {
  var _meta1$vars$definitio, _meta1$vars$definitio2, _meta2$vars$definitio, _meta2$vars$definitio2, _meta1$vars$definitio3, _meta1$vars$definitio4, _meta2$vars$definitio3, _meta2$vars$definitio4, _meta1$vars$definitio5, _meta1$vars$definitio6, _meta2$vars$definitio5, _meta2$vars$definitio6, _meta1$vars$definitio7, _meta1$vars$definitio8, _meta2$vars$definitio7, _meta2$vars$definitio8;
  if (!meta2 && !meta1) {
    throw new Error("Can't merge empty metadata");
  }
  if (!meta2) {
    return meta1;
  }
  if (!meta1) {
    return meta2;
  }
  return {
    vars: _objectSpread(_objectSpread(_objectSpread({}, meta1.vars), meta2.vars), {}, {
      definitions: {
        actions: mergeDefinitions((_meta1$vars$definitio = (_meta1$vars$definitio2 = meta1.vars.definitions) === null || _meta1$vars$definitio2 === void 0 ? void 0 : _meta1$vars$definitio2.actions) !== null && _meta1$vars$definitio !== void 0 ? _meta1$vars$definitio : [], (_meta2$vars$definitio = (_meta2$vars$definitio2 = meta2.vars.definitions) === null || _meta2$vars$definitio2 === void 0 ? void 0 : _meta2$vars$definitio2.actions) !== null && _meta2$vars$definitio !== void 0 ? _meta2$vars$definitio : []),
        components: mergeDefinitions((_meta1$vars$definitio3 = (_meta1$vars$definitio4 = meta1.vars.definitions) === null || _meta1$vars$definitio4 === void 0 ? void 0 : _meta1$vars$definitio4.components) !== null && _meta1$vars$definitio3 !== void 0 ? _meta1$vars$definitio3 : [], (_meta2$vars$definitio3 = (_meta2$vars$definitio4 = meta2.vars.definitions) === null || _meta2$vars$definitio4 === void 0 ? void 0 : _meta2$vars$definitio4.components) !== null && _meta2$vars$definitio3 !== void 0 ? _meta2$vars$definitio3 : []),
        textModifiers: mergeDefinitions((_meta1$vars$definitio5 = (_meta1$vars$definitio6 = meta1.vars.definitions) === null || _meta1$vars$definitio6 === void 0 ? void 0 : _meta1$vars$definitio6.textModifiers) !== null && _meta1$vars$definitio5 !== void 0 ? _meta1$vars$definitio5 : [], (_meta2$vars$definitio5 = (_meta2$vars$definitio6 = meta2.vars.definitions) === null || _meta2$vars$definitio6 === void 0 ? void 0 : _meta2$vars$definitio6.textModifiers) !== null && _meta2$vars$definitio5 !== void 0 ? _meta2$vars$definitio5 : []),
        links: mergeDefinitions((_meta1$vars$definitio7 = (_meta1$vars$definitio8 = meta1.vars.definitions) === null || _meta1$vars$definitio8 === void 0 ? void 0 : _meta1$vars$definitio8.links) !== null && _meta1$vars$definitio7 !== void 0 ? _meta1$vars$definitio7 : [], (_meta2$vars$definitio7 = (_meta2$vars$definitio8 = meta2.vars.definitions) === null || _meta2$vars$definitio8 === void 0 ? void 0 : _meta2$vars$definitio8.links) !== null && _meta2$vars$definitio7 !== void 0 ? _meta2$vars$definitio7 : [])
      }
    })
  };
}
function mergeDefinitions(definitions1, definitions2) {
  var mergeDefinitions = _toConsumableArray(definitions1);
  definitions2.forEach(function (definition) {
    var isDuplicate = definitions1.some(function (d) {
      return d.id === definition.id;
    });
    if (isDuplicate) {
      return;
    }
    mergeDefinitions.push(definition);
  });
  return mergeDefinitions;
}

export { mergeCompilationMeta };
