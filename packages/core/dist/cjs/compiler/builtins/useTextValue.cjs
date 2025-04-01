/* with love from shopstory */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _typeof = require('@babel/runtime/helpers/typeof');
var easyblocksUtils = require('@redsun-vn/easyblocks-utils');
var debounce = require('lodash/debounce');
var React = require('react');
var locales = require('../../locales.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function useTextValue(value, onChange, locale, locales$1, defaultPlaceholder, normalize) {
  var isExternal = _typeof__default["default"](value) === "object" && value !== null;
  var fallbackValue = isExternal ? locales.getFallbackForLocale(value.value, locale, locales$1) : undefined;
  var valueFromProps = function () {
    if (isExternal) {
      var _value$value;
      var displayedValue = (_value$value = value.value) === null || _value$value === void 0 ? void 0 : _value$value[locale];
      if (typeof displayedValue !== "string") {
        displayedValue = fallbackValue !== null && fallbackValue !== void 0 ? fallbackValue : "";
      }
      return displayedValue;
    }
    return value !== null && value !== void 0 ? value : "";
  }();
  var previousValue = React__default["default"].useRef(valueFromProps);
  var _React$useState = React__default["default"].useState(valueFromProps),
    _React$useState2 = _slicedToArray__default["default"](_React$useState, 2),
    localInputValue = _React$useState2[0],
    setLocalInputValue = _React$useState2[1];
  function saveNewValue(newValue) {
    if (isExternal) {
      var newExternalValue = _objectSpread(_objectSpread({}, value), {}, {
        value: _objectSpread(_objectSpread({}, value.value), {}, _defineProperty__default["default"]({}, locale, newValue))
      });
      onChange(newExternalValue);
    } else {
      onChange(newValue);
    }
  }
  var onChangeDebounced = React__default["default"].useCallback(debounce__default["default"](function (newValue) {
    // If normalization is on, we shouldn't save on change
    if (normalize) {
      return;
    }
    saveNewValue(newValue);
  }, 500), [isExternal]);
  function handleBlur() {
    onChangeDebounced.cancel();
    var newValue = localInputValue;
    if (normalize) {
      var normalized = normalize(newValue);
      if (normalized === null) {
        newValue = previousValue.current;
      } else {
        newValue = normalized;
        previousValue.current = localInputValue;
      }
    }
    setLocalInputValue(newValue);
    if (isExternal) {
      if (newValue.trim() === "") {
        saveNewValue(null);
        setLocalInputValue(fallbackValue !== null && fallbackValue !== void 0 ? fallbackValue : "");
      } else {
        saveNewValue(newValue);
      }
    } else {
      if (value !== newValue) {
        saveNewValue(newValue);
      }
    }
  }
  function handleChange(event) {
    setLocalInputValue(event.target.value);
    onChangeDebounced(event.target.value);
  }

  // Sync local value with value from the config if the field value has been
  // changed from outside
  React__default["default"].useEffect(function () {
    setLocalInputValue(valueFromProps);
  }, [valueFromProps]);
  var style = {
    opacity: localInputValue === fallbackValue ? 0.5 : 1
  };
  return {
    onChange: handleChange,
    onBlur: handleBlur,
    value: easyblocksUtils.cleanString(localInputValue),
    style: style,
    placeholder: defaultPlaceholder !== null && defaultPlaceholder !== void 0 ? defaultPlaceholder : "Enter text"
  };
}

exports.useTextValue = useTextValue;
