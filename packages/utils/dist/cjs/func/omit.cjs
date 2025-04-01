'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var entries = require('../object/entries.cjs');

function omit(value, omittedKeys) {
  var filteredEntries = entries.entries(value).filter(function (entry) {
    return !omittedKeys.includes(entry[0]);
  });
  return Object.fromEntries(filteredEntries);
}

exports.omit = omit;
