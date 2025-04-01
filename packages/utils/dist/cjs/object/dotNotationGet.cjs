'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function dotNotationGet(obj, path) {
  if (path === "") {
    return obj;
  }
  return path.split(".").reduce(function (acc, curVal) {
    return acc && acc[curVal];
  }, obj);
}

exports.dotNotationGet = dotNotationGet;
