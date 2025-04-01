/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var box = require('../../compiler/box.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["__compiled", "__name", "passedProps", "devices", "stitches"],
  _excluded2 = ["__as"],
  _excluded3 = ["as", "itemWrappers", "className"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var boxStyles = {
  boxSizing: "border-box",
  minWidth: "0px",
  margin: 0,
  padding: 0,
  border: 0,
  listStyle: "none"
};
var Box = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
  /**
   * passedProps - the props given in component code like <MyBox data-id="abc" /> (data-id is in passedProps)
   * restProps - the props given by Shopstory (like from actionWrapper)
   *
   * They are merged into "realProps".
   *
   * I know those names sucks, this needs to be cleaned up.
   */

  var __compiled = props.__compiled,
    __name = props.__name,
    passedProps = props.passedProps,
    devices = props.devices,
    stitches = props.stitches,
    restProps = _objectWithoutProperties__default["default"](props, _excluded);
  var __as = __compiled.__as,
    styles = _objectWithoutProperties__default["default"](__compiled, _excluded2);
  var realProps = _objectSpread(_objectSpread({}, restProps), passedProps);
  var as = realProps.as;
    realProps.itemWrappers;
    var className = realProps.className,
    restPassedProps = _objectWithoutProperties__default["default"](realProps, _excluded3);
  var _useMemo = React.useMemo(function () {
      /**
       * Why parse+stringify?
       *
       * Because if we remove them some nested objects in styles (like media queries etc) don't work (although they exist in the object).
       * Why? My bet is this: Stitches uses CSSOM to inject styles. Maybe (for some weird reason, maybe even browser bug) if some part of the object is not in iframe scope but in parent window scope then it's somehow ignored? Absolutely no idea right now, happy this works.
       */
      var correctedStyles = box.getBoxStyles(JSON.parse(JSON.stringify(styles)), devices);
      var generateBoxClass = stitches.css(boxStyles);
      var generateClassName = stitches.css(correctedStyles);
      return {
        boxClassName: generateBoxClass(),
        componentClassName: generateClassName()
      };
    }, [styles.__hash]),
    boxClassName = _useMemo.boxClassName,
    componentClassName = _useMemo.componentClassName;
  return /*#__PURE__*/React__default["default"].createElement(as || __as || "div", _objectSpread(_objectSpread({
    ref: ref
  }, restPassedProps), {}, {
    className: [boxClassName, componentClassName, className].filter(Boolean).join(" "),
    "data-testid": __name
  }), props.children);
});

exports.Box = Box;
