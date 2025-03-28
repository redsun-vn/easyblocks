'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components');
var reactIcons = require('@radix-ui/react-icons');
var RadixSelect = require('@radix-ui/react-select');
var React = require('react');
var colors = require('../colors.js');
var fonts = require('../fonts.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var RadixSelect__namespace = /*#__PURE__*/_interopNamespace(RadixSelect);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const SelectTrigger = styled__default["default"](RadixSelect__namespace.Trigger).withConfig({
  displayName: "Select__SelectTrigger",
  componentId: "sc-12im6wd-0"
})(["all:unset;display:flex;align-items:center;", ";"], fonts.Fonts.body);
var _StyledSelectTrigger = styled__default["default"](SelectTrigger).withConfig({
  displayName: "Select___StyledSelectTrigger",
  componentId: "sc-12im6wd-1"
})(["display:flex;gap:4px;max-width:100%;box-sizing:border-box;height:28px;padding:0 2px 0 6px;border-radius:2px;@media (hover:hover){&:hover{box-shadow:0 0 0 1px ", ";}}"], p => p.$_css);
function Select(props) {
  return /*#__PURE__*/React__default["default"].createElement(RadixSelect__namespace.Root, {
    value: props.value,
    onValueChange: props.onChange
  }, /*#__PURE__*/React__default["default"].createElement(_StyledSelectTrigger, {
    $_css: colors.Colors.black10
  }, /*#__PURE__*/React__default["default"].createElement(_StyledRadixSelectValue, {
    placeholder: props.placeholder ?? "Select a value..."
  }), /*#__PURE__*/React__default["default"].createElement(RadixSelect__namespace.Icon, null, /*#__PURE__*/React__default["default"].createElement(reactIcons.ChevronDownIcon, {
    color: colors.Colors.black40
  }))), /*#__PURE__*/React__default["default"].createElement(RadixSelect__namespace.Portal, null, /*#__PURE__*/React__default["default"].createElement(_StyledRadixSelectContent, {
    $_css2: colors.Colors.black10
  }, /*#__PURE__*/React__default["default"].createElement(RadixSelect__namespace.Viewport, null, props.children))));
}
const SelectItemWrapper = styled__default["default"](RadixSelect__namespace.Item).withConfig({
  displayName: "Select__SelectItemWrapper",
  componentId: "sc-12im6wd-2"
})(["display:flex;align-items:center;gap:6px;box-sizing:border-box;min-height:28px;padding:0 6px;", ";color:#000;background:#fff;outline:none;&[data-state=\"unchecked\"]{padding-left:calc(6px + 15px + 6px);}&[data-highlighted]{background:#daeafd;}@media (hover:hover){cursor:pointer;}"], fonts.Fonts.body);
const SelectItem = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React__default["default"].createElement(SelectItemWrapper, {
    value: props.value,
    disabled: props.isDisabled ?? false,
    ref: ref
  }, /*#__PURE__*/React__default["default"].createElement(RadixSelect__namespace.ItemIndicator, null, /*#__PURE__*/React__default["default"].createElement(reactIcons.CheckIcon, {
    color: "#202123"
  })), /*#__PURE__*/React__default["default"].createElement(RadixSelect__namespace.ItemText, null, props.children));
});
function SelectSeparator() {
  return /*#__PURE__*/React__default["default"].createElement(_StyledRadixSelectSeparator, {
    $_css3: colors.Colors.black100
  });
}
var _StyledRadixSelectValue = styled__default["default"](RadixSelect__namespace.Value).withConfig({
  displayName: "Select___StyledRadixSelectValue",
  componentId: "sc-12im6wd-3"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
var _StyledRadixSelectContent = styled__default["default"](RadixSelect__namespace.Content).withConfig({
  displayName: "Select___StyledRadixSelectContent",
  componentId: "sc-12im6wd-4"
})(["min-width:100px;max-height:600px;padding:4px 0;background:#fff;border:1px solid ", ";border-radius:2px;box-shadow:0px 2px 14px 0px rgba(0,0,0,0.15);"], p => p.$_css2);
var _StyledRadixSelectSeparator = styled__default["default"](RadixSelect__namespace.Separator).withConfig({
  displayName: "Select___StyledRadixSelectSeparator",
  componentId: "sc-12im6wd-5"
})(["height:1px;margin:4px;background:", ";"], p => p.$_css3);

exports.Select = Select;
exports.SelectItem = SelectItem;
exports.SelectSeparator = SelectSeparator;
