'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function addEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return function () {
    target.removeEventListener(type, listener, options);
  };
}

exports.addEventListener = addEventListener;
