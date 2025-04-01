/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var CompilationCache = require('./CompilationCache.cjs');
var normalize = require('./normalize.cjs');
var compileComponent = require('./compileComponent.cjs');
var devices = require('./devices.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function compileInternal(configComponent, compilationContext) {
  var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new CompilationCache.CompilationCache();
  var normalizedConfig = normalize.normalize(configComponent, compilationContext);
  var meta = {
    vars: {
      definitions: {
        links: [],
        actions: [],
        components: [],
        textModifiers: []
      },
      devices: compilationContext.devices,
      locale: compilationContext.contextParams.locale
    }
  };
  var contextProps = {
    $width: devices.getDevicesWidths(compilationContext.devices),
    $widthAuto: _objectSpread({
      $res: true
    }, Object.fromEntries(compilationContext.devices.map(function (d) {
      return [d.id, false];
    })))
  };
  var compilationArtifacts = compileComponent.compileComponent(normalizedConfig, compilationContext, contextProps, meta, cache);
  var ret = {
    compiled: compilationArtifacts.compiledComponentConfig,
    meta: {
      vars: meta.vars
    }
  };
  if (compilationContext.isEditing) {
    return _objectSpread(_objectSpread({}, ret), {}, {
      configAfterAuto: compilationArtifacts.configAfterAuto
    });
  }
  return ret;
}

exports.compileInternal = compileInternal;
