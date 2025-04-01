'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var takeNumbers = function takeNumbers(path) {
  return path.split(".").map(function (x) {
    return parseInt(x, 10);
  }).filter(function (x) {
    return !Number.isNaN(x);
  });
};
var preOrderPathComparator = function preOrderPathComparator() {
  var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ascending";
  return function (pathA, pathB) {
    var order = direction === "ascending" ? 1 : -1;
    var numbersA = takeNumbers(pathA);
    var numbersB = takeNumbers(pathB);
    var numberALength = numbersA.length;
    var numberBLength = numbersB.length;
    if (numberALength === 0 || numberBLength === 0) {
      throw new Error("Cannot compare paths '".concat(pathA, "' and '").concat(pathB, "'."));
    }
    var shorterLength = Math.min(numberALength, numberBLength);
    var index = 0;
    while (index < shorterLength) {
      var valueA = numbersA[index];
      var valueB = numbersB[index];
      if (valueA !== valueB) {
        return order * Math.sign(valueA - valueB);
      }
      index++;
    }
    return order * Math.sign(numberBLength - numberALength);
  };
};

exports.preOrderPathComparator = preOrderPathComparator;
