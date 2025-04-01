/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var easyblocksUtils = require('@redsun-vn/easyblocks-utils');

function selectionFramePositionChanged(target, container) {
  return {
    type: "@easyblocks-editor/selection-frame-position-changed",
    payload: {
      target: target,
      container: container
    }
  };
}
function richTextChangedEvent(payload) {
  return {
    type: "@easyblocks-editor/rich-text-changed",
    payload: easyblocksUtils.serialize(payload)
  };
}
function componentPickerOpened(path) {
  return {
    type: "@easyblocks-editor/component-picker-opened",
    payload: {
      path: path
    }
  };
}
function componentPickerClosed(config) {
  return {
    type: "@easyblocks-editor/component-picker-closed",
    payload: {
      config: config
    }
  };
}
function itemInserted(payload) {
  return {
    type: "@easyblocks-editor/item-inserted",
    payload: payload
  };
}
function itemMoved(payload) {
  return {
    type: "@easyblocks-editor/item-moved",
    payload: payload
  };
}

exports.componentPickerClosed = componentPickerClosed;
exports.componentPickerOpened = componentPickerOpened;
exports.itemInserted = itemInserted;
exports.itemMoved = itemMoved;
exports.richTextChangedEvent = richTextChangedEvent;
exports.selectionFramePositionChanged = selectionFramePositionChanged;
