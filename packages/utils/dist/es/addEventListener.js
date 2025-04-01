function addEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return function () {
    target.removeEventListener(type, listener, options);
  };
}

export { addEventListener };
