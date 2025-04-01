function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}

export { deepClone };
