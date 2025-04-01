'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function sum(elements) {
  return elements.reduce(function (sum, element) {
    return sum + element;
  }, 0);
}

exports.sum = sum;
