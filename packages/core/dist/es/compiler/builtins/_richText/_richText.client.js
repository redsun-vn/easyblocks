/* with love from shopstory */
import _extends from '@babel/runtime/helpers/extends';
import React from 'react';

function RichTextClient(props) {
  var Elements = props.elements,
    Root = props.Root;
  return /*#__PURE__*/React.createElement(Root.type, Root.props, Elements.map(function (Element, index) {
    return /*#__PURE__*/React.createElement(Element.type, _extends({}, Element.props, {
      key: index
    }));
  }));
}

export { RichTextClient };
