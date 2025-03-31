'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components');
var React = require('react');
var buttons = require('./buttons.js');
var icons = require('./icons.js');
var Typography = require('./Typography.js');

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
var React__namespace = /*#__PURE__*/_interopNamespace(React);

const Preview = styled__default["default"].div.withConfig({
  displayName: "ThumbnailButton__Preview",
  componentId: "sc-1bsunzd-0"
})(["display:flex;align-items:center;justify-content:center;margin-left:-1px;width:32px;height:32px;border:1px solid #e5e5e5;border-radius:2px;position:relative;min-width:0;"]);
const PreviewImage = styled__default["default"].img.withConfig({
  displayName: "ThumbnailButton__PreviewImage",
  componentId: "sc-1bsunzd-1"
})(["display:block;max-width:100%;max-height:100%;object-fit:contain;"]);
const SolidColorPreview = styled__default["default"].div.withConfig({
  displayName: "ThumbnailButton__SolidColorPreview",
  componentId: "sc-1bsunzd-2"
})(["width:100%;height:100%;background-color:", ";"], _ref => {
  let {
    color
  } = _ref;
  return color;
});
const ContentRoot = styled__default["default"].div.withConfig({
  displayName: "ThumbnailButton__ContentRoot",
  componentId: "sc-1bsunzd-3"
})(["display:flex;align-items:center;gap:8px;width:100%;"]);
const Labels = styled__default["default"].div.withConfig({
  displayName: "ThumbnailButton__Labels",
  componentId: "sc-1bsunzd-4"
})(["flex:1 0;overflow:hidden;min-width:0;display:grid;"]);
function ThumbnailButton(_ref2) {
  let {
    onClick,
    label,
    description,
    thumbnail,
    disabled
  } = _ref2;
  let preview;
  if (thumbnail?.type === "image") {
    preview = /*#__PURE__*/React__namespace.createElement(PreviewImage, {
      src: thumbnail.src,
      "aria-hidden": "true"
    });
  } else if (thumbnail?.type === "color") {
    preview = /*#__PURE__*/React__namespace.createElement(SolidColorPreview, {
      color: thumbnail.color
    });
  } else if (thumbnail?.type === "icon") {
    const ComponentIcon = thumbnail.icon === "link" ? icons.Icons.Link : thumbnail.icon === "grid_3x3" ? icons.Icons.Grid3x3 : icons.Icons.Link;
    preview = /*#__PURE__*/React__namespace.createElement(ComponentIcon, {
      size: 16
    });
  } else {
    preview = /*#__PURE__*/React__namespace.createElement(SolidColorPreview, {
      color: "transparent"
    });
  }
  const content = /*#__PURE__*/React__namespace.createElement(ContentRoot, null, /*#__PURE__*/React__namespace.createElement(Preview, null, preview), /*#__PURE__*/React__namespace.createElement(Labels, null, /*#__PURE__*/React__namespace.createElement(Typography.Typography, {
    variant: "label",
    isTruncated: true
  }, label), description && /*#__PURE__*/React__namespace.createElement(Typography.Typography, {
    variant: "body",
    color: "black40",
    isTruncated: true
  }, description)));
  if (disabled) {
    return /*#__PURE__*/React__namespace.createElement(ContentRoot, null, content);
  }
  return /*#__PURE__*/React__namespace.createElement("div", {
    style: {
      display: "grid",
      width: "100%"
    }
  }, /*#__PURE__*/React__namespace.createElement(buttons.ButtonGhost, {
    onClick: onClick,
    height: "32px",
    noPadding: true
  }, content));
}

exports.ThumbnailButton = ThumbnailButton;
