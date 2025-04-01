'use client';
/* with love from shopstory */
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { dotNotationGet, deepClone, deepCompare } from '@redsun-vn/easyblocks-utils';
import throttle from 'lodash/throttle';
import React, { useState, useRef, useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { createEditor, Transforms, Range, Editor, Text } from 'slate';
import { withReact, ReactEditor, Slate, Editable } from 'slate-react';
import { Box } from '../../../components/Box/Box.js';
import { ComponentBuilder } from '../../../components/ComponentBuilder/ComponentBuilder.js';
import { getFallbackForLocale } from '../../../locales.js';
import { compileBox, getBoxStyles } from '../../box.js';
import { getDevicesWidths } from '../../devices.js';
import { duplicateConfig } from '../../duplicateConfig.js';
import { RICH_TEXT_CONFIG_SYNC_THROTTLE_TIMEOUT, RICH_TEXT_FOCUSED_FIELDS_SYNC_THROTTLE_TIMEOUT } from './_richText.constants.js';
import { RichTextPartClient } from './_richTextPart/_richTextPart.client.js';
import { getAbsoluteRichTextPartPath } from './getAbsoluteRichTextPartPath.js';
import { updateSelection } from './richTextEditorActions.js';
import { convertEditorValueToRichTextElements } from './utils/convertEditorValueToRichTextElements.js';
import { convertRichTextElementsToEditorValue } from './utils/convertRichTextElementsToEditorValue.js';
import { createTemporaryEditor } from './utils/createTemporaryEditor.js';
import { extractElementsFromCompiledComponents } from './utils/extractElementsFromCompiledComponents.js';
import { extractTextPartsFromCompiledComponents } from './utils/extractTextPartsFromCompiledComponents.js';
import { getEditorSelectionFromFocusedFields } from './utils/getEditorSelectionFromFocusedFields.js';
import { getFocusedFieldsFromSlateSelection } from './utils/getFocusedFieldsFromSlateSelection.js';
import { getFocusedRichTextPartsConfigPaths } from './utils/getFocusedRichTextPartsConfigPaths.js';
import { getRichTextComponentConfigFragment } from './utils/getRichTextComponentConfigFragment.js';
import { withEasyblocks, NORMALIZED_IDS_TO_IDS } from './withEasyblocks.js';
import { responsiveValueFill } from '../../../responsiveness/responsiveValueFill.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function RichTextEditor(props) {
  var editorContext = window.parent.editorWindowAPI.editorContext;
  var actions = editorContext.actions,
    contextParams = editorContext.contextParams,
    form = editorContext.form,
    focussedField = editorContext.focussedField,
    locales = editorContext.locales,
    setFocussedField = editorContext.setFocussedField;
  var _props$__easyblocks = props.__easyblocks,
    path = _props$__easyblocks.path,
    _props$__easyblocks$r = _props$__easyblocks.runtime,
    resop = _props$__easyblocks$r.resop,
    stitches = _props$__easyblocks$r.stitches,
    devices = _props$__easyblocks$r.devices,
    align = props.align;
  var richTextConfig = dotNotationGet(form.values, path);
  var _useState = useState(function () {
      return withEasyblocks(withReact(createEditor()));
    }),
    _useState2 = _slicedToArray(_useState, 1),
    editor = _useState2[0];
  var localizedRichTextElements = richTextConfig.elements[contextParams.locale];
  var fallbackRichTextElements = getFallbackForLocale(richTextConfig.elements, contextParams.locale, locales);
  var richTextElements = localizedRichTextElements !== null && localizedRichTextElements !== void 0 ? localizedRichTextElements : fallbackRichTextElements;
  var richTextElementsConfigPath = "".concat(path, ".elements.").concat(contextParams.locale);
  var _useState3 = useState(function () {
      return convertRichTextElementsToEditorValue(richTextElements);
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    editorValue = _useState4[0],
    setEditorValue = _useState4[1];

  // If rich text has no value, we initialize it with default config by updating it during first render
  // This is only possible when we open entry for non main locale without fallback, this is total edge case
  if (richTextElements.length === 0 && !fallbackRichTextElements) {
    // We only want to show rich text for default config within this component, we don't want to update raw content
    // To prevent implicit update of raw content we make a deep copy.
    richTextConfig = deepClone(richTextConfig);
    richTextConfig.elements[contextParams.locale] = convertEditorValueToRichTextElements(editorValue);
  }

  /**
   * Controls the visibility of decoration imitating browser selection of
   * the selected text after the user has blurred the content editable element.
   */
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isDecorationActive = _useState6[0],
    setIsDecorationActive = _useState6[1];

  /**
   * Keeps track what caused last change to editor value.
   * This is used in two cases:
   * - text-only changes of editable content shouldn't trigger update of `editor.children` ("text-input")
   * - changes from outside of editable content shouldn't trigger writing to editor's history within change callback ("external")
   */
  var lastChangeReason = useRef("text-input");

  /**
   * Whether the content editable is enabled or not. We enable it through double click.
   */
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isEnabled = _useState8[0],
    setIsEnabled = _useState8[1];
  var previousRichTextComponentConfig = useRef();
  var currentSelectionRef = useRef(null);
  var isConfigChanged = !isConfigEqual(previousRichTextComponentConfig.current, richTextConfig);
  if (previousRichTextComponentConfig.current && isConfigChanged) {
    if (lastChangeReason.current !== "paste") {
      lastChangeReason.current = "external";
    }
    previousRichTextComponentConfig.current = richTextConfig;
    var nextEditorValue = convertRichTextElementsToEditorValue(richTextElements);
    // React bails out the render if state setter function is invoked during the render phase.
    // Doing it makes Slate always up-to date with the latest config if it's changed from outside.
    // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
    setEditorValue(nextEditorValue);
    editor.children = nextEditorValue;
    if (isEnabled) {
      var newEditorSelection = getEditorSelectionFromFocusedFields(focussedField, form);
      if (isDecorationActive) {
        currentSelectionRef.current = newEditorSelection;
      } else {
        // Slate gives us two methods to update its selection:
        // - `setSelection` updates current selection, so `editor.selection` must be not null
        // - `select` sets the selection, so `editor.selection` must be null
        if (newEditorSelection !== null && editor.selection !== null) {
          Transforms.setSelection(editor, newEditorSelection);
        } else if (newEditorSelection !== null && editor.selection === null) {
          Transforms.select(editor, newEditorSelection);
        } else {
          Transforms.deselect(editor);
        }
      }
    }
  }
  useLayoutEffect(function () {
    if (isDecorationActive && currentSelectionRef.current !== null && !Range.isCollapsed(currentSelectionRef.current)) {
      splitStringNodes(editor, currentSelectionRef.current);
      return function () {
        unwrapStringNodesContent(editor);
      };
    }
  }, [editor, isDecorationActive, richTextConfig]);
  var isRichTextActive = focussedField.some(function (focusedField) {
    return focusedField.startsWith(path);
  });
  useLayoutEffect(function () {
    // When rich text becomes inactive we want to restore all original [data-slate-string] nodes
    // by removing all span wrappers that we added to show the mocked browser selection.
    if (!isRichTextActive) {
      unwrapStringNodesContent(editor);
    }
  }, [editor, isRichTextActive]);
  useEffect(function () {
    // We set previous value of rich text only once, then we manually assign it when needed.
    previousRichTextComponentConfig.current = richTextConfig;
  }, []);
  useEffect(
  // Component is blurred when the user selects other component in editor. This is different from blurring content editable.
  // Content editable can be blurred, but the component can remain active ex. when we select some text within content editable
  // and want to update its color from the sidebar.
  function handleRichTextBlur() {
    if (!isRichTextActive && isEnabled) {
      // editor.children = deepClone(editorValue);
      setIsEnabled(false);
      currentSelectionRef.current = null;
    }
    if (!editor.selection) {
      return;
    }
    if (!isRichTextActive) {
      Transforms.deselect(editor);
      var isSlateValueEmpty = isEditorValueEmpty(editor.children);

      // When value for current locale is empty we want to show value from fallback value instead of placeholder
      // if the fallback value is present.
      if (isSlateValueEmpty && fallbackRichTextElements !== undefined) {
        var nextRichTextElement = deepClone(richTextConfig);
        delete nextRichTextElement.elements[contextParams.locale];
        editor.children = convertRichTextElementsToEditorValue(fallbackRichTextElements);
        form.change(path, nextRichTextElement);
      }
    }
  }, [focussedField, isEnabled, isRichTextActive]);
  useEffect(function () {
    // If editor has been refocused and it was blurred earlier we have to disable the decoration to show only browser selection
    if (ReactEditor.isFocused(editor) && isDecorationActive) {
      setIsDecorationActive(false);
    }
  });
  useEffect(function () {
    function handleRichTextChanged(event) {
      if (!editor.selection) {
        return;
      }
      if (event.data.type === "@easyblocks-editor/rich-text-changed") {
        var payload = event.data.payload;
        var _editorContext = window.parent.editorWindowAPI.editorContext;

        // Slate is an uncontrolled component and we don't have an easy access to control it.
        // It keeps its state internally and on each change we convert this state to our format.
        // This works great because changing content of editable element is easy, we append or remove things.
        // When we change the color/font of selected text there are many questions:
        // - is the current selection partial or does it span everything?
        // - how to split text chunks when selection is partial?
        // - how to update selection?
        //
        // `Editor.addMark` method automatically will split (or not) text chunks, update selection etc.
        // It will just do all the painful things. After the Slate do its job, we take its current state after the update
        // and convert it to entry and correct focused fields.
        var temporaryEditor = createTemporaryEditor(editor);
        var updateSelectionResult = updateSelection.apply(void 0, [temporaryEditor, payload.prop].concat(_toConsumableArray(payload.values)));
        if (!updateSelectionResult) {
          return;
        }
        currentSelectionRef.current = temporaryEditor.selection;
        actions.runChange(function () {
          var newRichTextElement = _objectSpread(_objectSpread({}, richTextConfig), {}, {
            elements: _objectSpread(_objectSpread({}, richTextConfig.elements), {}, _defineProperty({}, _editorContext.contextParams.locale, updateSelectionResult.elements))
          });
          form.change(path, newRichTextElement);
          var newFocusedFields = updateSelectionResult.focusedRichTextParts.map(function (focusedRichTextPart) {
            return getAbsoluteRichTextPartPath(focusedRichTextPart, path, _editorContext.contextParams.locale);
          });
          return newFocusedFields;
        });
      }
    }
    window.addEventListener("message", handleRichTextChanged);
    return function () {
      window.removeEventListener("message", handleRichTextChanged);
    };
  }, [richTextConfig, path]);
  var decorate = createTextSelectionDecorator(editor);
  var Elements = extractElementsFromCompiledComponents(props);
  function renderElement(_ref) {
    var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;
    var Element = Elements.find(function (Element) {
      return Element._id === element.id || NORMALIZED_IDS_TO_IDS.get(element.id) === Element._id;
    });
    if (!Element) {
      // This can only happen if the current locale has no value and has no fallback
      if (Elements.length === 0) {
        if (element.type === "list-item") {
          return /*#__PURE__*/React.createElement("div", attributes, /*#__PURE__*/React.createElement("div", null, children));
        }
        return /*#__PURE__*/React.createElement("div", attributes, children);
      }
      throw new Error("Missing element");
    }
    var compiledStyles = function () {
      if (Element._component === "@easyblocks/rich-text-block-element") {
        if (Element.props.type === "bulleted-list") {
          return Element.styled.BulletedList;
        } else if (Element.props.type === "numbered-list") {
          return Element.styled.NumberedList;
        } else if (Element.props.type === "paragraph") {
          return Element.styled.Paragraph;
        }
      } else if (Element._component === "@easyblocks/rich-text-line-element") {
        if (element.type === "text-line") {
          return Element.styled.TextLine;
        } else if (element.type === "list-item") {
          return Element.styled.ListItem;
        }
      }
    }();
    if (compiledStyles === undefined) {
      throw new Error("Unknown element type");
    }
    return /*#__PURE__*/React.createElement(Box, _extends({
      __compiled: compiledStyles,
      devices: devices,
      stitches: stitches
    }, attributes, "production" === "development" ), element.type === "list-item" ? /*#__PURE__*/React.createElement("div", null, children) : children);
  }
  var TextParts = extractTextPartsFromCompiledComponents(props);
  function renderLeaf(_ref2) {
    var attributes = _ref2.attributes,
      children = _ref2.children,
      leaf = _ref2.leaf;
    var TextPart = TextParts.find(function (TextPart) {
      return TextPart._id === leaf.id;
    });
    if (!TextPart) {
      TextPart = TextParts.find(function (TextPart) {
        return NORMALIZED_IDS_TO_IDS.get(leaf.id) === TextPart._id;
      });
    }
    if (!TextPart) {
      // This can only happen if the current locale has no value and has no fallback
      if (TextParts.length === 0) {
        return /*#__PURE__*/React.createElement("span", attributes, children);
      }
      throw new Error("Missing part");
    }
    var TextPartComponent = /*#__PURE__*/React.createElement(RichTextPartClient, {
      value: children,
      Text: /*#__PURE__*/React.createElement(Box, _extends({
        __compiled: TextPart.styled.Text,
        devices: devices,
        stitches: stitches
      }, attributes)),
      TextWrapper: TextPart.components.TextWrapper[0] ? /*#__PURE__*/React.createElement(ComponentBuilder, {
        compiled: TextPart.components.TextWrapper[0],
        path: path,
        components: editorContext.components,
        passedProps: {
          __isSelected: leaf.isHighlighted && leaf.highlightType === "textWrapper"
        }
      }) : undefined
    });
    return TextPartComponent;
  }

  // Setting `display: flex` for element's aligning on `Editable` component makes default styles
  // of placeholder insufficient thus they require to explicitly set `top` and `left`.
  function renderPlaceholder(_ref3) {
    var attributes = _ref3.attributes,
      children = _ref3.children;
    return /*#__PURE__*/React.createElement("span", _extends({}, attributes, {
      style: _objectSpread(_objectSpread({}, attributes.style), {}, {
        top: 0,
        left: 0
      })
    }), children);
  }
  var scheduleConfigSync = useCallback(throttle(function (nextValue) {
    setEditorValue(nextValue);
    var nextElements = convertEditorValueToRichTextElements(nextValue);
    actions.runChange(function () {
      var newRichTextElement = _objectSpread(_objectSpread({}, richTextConfig), {}, {
        elements: _objectSpread(_objectSpread({}, richTextConfig.elements), {}, _defineProperty({}, editorContext.contextParams.locale, nextElements))
      });
      form.change(path, newRichTextElement);
      previousRichTextComponentConfig.current = newRichTextElement;
      if (editor.selection) {
        var nextFocusedFields = getFocusedFieldsFromSlateSelection(editor, path, contextParams.locale);
        return nextFocusedFields;
      }
    });
  }, RICH_TEXT_CONFIG_SYNC_THROTTLE_TIMEOUT), [isConfigChanged, editorContext.contextParams.locale]);
  var scheduleFocusedFieldsChange = useCallback(
  // Slate internally throttles the invocation of DOMSelectionChange for performance reasons.
  // We also throttle update of our focused fields state for the same reason.
  // This gives us a good balance between perf and showing updated fields within the sidebar.
  throttle(function (focusedFields) {
    setFocussedField(focusedFields);
  }, RICH_TEXT_FOCUSED_FIELDS_SYNC_THROTTLE_TIMEOUT), [setFocussedField]);
  function handleEditableChange(value) {
    if (!isEnabled) {
      return;
    }

    // Editor's value can be changed from outside ex. sidebar or history undo/redo. If the last reason for change
    // was "external", we skip this change. In case we would like to start typing immediately after undo/redo we
    // set last change reason to `text-input`.
    if (lastChangeReason.current === "external" || lastChangeReason.current === "paste") {
      lastChangeReason.current = "text-input";
      return;
    }
    var isValueSame = deepCompare(value, editorValue);

    // Slate runs `onChange` callback on any change, even when the text haven't changed.
    // If value haven't changed, it must be a selection change.
    if (isValueSame) {
      var nextFocusedFields = getFocusedFieldsFromSlateSelection(editor, path, contextParams.locale);
      if (nextFocusedFields) {
        scheduleFocusedFieldsChange(nextFocusedFields);
      }
      return;
    }
    lastChangeReason.current = "text-input";
    scheduleConfigSync(value);
  }
  function handleEditableFocus() {
    if (!isEnabled) {
      return;
    }
    lastChangeReason.current = "text-input";

    // When value for current locale is empty we present the value from fallback.
    // If user focuses editable element, we present the value of fallback unless it's also empty.
    if (!localizedRichTextElements) {
      var nextSlateValue = editor.children;
      var nextRichTextComponentConfig;
      if (fallbackRichTextElements) {
        nextRichTextComponentConfig = richTextConfig;
        var fallbackFirstTextPart = fallbackRichTextElements[0].elements[0].elements[0];

        // Keep only one line element with single empty rich text
        nextRichTextComponentConfig.elements[contextParams.locale] = [_objectSpread(_objectSpread({}, fallbackRichTextElements[0]), {}, {
          elements: [_objectSpread(_objectSpread({}, fallbackRichTextElements[0].elements[0]), {}, {
            elements: [_objectSpread(_objectSpread({}, fallbackFirstTextPart), {}, {
              value: ""
            })]
          })]
        })];
        nextSlateValue = convertRichTextElementsToEditorValue(nextRichTextComponentConfig.elements[contextParams.locale]);
        editor.children = nextSlateValue;
        Transforms.select(editor, {
          anchor: Editor.start(editor, []),
          focus: Editor.start(editor, [])
        });
        form.change(path, nextRichTextComponentConfig);
      } else {
        // If current and fallback value is missing we have:
        // - empty Slate value
        // - empty config within component-collection-localised
        // We will build next $richText component config based on current Slate value
        nextRichTextComponentConfig = richTextConfig;
        nextRichTextComponentConfig.elements[contextParams.locale] = convertEditorValueToRichTextElements(editor.children);
        form.change(path, nextRichTextComponentConfig);
      }
      previousRichTextComponentConfig.current = nextRichTextComponentConfig;
      if (editor.selection) {
        var nextFocusedFields = getFocusedRichTextPartsConfigPaths(editor).map(function (richTextPartPath) {
          return getAbsoluteRichTextPartPath(richTextPartPath, path, contextParams.locale);
        });
        setFocussedField(nextFocusedFields);
      }
    }
    if (isDecorationActive) {
      var root = ReactEditor.findDocumentOrShadowRoot(editor);
      var slateStringElements = root.querySelectorAll("[data-slate-string]");
      slateStringElements.forEach(function (element) {
        element.replaceChildren(document.createTextNode(element.textContent));
      });
    }
  }
  useEffect(function () {
    function saveLatestSelection() {
      var root = ReactEditor.findDocumentOrShadowRoot(editor);
      var selection = root.getSelection();
      if (selection && selection.type === "Range") {
        currentSelectionRef.current = ReactEditor.toSlateRange(editor, selection, {
          exactMatch: false,
          suppressThrow: true
        });
      } else {
        currentSelectionRef.current = null;
      }
    }
    var throttledSaveLatestSelection = throttle(saveLatestSelection, 100);
    if (isEnabled) {
      window.document.addEventListener("selectionchange", throttledSaveLatestSelection);
      return function () {
        window.document.removeEventListener("selectionchange", throttledSaveLatestSelection);
      };
    }
  }, [editor, isEnabled]);
  function handleEditableBlur() {
    lastChangeReason.current = "external";
    setIsDecorationActive(true);
  }

  // When copying content from content editable, Slate will copy HTML content of selected nodes
  // and this is not what we want. Instead we set clipboard data to contain selected content
  // in form of rich text editable component config.
  function handleEditableCopy(event) {
    var selectedRichTextComponentConfig = getRichTextComponentConfigFragment(richTextConfig, editorContext);
    event.clipboardData.setData("text/x-shopstory", JSON.stringify(selectedRichTextComponentConfig));
  }
  function handleEditablePaste(event) {
    var selectedRichTextComponentConfigClipboardData = event.clipboardData.getData("text/x-shopstory");
    if (selectedRichTextComponentConfigClipboardData) {
      var selectedRichTextComponentConfig = JSON.parse(selectedRichTextComponentConfigClipboardData);

      // Preventing the default action will also prevent Slate from handling this event on his own.
      event.preventDefault();
      var nextSlateValue = convertRichTextElementsToEditorValue(duplicateConfig(selectedRichTextComponentConfig, editorContext).elements[contextParams.locale]);
      var temporaryEditor = createTemporaryEditor(editor);
      Editor.insertFragment(temporaryEditor, nextSlateValue);
      var nextElements = convertEditorValueToRichTextElements(temporaryEditor.children);
      actions.runChange(function () {
        form.change(richTextElementsConfigPath, nextElements);
        var nextFocusedFields = getFocusedFieldsFromSlateSelection(temporaryEditor, path, contextParams.locale);
        return nextFocusedFields;
      });
      lastChangeReason.current = "paste";
    } else if (
    // Slate only handles pasting if the clipboardData contains text/plain type.
    // When copying text from the Contentful's rich text editor, the clipboardData contains
    // more than one type, so we have to handle this case manually.
    event.clipboardData.types.length > 1 && event.clipboardData.types.some(function (type) {
      return type === "text/plain";
    })) {
      Editor.insertText(editor, event.clipboardData.getData("text/plain"));
      event.preventDefault();
    }
  }
  var contentEditableClassName = useMemo(function () {
    var responsiveAlignmentStyles = mapResponsiveAlignmentToStyles(align, {
      devices: editorContext.devices,
      resop: resop
    });
    var isFallbackValueShown = localizedRichTextElements === undefined && fallbackRichTextElements !== undefined;

    // When we make a selection of text within editable container and then blur
    // sometimes the browser selection changes and shows incorrectly selected chunks.
    var getStyles = stitches.css(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
      display: "flex"
    }, responsiveAlignmentStyles), {}, {
      cursor: !isEnabled ? "inherit" : "text",
      "& *": {
        pointerEvents: isEnabled ? "auto" : "none",
        userSelect: isEnabled ? "auto" : "none"
      },
      "& *::selection": {
        backgroundColor: "#b4d5fe"
      }
    }, isDecorationActive && {
      "& *::selection": {
        backgroundColor: "transparent"
      },
      "& *[data-easyblocks-rich-text-selection]": {
        backgroundColor: "#b4d5fe"
      }
    }), isFallbackValueShown && {
      opacity: 0.5
    }), {}, {
      // Remove any text decoration from slate nodes that are elements. We only need text decoration on text elements.
      "[data-slate-node]": {
        textDecoration: "none"
      }
    }));
    return getStyles().className;
  }, [align, isDecorationActive, localizedRichTextElements, fallbackRichTextElements, isEnabled]);
  return /*#__PURE__*/React.createElement(Slate, {
    editor: editor,
    value: editorValue,
    onChange: handleEditableChange
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Editable, {
    className: contentEditableClassName,
    placeholder: "Here goes text content",
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    renderPlaceholder: renderPlaceholder,
    decorate: decorate,
    onFocus: handleEditableFocus,
    onBlur: handleEditableBlur,
    onCopy: handleEditableCopy,
    onPaste: handleEditablePaste,
    onMouseDown: function onMouseDown(event) {
      if (isEnabled) {
        event.stopPropagation();
        return;
      }
      if (event.detail === 2) {
        var _window$getSelection;
        event.preventDefault();
        flushSync(function () {
          setIsEnabled(true);
        });
        ReactEditor.focus(editor);
        if (isEditorValueEmpty(editor.children)) {
          return;
        }
        var editorSelectionRange = {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, [])
        };
        Transforms.setSelection(editor, editorSelectionRange);
        var editorSelectionDOMRange = ReactEditor.toDOMRange(editor, editorSelectionRange);
        (_window$getSelection = window.getSelection()) === null || _window$getSelection === void 0 || _window$getSelection.setBaseAndExtent(editorSelectionDOMRange.startContainer, editorSelectionDOMRange.startOffset, editorSelectionDOMRange.endContainer, editorSelectionDOMRange.endOffset);
      }
    },
    readOnly: !isEnabled
  })));
}
function isEditorValueEmpty(editorValue) {
  return editorValue.length === 1 && editorValue[0].children.length === 1 && editorValue[0].children[0].children.length === 1 && Text.isText(editorValue[0].children[0].children[0]) && editorValue[0].children[0].children[0].text === "";
}
function isConfigEqual(newConfig, oldConfig) {
  return deepCompare(newConfig, oldConfig);
}
function mapResponsiveAlignmentToStyles(align, _ref4) {
  var devices = _ref4.devices,
    resop = _ref4.resop;
  function mapAlignmentToFlexAlignment(align) {
    if (align === "center") {
      return "center";
    }
    if (align === "right") {
      return "flex-end";
    }
    return "flex-start";
  }
  var responsiveStyles = resop({
    align: responsiveValueFill(align, devices, getDevicesWidths(devices))
  }, function (values) {
    return {
      justifyContent: mapAlignmentToFlexAlignment(values.align),
      textAlign: values.align
    };
  }, devices);
  var compiledStyles = compileBox(responsiveStyles, devices);
  return getBoxStyles(compiledStyles, devices);
}
function createTextSelectionDecorator(editor) {
  return function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      node = _ref6[0],
      path = _ref6[1];
    var decorations = [];
    if (Text.isText(node) && editor.selection !== null && node.TextWrapper.length > 0 && Range.isCollapsed(editor.selection)) {
      var textRange = Editor.range(editor, path);
      var intersection = Range.intersection(editor.selection, textRange);
      if (intersection !== null) {
        var range = _objectSpread({
          isHighlighted: true,
          highlightType: "textWrapper"
        }, textRange);
        decorations.push(range);
      }
    }
    return decorations;
  };
}
function splitStringNodes(editor, selection) {
  var nodes = Editor.nodes(editor, {
    at: selection,
    match: Text.isText
  });
  var domNodes = Array.from(nodes).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 1),
      node = _ref8[0];
    var domNode = ReactEditor.toDOMNode(editor, node);
    return domNode;
  });
  if (domNodes.length === 1) {
    var slateString = domNodes[0].querySelector("[data-slate-string]");
    var textContent = slateString.textContent;
    var newChild = document.createDocumentFragment();

    // Selection made within whole text node
    if (textContent.length === selection.focus.offset - selection.anchor.offset || textContent.length === selection.anchor.offset - selection.focus.offset) {
      var selectedTextNode = document.createElement("span");
      selectedTextNode.textContent = textContent;
      selectedTextNode.dataset.easyblocksRichTextSelection = "true";
      newChild.appendChild(selectedTextNode);
      slateString.replaceChildren(newChild);
    } else {
      var _selectedTextNode = document.createElement("span");
      _selectedTextNode.textContent = textContent.slice(selection.anchor.offset, selection.focus.offset);
      _selectedTextNode.dataset.easyblocksRichTextSelection = "true";
      newChild.appendChild(document.createTextNode(textContent.slice(0, selection.anchor.offset)));
      newChild.appendChild(_selectedTextNode);
      newChild.appendChild(document.createTextNode(textContent.slice(selection.focus.offset)));
      slateString.replaceChildren(newChild);
    }
    return;
  }
  domNodes.forEach(function (node, index) {
    var slateString = node.querySelector("[data-slate-string]");
    if (slateString) {
      var _textContent = slateString.textContent;
      var _newChild = document.createDocumentFragment();
      if (index === 0) {
        _newChild.appendChild(document.createTextNode(slateString.textContent.slice(0, selection.anchor.offset)));
        var _selectedTextNode2 = document.createElement("span");
        _selectedTextNode2.textContent = _textContent.slice(selection.anchor.offset);
        _selectedTextNode2.dataset.easyblocksRichTextSelection = "true";
        _newChild.appendChild(_selectedTextNode2);
        slateString.replaceChildren(_newChild);
      } else if (index === domNodes.length - 1) {
        var _selectedTextNode3 = document.createElement("span");
        _selectedTextNode3.textContent = _textContent.slice(0, selection.focus.offset);
        _selectedTextNode3.dataset.easyblocksRichTextSelection = "true";
        _newChild.appendChild(_selectedTextNode3);
        _newChild.appendChild(document.createTextNode(_textContent.slice(selection.focus.offset)));
        slateString.replaceChildren(_newChild);
      } else {
        var _selectedTextNode4 = document.createElement("span");
        _selectedTextNode4.textContent = _textContent;
        _selectedTextNode4.dataset.easyblocksRichTextSelection = "true";
        _newChild.appendChild(_selectedTextNode4);
        slateString.replaceChildren(_newChild);
      }
    }
  });
}
function unwrapStringNodesContent(editor) {
  var root = ReactEditor.findDocumentOrShadowRoot(editor);
  var slateStringElements = root.querySelectorAll("[data-slate-string]");
  slateStringElements.forEach(function (element) {
    element.replaceChildren(document.createTextNode(element.textContent));
  });
}

export { RichTextEditor };
