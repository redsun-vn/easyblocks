'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var Select = require('react-select');
var fonts = require('./fonts.js');
var colors = require('./colors.js');
var icons = require('./icons.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Select__default = /*#__PURE__*/_interopDefaultLegacy(Select);

const options = [{
  value: "chocolate",
  label: "Chocolate"
}, {
  value: "strawberry",
  label: "Strawberry"
}, {
  value: "vanilla",
  label: "Vanilla"
}];
function DropdownIndicator() {
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      padding: "0px 3px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(icons.Icons.ChevronDown, {
    size: 16
  }));
}
function ClearIndicator(props) {
  return /*#__PURE__*/React__default["default"].createElement("div", _extends__default["default"]({}, props.innerProps, {
    style: {
      padding: "0px 6px"
    }
  }), /*#__PURE__*/React__default["default"].createElement(icons.Icons.Close, {
    size: 12
  }));
}

// export type MutliSelectProps = {
//   value: string,
//   options:
// }

function MultiSelect() {
  return /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
    options: options,
    isMulti: true,
    styles: {
      // @ts-ignore
      container: (baseStyles, state) => ({
        ...baseStyles,
        ...fonts.Fonts.body
      }),
      // @ts-ignore
      control: (baseStyles, state) => {
        return {
          ...baseStyles,
          borderWidth: 0,
          borderRadius: 2,
          boxShadow: state.isFocused ? `0 0 0 2px ${colors.Colors.focus}` : `0 0 0 1px ${colors.Colors.black10}`,
          "&:hover": {
            borderColor: colors.Colors.black20
          },
          minHeight: 28
        };
      },
      // @ts-ignore
      clearIndicator: baseStyles => {
        {
          return {
            ...baseStyles,
            padding: 4
          };
        }
      },
      // @ts-ignore
      dropdownIndicator: baseStyles => {
        console.log("dropdown", baseStyles);
        return {
          ...baseStyles,
          padding: 4
        };
      },
      // @ts-ignore
      valueContainer: baseStyles => {
        {
          return {
            ...baseStyles,
            padding: "2px 6px"
          };
        }
      }
    },
    components: {
      DropdownIndicator,
      // @ts-ignore
      ClearIndicator
    }
  });
}

exports.MultiSelect = MultiSelect;
