'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function range(start, end) {
  var itemsCount = start === end ? 1 : end - start + 1;
  return Array.from({
    length: itemsCount
  }, function (_, index) {
    return start + index;
  });
}

exports.range = range;
