/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.cjs');
var cleanString = require('../../../packages/utils/src/cleanString.cjs');

function TextClient(props) {
  const {
    value,
    Text
  } = props;

  // We need to transform new lines into <br />
  const lines = cleanString.cleanString(value || "").split(/(?:\r\n|\r|\n)/g);
  const elements = [];
  lines.forEach((line, index$1) => {
    elements.push(/*#__PURE__*/index.createElement(index.Fragment, {
      key: index$1
    }, line));
    if (index$1 !== lines.length - 1) {
      elements.push(/*#__PURE__*/index.createElement("br", {
        key: "br" + index$1
      }));
    }
  });
  return /*#__PURE__*/index.createElement(Text.type, Text.props, elements);
}

exports.TextClient = TextClient;
