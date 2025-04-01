function pick(prop) {
  return function pickPropFromValue(value) {
    return value[prop];
  };
}

export { pick };
