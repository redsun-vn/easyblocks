/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var EasyblocksBackend = require('./EasyblocksBackend.cjs');
var createCompilationContext = require('./compiler/createCompilationContext.cjs');

function createFormMock() {
  var initialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    reset: function reset() {
      this.values = initialValues;
    },
    values: initialValues,
    change: function change(path, value) {
      if (path === "") {
        this.values = value;
        return;
      }
      easyblocksUtils.dotNotationSet(this.values, path, value);
    }
  };
}
function createTestCompilationContext() {
  return createCompilationContext.createCompilationContext({
    backend: new EasyblocksBackend.EasyblocksBackend({
      accessToken: ""
    }),
    locales: [{
      code: "en",
      isDefault: true
    }],
    components: [{
      id: "TestComponent",
      schema: []
    }]
  }, {
    locale: "en"
  }, "TestComponent");
}

exports.createFormMock = createFormMock;
exports.createTestCompilationContext = createTestCompilationContext;
