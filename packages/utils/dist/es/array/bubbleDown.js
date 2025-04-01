function bubbleDown(matcher, items) {
  var originalOrder = [];
  var bubbledDown = [];
  items.forEach(function (item) {
    if (matcher(item)) {
      bubbledDown.push(item);
    } else {
      originalOrder.push(item);
    }
  });
  return [].concat(originalOrder, bubbledDown);
}

export { bubbleDown };
