function includesAny(a, b) {
  return a.some(function (i) {
    return b.includes(i);
  });
}

export { includesAny };
