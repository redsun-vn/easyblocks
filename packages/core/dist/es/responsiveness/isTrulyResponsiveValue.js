/* with love from shopstory */
import _typeof from '@babel/runtime/helpers/typeof';

// Sorry for this name
function isTrulyResponsiveValue(x) {
  return _typeof(x) === "object" && x !== null && !Array.isArray(x) && x.$res === true;
}

export { isTrulyResponsiveValue };
