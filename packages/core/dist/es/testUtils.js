/* with love from shopstory */
import { dotNotationSet } from '@redsun-vn/easyblocks-utils';
import { EasyblocksBackend } from './EasyblocksBackend.js';
import { createCompilationContext } from './compiler/createCompilationContext.js';

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
      dotNotationSet(this.values, path, value);
    }
  };
}
function createTestCompilationContext() {
  return createCompilationContext({
    backend: new EasyblocksBackend({
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

export { createFormMock, createTestCompilationContext };
