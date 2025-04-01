import { entries } from '../object/entries.js';

function omit(value, omittedKeys) {
  var filteredEntries = entries(value).filter(function (entry) {
    return !omittedKeys.includes(entry[0]);
  });
  return Object.fromEntries(filteredEntries);
}

export { omit };
