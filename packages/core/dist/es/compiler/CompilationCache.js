/* with love from shopstory */
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';

var CompilationCache = /*#__PURE__*/function () {
  function CompilationCache(initialEntries) {
    _classCallCheck(this, CompilationCache);
    this.cache = initialEntries ? new Map(initialEntries) : new Map();
  }
  return _createClass(CompilationCache, [{
    key: "get",
    value: function get(key) {
      return this.cache.get(key);
    }
  }, {
    key: "set",
    value: function set(key, entry) {
      this.cache.set(key, entry);
    }
  }, {
    key: "count",
    get: function get() {
      return this.cache.size;
    }
  }, {
    key: "remove",
    value: function remove(path) {
      this.cache["delete"](path);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.cache.clear();
    }
  }]);
}();

export { CompilationCache };
