'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toast = require('react-hot-toast');
var fonts = require('./fonts.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var toast__default = /*#__PURE__*/_interopDefaultLegacy(toast);

function useToaster() {
  const style = {
    borderRadius: "4px",
    ...fonts.Fonts.body
  };
  return {
    notify: message => {
      toast__default["default"](message, {
        style
      });
    },
    success: function (message) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      toast__default["default"].success(message, {
        style,
        duration: options.duration
      });
    },
    error: message => {
      toast__default["default"].error(message, {
        style
      });
    }
  };
}

Object.defineProperty(exports, 'Toaster', {
  enumerable: true,
  get: function () { return toast.Toaster; }
});
exports.useToaster = useToaster;
