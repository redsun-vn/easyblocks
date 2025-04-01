'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function includesAny(a, b) {
  return a.some(function (i) {
    return b.includes(i);
  });
}

exports.includesAny = includesAny;
