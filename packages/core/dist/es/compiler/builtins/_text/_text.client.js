/* with love from shopstory */
import { cleanString } from '@redsun-vn/easyblocks-utils';
import React from 'react';

function TextClient(props) {
  var value = props.value,
    Text = props.Text;

  // We need to transform new lines into <br />
  var lines = cleanString(value || "").split(/(?:\r\n|\r|\n)/g);
  var elements = [];
  lines.forEach(function (line, index) {
    elements.push(/*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, line));
    if (index !== lines.length - 1) {
      elements.push(/*#__PURE__*/React.createElement("br", {
        key: "br" + index
      }));
    }
  });
  return /*#__PURE__*/React.createElement(Text.type, Text.props, elements);
}

export { TextClient };
