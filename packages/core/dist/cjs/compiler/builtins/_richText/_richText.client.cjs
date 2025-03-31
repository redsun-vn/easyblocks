/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var index = require('../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

function RichTextClient(props) {
  const {
    elements: Elements,
    Root
  } = props;
  return /*#__PURE__*/index.createElement(Root.type, Root.props, Elements.map((Element, index$1) => {
    return /*#__PURE__*/index.createElement(Element.type, _extends__default["default"]({}, Element.props, {
      key: index$1
    }));
  }));
}

exports.RichTextClient = RichTextClient;
