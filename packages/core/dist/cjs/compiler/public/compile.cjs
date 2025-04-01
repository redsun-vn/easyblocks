/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mergeCompilationMeta = require('../mergeCompilationMeta.cjs');
var compileInternal = require('../compileInternal.cjs');
var createCompilationContext = require('../createCompilationContext.cjs');
var normalizeInput = require('../normalizeInput.cjs');

var compile = function compile(content, config, contextParams) {
  var resultMeta = {
    // @ts-expect-error We can leave `devices` and `locale` undefined because these values are set in `compileInternal`.
    vars: {},
    code: {}
  };
  var compilationContext = createCompilationContext.createCompilationContext(config, contextParams, content._component);
  var inputConfigComponent = normalizeInput.normalizeInput(content);
  var _compileInternal = compileInternal.compileInternal(inputConfigComponent, compilationContext),
    meta = _compileInternal.meta,
    compiled = _compileInternal.compiled,
    configAfterAuto = _compileInternal.configAfterAuto;
  resultMeta = mergeCompilationMeta.mergeCompilationMeta(resultMeta, meta);
  return {
    compiled: compiled,
    configAfterAuto: configAfterAuto,
    meta: resultMeta
  };
};

exports.compile = compile;
