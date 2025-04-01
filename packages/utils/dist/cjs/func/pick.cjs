'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function pick(prop) {
  return function pickPropFromValue(value) {
    return value[prop];
  };
}

exports.pick = pick;
