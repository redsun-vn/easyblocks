function assertDefined(value, message) {
  if (value === undefined) {
    throw new Error(message !== null && message !== void 0 ? message : "Value is undefined");
  }
  return value;
}
function assertNonNullable(value) {
  if (value === null) {
    throw new Error("Value is null");
  }
  return value;
}

export { assertDefined, assertNonNullable };
