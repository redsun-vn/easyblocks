'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.cjs');

function dotNotationSet(obj, path, value) {
  if (path === "") {
    throw new Error("Path can't be empty in dotNotationSetter");
  }
  if (_rollupPluginBabelHelpers["typeof"](obj) !== "object" || obj === null) {
    throw new Error("dotNotationSet - you're trying to set value for non-object");
  }
  var splitPath = typeof path === "string" ? path.split(".").map(function (x) {
    if (typeof x === "string" && !isNaN(parseInt(x))) {
      return parseInt(x);
    }
    return x;
  }) : path;
  if (splitPath.length === 1) {
    obj[splitPath[0]] = value;
  } else {
    if (!obj[splitPath[0]]) {
      if (typeof splitPath[1] === "number") {
        obj[splitPath[0]] = [];
      } else {
        obj[splitPath[0]] = {};
      }
    }
    dotNotationSet(obj[splitPath[0]], splitPath.slice(1), value);
  }
}

exports.dotNotationSet = dotNotationSet;
