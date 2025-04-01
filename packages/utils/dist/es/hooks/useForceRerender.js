import { slicedToArray as _slicedToArray } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useState, useRef } from 'react';

function useForceRerender() {
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    setDummyState = _useState2[1];
  var forceRerender = useRef(function () {
    setDummyState({});
  }).current;
  return {
    forceRerender: forceRerender
  };
}

export { useForceRerender };
