/* with love from shopstory */
import { mergeCompilationMeta } from '../mergeCompilationMeta.js';
import { compileInternal } from '../compileInternal.js';
import { createCompilationContext } from '../createCompilationContext.js';
import { normalizeInput } from '../normalizeInput.js';

var compile = function compile(content, config, contextParams) {
  var resultMeta = {
    // @ts-expect-error We can leave `devices` and `locale` undefined because these values are set in `compileInternal`.
    vars: {},
    code: {}
  };
  var compilationContext = createCompilationContext(config, contextParams, content._component);
  var inputConfigComponent = normalizeInput(content);
  var _compileInternal = compileInternal(inputConfigComponent, compilationContext),
    meta = _compileInternal.meta,
    compiled = _compileInternal.compiled,
    configAfterAuto = _compileInternal.configAfterAuto;
  resultMeta = mergeCompilationMeta(resultMeta, meta);
  return {
    compiled: compiled,
    configAfterAuto: configAfterAuto,
    meta: resultMeta
  };
};

export { compile };
