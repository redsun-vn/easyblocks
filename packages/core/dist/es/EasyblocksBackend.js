/* with love from shopstory */
import _typeof from '@babel/runtime/helpers/typeof';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var AUTH_HEADER = "x-shopstory-access-token";
var EasyblocksBackend = /*#__PURE__*/function () {
  function EasyblocksBackend(args) {
    var _this = this,
      _args$rootUrl;
    _classCallCheck(this, EasyblocksBackend);
    _defineProperty(this, "documents", {
      get: function () {
        var _get = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(payload) {
          var response;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.init();
              case 2:
                _context.next = 4;
                return _this.get("/projects/".concat(_this.project.id, "/documents/").concat(payload.id), {
                  searchParams: {
                    format: "full"
                  }
                });
              case 4:
                response = _context.sent;
                if (!response.ok) {
                  _context.next = 11;
                  break;
                }
                _context.t0 = documentWithResolvedConfigDTOToDocument;
                _context.next = 9;
                return response.json();
              case 9:
                _context.t1 = _context.sent;
                return _context.abrupt("return", (0, _context.t0)(_context.t1));
              case 11:
                throw new Error("Failed to get document");
              case 12:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        function get(_x) {
          return _get.apply(this, arguments);
        }
        return get;
      }(),
      create: function () {
        var _create = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(payload) {
          var response, errorData;
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.init();
              case 2:
                _context2.next = 4;
                return _this.post("/projects/".concat(_this.project.id, "/documents"), {
                  body: {
                    title: "Untitled",
                    config: payload.entry,
                    rootContainer: payload.entry._component
                  }
                });
              case 4:
                response = _context2.sent;
                if (!response.ok) {
                  _context2.next = 12;
                  break;
                }
                _context2.t0 = documentDTOToDocument;
                _context2.next = 9;
                return response.json();
              case 9:
                _context2.t1 = _context2.sent;
                _context2.t2 = payload.entry;
                return _context2.abrupt("return", (0, _context2.t0)(_context2.t1, _context2.t2));
              case 12:
                if (!(response.status === 400)) {
                  _context2.next = 17;
                  break;
                }
                _context2.next = 15;
                return response.json();
              case 15:
                errorData = _context2.sent;
                throw new Error(errorData.error);
              case 17:
                throw new Error("Failed to save document");
              case 18:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        function create(_x2) {
          return _create.apply(this, arguments);
        }
        return create;
      }(),
      update: function () {
        var _update = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3(payload) {
          var response, errorData;
          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.init();
              case 2:
                _context3.next = 4;
                return _this.put("/projects/".concat(_this.project.id, "/documents/").concat(payload.id), {
                  body: {
                    version: payload.version,
                    config: payload.entry
                  }
                });
              case 4:
                response = _context3.sent;
                if (!response.ok) {
                  _context3.next = 12;
                  break;
                }
                _context3.t0 = documentDTOToDocument;
                _context3.next = 9;
                return response.json();
              case 9:
                _context3.t1 = _context3.sent;
                _context3.t2 = payload.entry;
                return _context3.abrupt("return", (0, _context3.t0)(_context3.t1, _context3.t2));
              case 12:
                if (!(response.status === 400)) {
                  _context3.next = 17;
                  break;
                }
                _context3.next = 15;
                return response.json();
              case 15:
                errorData = _context3.sent;
                throw new Error(errorData.error);
              case 17:
                throw new Error("Failed to update document");
              case 18:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        function update(_x3) {
          return _update.apply(this, arguments);
        }
        return update;
      }()
    });
    _defineProperty(this, "templates", {
      get: function () {
        var _get2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee4(payload) {
          var allTemplates, template;
          return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.init();
              case 2:
                _context4.next = 4;
                return _this.templates.getAll();
              case 4:
                allTemplates = _context4.sent;
                template = allTemplates.find(function (template) {
                  return template.id === payload.id;
                });
                if (template) {
                  _context4.next = 8;
                  break;
                }
                throw new Error("Template not found");
              case 8:
                return _context4.abrupt("return", template);
              case 9:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        function get(_x4) {
          return _get2.apply(this, arguments);
        }
        return get;
      }(),
      getAll: function () {
        var _getAll = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
          var response, data, templates;
          return _regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this.init();
              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return _this.get("/projects/".concat(_this.project.id, "/templates"));
              case 5:
                response = _context5.sent;
                _context5.next = 8;
                return response.json();
              case 8:
                data = _context5.sent;
                templates = data.map(function (item) {
                  return {
                    id: item.id,
                    label: item.label,
                    entry: item.config.config,
                    isUserDefined: true,
                    width: item.width,
                    widthAuto: item.widthAuto
                  };
                });
                return _context5.abrupt("return", templates);
              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](2);
                console.error(_context5.t0);
                return _context5.abrupt("return", []);
              case 17:
              case "end":
                return _context5.stop();
            }
          }, _callee5, null, [[2, 13]]);
        }));
        function getAll() {
          return _getAll.apply(this, arguments);
        }
        return getAll;
      }(),
      create: function () {
        var _create2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee6(input) {
          var payload, response, json;
          return _regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.init();
              case 2:
                payload = {
                  label: input.label,
                  config: input.entry,
                  masterTemplateIds: [],
                  width: input.width,
                  widthAuto: input.widthAuto
                };
                _context6.next = 5;
                return _this.request("/projects/".concat(_this.project.id, "/templates"), {
                  method: "POST",
                  body: JSON.stringify(payload)
                });
              case 5:
                response = _context6.sent;
                if (!(response.status !== 200)) {
                  _context6.next = 8;
                  break;
                }
                throw new Error("couldn't create template");
              case 8:
                _context6.next = 10;
                return response.json();
              case 10:
                json = _context6.sent;
                return _context6.abrupt("return", {
                  id: json.id,
                  label: json.label,
                  entry: input.entry,
                  isUserDefined: true
                });
              case 12:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
        function create(_x5) {
          return _create2.apply(this, arguments);
        }
        return create;
      }(),
      update: function () {
        var _update2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee7(input) {
          var payload, response, json;
          return _regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this.init();
              case 2:
                payload = {
                  label: input.label,
                  masterTemplateIds: []
                };
                _context7.next = 5;
                return _this.request("/projects/".concat(_this.project.id, "/templates/").concat(input.id), {
                  method: "PUT",
                  body: JSON.stringify(payload)
                });
              case 5:
                response = _context7.sent;
                _context7.next = 8;
                return response.json();
              case 8:
                json = _context7.sent;
                console.log("update template json", json);
                if (!(response.status !== 200)) {
                  _context7.next = 12;
                  break;
                }
                throw new Error();
              case 12:
                return _context7.abrupt("return", {
                  id: json.id,
                  label: json.label,
                  isUserDefined: true
                });
              case 13:
              case "end":
                return _context7.stop();
            }
          }, _callee7);
        }));
        function update(_x6) {
          return _update2.apply(this, arguments);
        }
        return update;
      }(),
      "delete": function () {
        var _delete2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee8(input) {
          var response;
          return _regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this.init();
              case 2:
                _context8.next = 4;
                return _this.request("/projects/".concat(_this.project.id, "/templates/").concat(input.id), {
                  method: "DELETE"
                });
              case 4:
                response = _context8.sent;
                if (!(response.status !== 200)) {
                  _context8.next = 7;
                  break;
                }
                throw new Error();
              case 7:
              case "end":
                return _context8.stop();
            }
          }, _callee8);
        }));
        function _delete(_x7) {
          return _delete2.apply(this, arguments);
        }
        return _delete;
      }()
    });
    this.accessToken = args.accessToken;
    this.rootUrl = (_args$rootUrl = args.rootUrl) !== null && _args$rootUrl !== void 0 ? _args$rootUrl : "https://app.easyblocks.io";
  }
  return _createClass(EasyblocksBackend, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
        var response, projects;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              if (!this.project) {
                _context9.next = 2;
                break;
              }
              return _context9.abrupt("return");
            case 2:
              _context9.next = 4;
              return this.get("/projects");
            case 4:
              response = _context9.sent;
              if (!response.ok) {
                _context9.next = 14;
                break;
              }
              _context9.next = 8;
              return response.json();
            case 8:
              projects = _context9.sent;
              if (!(projects.length === 0)) {
                _context9.next = 11;
                break;
              }
              throw new Error("Authorization error. Have you provided a correct access token?");
            case 11:
              this.project = projects[0];
              _context9.next = 15;
              break;
            case 14:
              throw new Error("Initialization error in ApiClient");
            case 15:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee10(path, options) {
        var apiRequestUrl, _loop, _i, _Object$entries, headers, body;
        return _regeneratorRuntime.wrap(function _callee10$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              apiRequestUrl = new URL("".concat(this.rootUrl, "/api").concat(path));
              if (!(options.searchParams && Object.keys(options.searchParams).length > 0)) {
                _context11.next = 9;
                break;
              }
              _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
                var _Object$entries$_i, key, value;
                return _regeneratorRuntime.wrap(function _loop$(_context10) {
                  while (1) switch (_context10.prev = _context10.next) {
                    case 0:
                      _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                      if (Array.isArray(value)) {
                        value.forEach(function (value) {
                          apiRequestUrl.searchParams.append(key, value);
                        });
                      } else {
                        apiRequestUrl.searchParams.set(key, value);
                      }
                    case 2:
                    case "end":
                      return _context10.stop();
                  }
                }, _loop);
              });
              _i = 0, _Object$entries = Object.entries(options.searchParams);
            case 4:
              if (!(_i < _Object$entries.length)) {
                _context11.next = 9;
                break;
              }
              return _context11.delegateYield(_loop(), "t0", 6);
            case 6:
              _i++;
              _context11.next = 4;
              break;
            case 9:
              headers = _objectSpread(_objectSpread(_objectSpread({}, path.includes("assets") ? {} : {
                "Content-Type": "application/json"
              }), options.headers), {}, _defineProperty({}, AUTH_HEADER, this.accessToken));
              body = options.body ? _typeof(options.body) === "object" && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body : undefined;
              return _context11.abrupt("return", fetch(apiRequestUrl.toString(), {
                method: options.method,
                headers: headers,
                body: body
              }));
            case 12:
            case "end":
              return _context11.stop();
          }
        }, _callee10, this);
      }));
      function request(_x8, _x9) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "get",
    value: function () {
      var _get3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee11(path) {
        var options,
          _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              return _context12.abrupt("return", this.request(path, _objectSpread(_objectSpread({}, options), {}, {
                method: "GET"
              })));
            case 2:
            case "end":
              return _context12.stop();
          }
        }, _callee11, this);
      }));
      function get(_x10) {
        return _get3.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee12(path) {
        var options,
          _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              options = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
              return _context13.abrupt("return", this.request(path, _objectSpread(_objectSpread({}, options), {}, {
                method: "POST"
              })));
            case 2:
            case "end":
              return _context13.stop();
          }
        }, _callee12, this);
      }));
      function post(_x11) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee13(path) {
        var options,
          _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              options = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
              return _context14.abrupt("return", this.request(path, _objectSpread(_objectSpread({}, options), {}, {
                method: "PUT"
              })));
            case 2:
            case "end":
              return _context14.stop();
          }
        }, _callee13, this);
      }));
      function put(_x12) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee14(path) {
        var options,
          _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              options = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
              return _context15.abrupt("return", this.request(path, _objectSpread(_objectSpread({}, options), {}, {
                method: "DELETE"
              })));
            case 2:
            case "end":
              return _context15.stop();
          }
        }, _callee14, this);
      }));
      function _delete(_x13) {
        return _delete3.apply(this, arguments);
      }
      return _delete;
    }()
  }]);
}();
function documentDTOToDocument(documentDTO, entry) {
  if (!documentDTO.root_container) {
    throw new Error("unexpected server error");
  }
  return {
    id: documentDTO.id,
    version: documentDTO.version,
    entry: entry
  };
}
function documentWithResolvedConfigDTOToDocument(documentWithResolvedConfigDTO) {
  return documentDTOToDocument(documentWithResolvedConfigDTO, documentWithResolvedConfigDTO.config.config);
}

export { EasyblocksBackend };
