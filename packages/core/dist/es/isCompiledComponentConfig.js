/* with love from shopstory */
import _typeof from '@babel/runtime/helpers/typeof';

function isCompiledComponentConfig(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
arg) {
  return _typeof(arg) === "object" && arg !== null && typeof arg._component === "string" && typeof arg._id === "string" && _typeof(arg.actions) === "object" && _typeof(arg.components) === "object";
}

export { isCompiledComponentConfig };
