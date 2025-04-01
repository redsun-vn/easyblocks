/* with love from shopstory */
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { entries } from '@redsun-vn/easyblocks-utils';

function responsiveValueEntries(value) {
  var values = [];
  entries(value).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      v = _ref2[1];
    if (key === "$res") return;
    values.push([key, v]);
  });
  return values;
}

export { responsiveValueEntries };
