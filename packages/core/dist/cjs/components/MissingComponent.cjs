/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var rootStyles = {
  position: "relative",
  width: "100%"
};
var ratioStyles = function ratioStyles(_ref) {
  var type = _ref.type;
  return {
    paddingBottom: function () {
      if (type === "SECTION") {
        return "50%";
      }
      if (type === "CARD") {
        return "133%";
      }
      return "auto";
    }(),
    display: type === "BUTTON" ? "none" : "block",
    height: type === "BUTTON" ? "50px" : "auto"
  };
};
var contentStyles = function contentStyles(_ref2) {
  var type = _ref2.type,
    error = _ref2.error;
  return {
    position: type === "CARD" || type === "SECTION" ? "absolute" : "static",
    boxSizing: "border-box",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fafafa",
    color: error ? "red" : "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    textAlign: "center",
    fontSize: "14px",
    minHeight: "40px",
    padding: type === "CARD" || type === "SECTION" ? "32px" : "0.5em 0.5em"
  };
};
function MissingComponent(_ref3) {
  var component = _ref3.component,
    children = _ref3.children,
    error = _ref3.error;
  var isButton = (component === null || component === void 0 ? void 0 : component.type) === "button" || Array.isArray(component === null || component === void 0 ? void 0 : component.type) && (component === null || component === void 0 ? void 0 : component.type.includes("button"));
  var isSection = (component === null || component === void 0 ? void 0 : component.type) === "section" || Array.isArray(component === null || component === void 0 ? void 0 : component.type) && (component === null || component === void 0 ? void 0 : component.type.includes("section"));
  var isCard = (component === null || component === void 0 ? void 0 : component.type) === "card" || Array.isArray(component === null || component === void 0 ? void 0 : component.type) && (component === null || component === void 0 ? void 0 : component.type.includes("card"));
  var type;
  if (isSection) {
    type = "SECTION";
  } else if (isCard) {
    type = "CARD";
  } else if (isButton) {
    type = "BUTTON";
  }
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: rootStyles
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: ratioStyles({
      type: type
    })
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    style: contentStyles({
      type: type,
      error: error
    })
  }, children));
}

exports.MissingComponent = MissingComponent;
