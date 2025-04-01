'use client';
/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var throttle = require('lodash/throttle');
var React = require('react');
var reactDom = require('react-dom');
var slate = require('slate');
var slateReact = require('slate-react');
var Box = require('../../../components/Box/Box.cjs');
var ComponentBuilder = require('../../../components/ComponentBuilder/ComponentBuilder.cjs');
var locales = require('../../../locales.cjs');
var box = require('../../box.cjs');
var devices = require('../../devices.cjs');
var duplicateConfig = require('../../duplicateConfig.cjs');
var $richText_constants = require('./_richText.constants.cjs');
var $richTextPart_client = require('./_richTextPart/_richTextPart.client.cjs');
var getAbsoluteRichTextPartPath = require('./getAbsoluteRichTextPartPath.cjs');
var richTextEditorActions = require('./richTextEditorActions.cjs');
var convertEditorValueToRichTextElements = require('./utils/convertEditorValueToRichTextElements.cjs');
var convertRichTextElementsToEditorValue = require('./utils/convertRichTextElementsToEditorValue.cjs');
var createTemporaryEditor = require('./utils/createTemporaryEditor.cjs');
var extractElementsFromCompiledComponents = require('./utils/extractElementsFromCompiledComponents.cjs');
var extractTextPartsFromCompiledComponents = require('./utils/extractTextPartsFromCompiledComponents.cjs');
var getEditorSelectionFromFocusedFields = require('./utils/getEditorSelectionFromFocusedFields.cjs');
var getFocusedFieldsFromSlateSelection = require('./utils/getFocusedFieldsFromSlateSelection.cjs');
var getFocusedRichTextPartsConfigPaths = require('./utils/getFocusedRichTextPartsConfigPaths.cjs');
var getRichTextComponentConfigFragment = require('./utils/getRichTextComponentConfigFragment.cjs');
var withEasyblocks = require('./withEasyblocks.cjs');
var responsiveValueFill = require('../../../responsiveness/responsiveValueFill.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function RichTextEditor(props) {
  var editorContext = window.parent.editorWindowAPI.editorContext;
  var actions = editorContext.actions,
    contextParams = editorContext.contextParams,
    form = editorContext.form,
    focussedField = editorContext.focussedField,
    locales$1 = editorContext.locales,
    setFocussedField = editorContext.setFocussedField;
  var _props$__easyblocks = props.__easyblocks,
    path = _props$__easyblocks.path,
    _props$__easyblocks$r = _props$__easyblocks.runtime,
    resop = _props$__easyblocks$r.resop,
    stitches = _props$__easyblocks$r.stitches,
    devices = _props$__easyblocks$r.devices,
    align = props.align;
  var richTextConfig = easyblocksUtils.dotNotationGet(form.values, path);
  var _useState = React.useState(function () {
      return withEasyblocks.withEasyblocks(slateReact.withReact(slate.createEditor()));
    }),
    _useState2 = _slicedToArray__default["default"](_useState, 1),
    editor = _useState2[0];
  var localizedRichTextElements = richTextConfig.elements[contextParams.locale];
  var fallbackRichTextElements = locales.getFallbackForLocale(richTextConfig.elements, contextParams.locale, locales$1);
  var richTextElements = localizedRichTextElements !== null && localizedRichTextElements !== void 0 ? localizedRichTextElements : fallbackRichTextElements;
  var richTextElementsConfigPath = "".concat(path, ".elements.").concat(contextParams.locale);
  var _useState3 = React.useState(function () {
      return convertRichTextElementsToEditorValue.convertRichTextElementsToEditorValue(richTextElements);
    }),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    editorValue = _useState4[0],
    setEditorValue = _useState4[1];

  // If rich text has no value, we initialize it with default config by updating it during first render
  // This is only possible when we open entry for non main locale without fallback, this is total edge case
  if (richTextElements.length === 0 && !fallbackRichTextElements) {
    // We only want to show rich text for default config within this component, we don't want to update raw content
    // To prevent implicit update of raw content we make a deep copy.
    richTextConfig = easyblocksUtils.deepClone(richTextConfig);
    richTextConfig.elements[contextParams.locale] = convertEditorValueToRichTextElements.convertEditorValueToRichTextElements(editorValue);
  }

  /**
   * Controls the visibility of decoration imitating browser selection of
   * the selected text after the user has blurred the content editable element.
   */
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    isDecorationActive = _useState6[0],
    setIsDecorationActive = _useState6[1];

  /**
   * Keeps track what caused last change to editor value.
   * This is used in two cases:
   * - text-only changes of editable content shouldn't trigger update of `editor.children` ("text-input")
   * - changes from outside of editable content shouldn't trigger writing to editor's history within change callback ("external")
   */
  var lastChangeReason = React.useRef("text-input");

  /**
   * Whether the content editable is enabled or not. We enable it through double click.
   */
  var _useState7 = React.useState(false),
    _useState8 = _slicedToArray__default["default"](_useState7, 2),
    isEnabled = _useState8[0],
    setIsEnabled = _useState8[1];
  var previousRichTextComponentConfig = React.useRef();
  var currentSelectionRef = React.useRef(null);
  var isConfigChanged = !isConfigEqual(previousRichTextComponentConfig.current, richTextConfig);
  if (previousRichTextComponentConfig.current && isConfigChanged) {
    if (lastChangeReason.current !== "paste") {
      lastChangeReason.current = "external";
    }
    previousRichTextComponentConfig.current = richTextConfig;
    var nextEditorValue = convertRichTextElementsToEditorValue.convertRichTextElementsToEditorValue(richTextElements);
    // React bails out the render if state setter function is invoked during the render phase.
    // Doing it makes Slate always up-to date with the latest config if it's changed from outside.
    // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
    setEditorValue(nextEditorValue);
    editor.children = nextEditorValue;
    if (isEnabled) {
      var newEditorSelection = getEditorSelectionFromFocusedFields.getEditorSelectionFromFocusedFields(focussedField, form);
      if (isDecorationActive) {
        currentSelectionRef.current = newEditorSelection;
      } else {
        // Slate gives us two methods to update its selection:
        // - `setSelection` updates current selection, so `editor.selection` must be not null
        // - `select` sets the selection, so `editor.selection` must be null
        if (newEditorSelection !== null && editor.selection !== null) {
          slate.Transforms.setSelection(editor, newEditorSelection);
        } else if (newEditorSelection !== null && editor.selection === null) {
          slate.Transforms.select(editor, newEditorSelection);
        } else {
          slate.Transforms.deselect(editor);
        }
      }
    }
  }
  React.useLayoutEffect(function () {
    if (isDecorationActive && currentSelectionRef.current !== null && !slate.Range.isCollapsed(currentSelectionRef.current)) {
      splitStringNodes(editor, currentSelectionRef.current);
      return function () {
        unwrapStringNodesContent(editor);
      };
    }
  }, [editor, isDecorationActive, richTextConfig]);
  var isRichTextActive = focussedField.some(function (focusedField) {
    return focusedField.startsWith(path);
  });
  React.useLayoutEffect(function () {
    // When rich text becomes inactive we want to restore all original [data-slate-string] nodes
    // by removing all span wrappers that we added to show the mocked browser selection.
    if (!isRichTextActive) {
      unwrapStringNodesContent(editor);
    }
  }, [editor, isRichTextActive]);
  React.useEffect(function () {
    // We set previous value of rich text only once, then we manually assign it when needed.
    previousRichTextComponentConfig.current = richTextConfig;
  }, []);
  React.useEffect(
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
      slate.Transforms.deselect(editor);
      var isSlateValueEmpty = isEditorValueEmpty(editor.children);

      // When value for current locale is empty we want to show value from fallback value instead of placeholder
      // if the fallback value is present.
      if (isSlateValueEmpty && fallbackRichTextElements !== undefined) {
        var nextRichTextElement = easyblocksUtils.deepClone(richTextConfig);
        delete nextRichTextElement.elements[contextParams.locale];
        editor.children = convertRichTextElementsToEditorValue.convertRichTextElementsToEditorValue(fallbackRichTextElements);
        form.change(path, nextRichTextElement);
      }
    }
  }, [focussedField, isEnabled, isRichTextActive]);
  React.useEffect(function () {
    // If editor has been refocused and it was blurred earlier we have to disable the decoration to show only browser selection
    if (slateReact.ReactEditor.isFocused(editor) && isDecorationActive) {
      setIsDecorationActive(false);
    }
  });
  React.useEffect(function () {
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
        var temporaryEditor = createTemporaryEditor.createTemporaryEditor(editor);
        var updateSelectionResult = richTextEditorActions.updateSelection.apply(void 0, [temporaryEditor, payload.prop].concat(_toConsumableArray__default["default"](payload.values)));
        if (!updateSelectionResult) {
          return;
        }
        currentSelectionRef.current = temporaryEditor.selection;
        actions.runChange(function () {
          var newRichTextElement = _objectSpread(_objectSpread({}, richTextConfig), {}, {
            elements: _objectSpread(_objectSpread({}, richTextConfig.elements), {}, _defineProperty__default["default"]({}, _editorContext.contextParams.locale, updateSelectionResult.elements))
          });
          form.change(path, newRichTextElement);
          var newFocusedFields = updateSelectionResult.focusedRichTextParts.map(function (focusedRichTextPart) {
            return getAbsoluteRichTextPartPath.getAbsoluteRichTextPartPath(focusedRichTextPart, path, _editorContext.contextParams.locale);
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
  var Elements = extractElementsFromCompiledComponents.extractElementsFromCompiledComponents(props);
  function renderElement(_ref) {
    var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;
    var Element = Elements.find(function (Element) {
      return Element._id === element.id || withEasyblocks.NORMALIZED_IDS_TO_IDS.get(element.id) === Element._id;
    });
    if (!Element) {
      // This can only happen if the current locale has no value and has no fallback
      if (Elements.length === 0) {
        if (element.type === "list-item") {
          return /*#__PURE__*/React__default["default"].createElement("div", attributes, /*#__PURE__*/React__default["default"].createElement("div", null, children));
        }
        return /*#__PURE__*/React__default["default"].createElement("div", attributes, children);
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
    return /*#__PURE__*/React__default["default"].createElement(Box.Box, _extends__default["default"]({
      __compiled: compiledStyles,
      devices: devices,
      stitches: stitches
    }, attributes, "production" === "development" ), element.type === "list-item" ? /*#__PURE__*/React__default["default"].createElement("div", null, children) : children);
  }
  var TextParts = extractTextPartsFromCompiledComponents.extractTextPartsFromCompiledComponents(props);
  function renderLeaf(_ref2) {
    var attributes = _ref2.attributes,
      children = _ref2.children,
      leaf = _ref2.leaf;
    var TextPart = TextParts.find(function (TextPart) {
      return TextPart._id === leaf.id;
    });
    if (!TextPart) {
      TextPart = TextParts.find(function (TextPart) {
        return withEasyblocks.NORMALIZED_IDS_TO_IDS.get(leaf.id) === TextPart._id;
      });
    }
    if (!TextPart) {
      // This can only happen if the current locale has no value and has no fallback
      if (TextParts.length === 0) {
        return /*#__PURE__*/React__default["default"].createElement("span", attributes, children);
      }
      throw new Error("Missing part");
    }
    var TextPartComponent = /*#__PURE__*/React__default["default"].createElement($richTextPart_client.RichTextPartClient, {
      value: children,
      Text: /*#__PURE__*/React__default["default"].createElement(Box.Box, _extends__default["default"]({
        __compiled: TextPart.styled.Text,
        devices: devices,
        stitches: stitches
      }, attributes)),
      TextWrapper: TextPart.components.TextWrapper[0] ? /*#__PURE__*/React__default["default"].createElement(ComponentBuilder.ComponentBuilder, {
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
    return /*#__PURE__*/React__default["default"].createElement("span", _extends__default["default"]({}, attributes, {
      style: _objectSpread(_objectSpread({}, attributes.style), {}, {
        top: 0,
        left: 0
      })
    }), children);
  }
  var scheduleConfigSync = React.useCallback(throttle__default["default"](function (nextValue) {
    setEditorValue(nextValue);
    var nextElements = convertEditorValueToRichTextElements.convertEditorValueToRichTextElements(nextValue);
    actions.runChange(function () {
      var newRichTextElement = _objectSpread(_objectSpread({}, richTextConfig), {}, {
        elements: _objectSpread(_objectSpread({}, richTextConfig.elements), {}, _defineProperty__default["default"]({}, editorContext.contextParams.locale, nextElements))
      });
      form.change(path, newRichTextElement);
      previousRichTextComponentConfig.current = newRichTextElement;
      if (editor.selection) {
        var nextFocusedFields = getFocusedFieldsFromSlateSelection.getFocusedFieldsFromSlateSelection(editor, path, contextParams.locale);
        return nextFocusedFields;
      }
    });
  }, $richText_constants.RICH_TEXT_CONFIG_SYNC_THROTTLE_TIMEOUT), [isConfigChanged, editorContext.contextParams.locale]);
  var scheduleFocusedFieldsChange = React.useCallback(
  // Slate internally throttles the invocation of DOMSelectionChange for performance reasons.
  // We also throttle update of our focused fields state for the same reason.
  // This gives us a good balance between perf and showing updated fields within the sidebar.
  throttle__default["default"](function (focusedFields) {
    setFocussedField(focusedFields);
  }, $richText_constants.RICH_TEXT_FOCUSED_FIELDS_SYNC_THROTTLE_TIMEOUT), [setFocussedField]);
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
    var isValueSame = easyblocksUtils.deepCompare(value, editorValue);

    // Slate runs `onChange` callback on any change, even when the text haven't changed.
    // If value haven't changed, it must be a selection change.
    if (isValueSame) {
      var nextFocusedFields = getFocusedFieldsFromSlateSelection.getFocusedFieldsFromSlateSelection(editor, path, contextParams.locale);
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
        nextSlateValue = convertRichTextElementsToEditorValue.convertRichTextElementsToEditorValue(nextRichTextComponentConfig.elements[contextParams.locale]);
        editor.children = nextSlateValue;
        slate.Transforms.select(editor, {
          anchor: slate.Editor.start(editor, []),
          focus: slate.Editor.start(editor, [])
        });
        form.change(path, nextRichTextComponentConfig);
      } else {
        // If current and fallback value is missing we have:
        // - empty Slate value
        // - empty config within component-collection-localised
        // We will build next $richText component config based on current Slate value
        nextRichTextComponentConfig = richTextConfig;
        nextRichTextComponentConfig.elements[contextParams.locale] = convertEditorValueToRichTextElements.convertEditorValueToRichTextElements(editor.children);
        form.change(path, nextRichTextComponentConfig);
      }
      previousRichTextComponentConfig.current = nextRichTextComponentConfig;
      if (editor.selection) {
        var nextFocusedFields = getFocusedRichTextPartsConfigPaths.getFocusedRichTextPartsConfigPaths(editor).map(function (richTextPartPath) {
          return getAbsoluteRichTextPartPath.getAbsoluteRichTextPartPath(richTextPartPath, path, contextParams.locale);
        });
        setFocussedField(nextFocusedFields);
      }
    }
    if (isDecorationActive) {
      var root = slateReact.ReactEditor.findDocumentOrShadowRoot(editor);
      var slateStringElements = root.querySelectorAll("[data-slate-string]");
      slateStringElements.forEach(function (element) {
        element.replaceChildren(document.createTextNode(element.textContent));
      });
    }
  }
  React.useEffect(function () {
    function saveLatestSelection() {
      var root = slateReact.ReactEditor.findDocumentOrShadowRoot(editor);
      var selection = root.getSelection();
      if (selection && selection.type === "Range") {
        currentSelectionRef.current = slateReact.ReactEditor.toSlateRange(editor, selection, {
          exactMatch: false,
          suppressThrow: true
        });
      } else {
        currentSelectionRef.current = null;
      }
    }
    var throttledSaveLatestSelection = throttle__default["default"](saveLatestSelection, 100);
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
    var selectedRichTextComponentConfig = getRichTextComponentConfigFragment.getRichTextComponentConfigFragment(richTextConfig, editorContext);
    event.clipboardData.setData("text/x-shopstory", JSON.stringify(selectedRichTextComponentConfig));
  }
  function handleEditablePaste(event) {
    var selectedRichTextComponentConfigClipboardData = event.clipboardData.getData("text/x-shopstory");
    if (selectedRichTextComponentConfigClipboardData) {
      var selectedRichTextComponentConfig = JSON.parse(selectedRichTextComponentConfigClipboardData);

      // Preventing the default action will also prevent Slate from handling this event on his own.
      event.preventDefault();
      var nextSlateValue = convertRichTextElementsToEditorValue.convertRichTextElementsToEditorValue(duplicateConfig.duplicateConfig(selectedRichTextComponentConfig, editorContext).elements[contextParams.locale]);
      var temporaryEditor = createTemporaryEditor.createTemporaryEditor(editor);
      slate.Editor.insertFragment(temporaryEditor, nextSlateValue);
      var nextElements = convertEditorValueToRichTextElements.convertEditorValueToRichTextElements(temporaryEditor.children);
      actions.runChange(function () {
        form.change(richTextElementsConfigPath, nextElements);
        var nextFocusedFields = getFocusedFieldsFromSlateSelection.getFocusedFieldsFromSlateSelection(temporaryEditor, path, contextParams.locale);
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
      slate.Editor.insertText(editor, event.clipboardData.getData("text/plain"));
      event.preventDefault();
    }
  }
  var contentEditableClassName = React.useMemo(function () {
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
  return /*#__PURE__*/React__default["default"].createElement(slateReact.Slate, {
    editor: editor,
    value: editorValue,
    onChange: handleEditableChange
  }, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(slateReact.Editable, {
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
        reactDom.flushSync(function () {
          setIsEnabled(true);
        });
        slateReact.ReactEditor.focus(editor);
        if (isEditorValueEmpty(editor.children)) {
          return;
        }
        var editorSelectionRange = {
          anchor: slate.Editor.start(editor, []),
          focus: slate.Editor.end(editor, [])
        };
        slate.Transforms.setSelection(editor, editorSelectionRange);
        var editorSelectionDOMRange = slateReact.ReactEditor.toDOMRange(editor, editorSelectionRange);
        (_window$getSelection = window.getSelection()) === null || _window$getSelection === void 0 || _window$getSelection.setBaseAndExtent(editorSelectionDOMRange.startContainer, editorSelectionDOMRange.startOffset, editorSelectionDOMRange.endContainer, editorSelectionDOMRange.endOffset);
      }
    },
    readOnly: !isEnabled
  })));
}
function isEditorValueEmpty(editorValue) {
  return editorValue.length === 1 && editorValue[0].children.length === 1 && editorValue[0].children[0].children.length === 1 && slate.Text.isText(editorValue[0].children[0].children[0]) && editorValue[0].children[0].children[0].text === "";
}
function isConfigEqual(newConfig, oldConfig) {
  return easyblocksUtils.deepCompare(newConfig, oldConfig);
}
function mapResponsiveAlignmentToStyles(align, _ref4) {
  var devices$1 = _ref4.devices,
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
    align: responsiveValueFill.responsiveValueFill(align, devices$1, devices.getDevicesWidths(devices$1))
  }, function (values) {
    return {
      justifyContent: mapAlignmentToFlexAlignment(values.align),
      textAlign: values.align
    };
  }, devices$1);
  var compiledStyles = box.compileBox(responsiveStyles, devices$1);
  return box.getBoxStyles(compiledStyles, devices$1);
}
function createTextSelectionDecorator(editor) {
  return function (_ref5) {
    var _ref6 = _slicedToArray__default["default"](_ref5, 2),
      node = _ref6[0],
      path = _ref6[1];
    var decorations = [];
    if (slate.Text.isText(node) && editor.selection !== null && node.TextWrapper.length > 0 && slate.Range.isCollapsed(editor.selection)) {
      var textRange = slate.Editor.range(editor, path);
      var intersection = slate.Range.intersection(editor.selection, textRange);
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
  var nodes = slate.Editor.nodes(editor, {
    at: selection,
    match: slate.Text.isText
  });
  var domNodes = Array.from(nodes).map(function (_ref7) {
    var _ref8 = _slicedToArray__default["default"](_ref7, 1),
      node = _ref8[0];
    var domNode = slateReact.ReactEditor.toDOMNode(editor, node);
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
  var root = slateReact.ReactEditor.findDocumentOrShadowRoot(editor);
  var slateStringElements = root.querySelectorAll("[data-slate-string]");
  slateStringElements.forEach(function (element) {
    element.replaceChildren(document.createTextNode(element.textContent));
  });
}

exports.RichTextEditor = RichTextEditor;
