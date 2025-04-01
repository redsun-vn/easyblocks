/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);

var CompilationCache = /*#__PURE__*/function () {
  function CompilationCache(initialEntries) {
    _classCallCheck__default["default"](this, CompilationCache);
    this.cache = initialEntries ? new Map(initialEntries) : new Map();
  }
  return _createClass__default["default"](CompilationCache, [{
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

exports.CompilationCache = CompilationCache;
