function sum(elements) {
  return elements.reduce(function (sum, element) {
    return sum + element;
  }, 0);
}

export { sum };
