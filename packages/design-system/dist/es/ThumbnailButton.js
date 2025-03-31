import styled from 'styled-components';
import * as React from 'react';
import { ButtonGhost } from './buttons.js';
import { Icons } from './icons.js';
import { Typography } from './Typography.js';

const Preview = styled.div.withConfig({
  displayName: "ThumbnailButton__Preview",
  componentId: "sc-1bsunzd-0"
})(["display:flex;align-items:center;justify-content:center;margin-left:-1px;width:32px;height:32px;border:1px solid #e5e5e5;border-radius:2px;position:relative;min-width:0;"]);
const PreviewImage = styled.img.withConfig({
  displayName: "ThumbnailButton__PreviewImage",
  componentId: "sc-1bsunzd-1"
})(["display:block;max-width:100%;max-height:100%;object-fit:contain;"]);
const SolidColorPreview = styled.div.withConfig({
  displayName: "ThumbnailButton__SolidColorPreview",
  componentId: "sc-1bsunzd-2"
})(["width:100%;height:100%;background-color:", ";"], _ref => {
  let {
    color
  } = _ref;
  return color;
});
const ContentRoot = styled.div.withConfig({
  displayName: "ThumbnailButton__ContentRoot",
  componentId: "sc-1bsunzd-3"
})(["display:flex;align-items:center;gap:8px;width:100%;"]);
const Labels = styled.div.withConfig({
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
    preview = /*#__PURE__*/React.createElement(PreviewImage, {
      src: thumbnail.src,
      "aria-hidden": "true"
    });
  } else if (thumbnail?.type === "color") {
    preview = /*#__PURE__*/React.createElement(SolidColorPreview, {
      color: thumbnail.color
    });
  } else if (thumbnail?.type === "icon") {
    const ComponentIcon = thumbnail.icon === "link" ? Icons.Link : thumbnail.icon === "grid_3x3" ? Icons.Grid3x3 : Icons.Link;
    preview = /*#__PURE__*/React.createElement(ComponentIcon, {
      size: 16
    });
  } else {
    preview = /*#__PURE__*/React.createElement(SolidColorPreview, {
      color: "transparent"
    });
  }
  const content = /*#__PURE__*/React.createElement(ContentRoot, null, /*#__PURE__*/React.createElement(Preview, null, preview), /*#__PURE__*/React.createElement(Labels, null, /*#__PURE__*/React.createElement(Typography, {
    variant: "label",
    isTruncated: true
  }, label), description && /*#__PURE__*/React.createElement(Typography, {
    variant: "body",
    color: "black40",
    isTruncated: true
  }, description)));
  if (disabled) {
    return /*#__PURE__*/React.createElement(ContentRoot, null, content);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(ButtonGhost, {
    onClick: onClick,
    height: "32px",
    noPadding: true
  }, content));
}

export { ThumbnailButton };
