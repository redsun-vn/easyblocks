'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.cjs');
var react = require('react');

function useForceRerender() {
  var _useState = react.useState({}),
    _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
    setDummyState = _useState2[1];
  var forceRerender = react.useRef(function () {
    setDummyState({});
  }).current;
  return {
    forceRerender: forceRerender
  };
}

exports.useForceRerender = useForceRerender;
