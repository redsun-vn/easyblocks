/* with love from shopstory */
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _typeof from '@babel/runtime/helpers/typeof';
import { cleanString } from '@redsun-vn/easyblocks-utils';
import debounce from 'lodash/debounce';
import React from 'react';
import { getFallbackForLocale } from '../../locales.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function useTextValue(value, onChange, locale, locales, defaultPlaceholder, normalize) {
  var isExternal = _typeof(value) === "object" && value !== null;
  var fallbackValue = isExternal ? getFallbackForLocale(value.value, locale, locales) : undefined;
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
  var previousValue = React.useRef(valueFromProps);
  var _React$useState = React.useState(valueFromProps),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    localInputValue = _React$useState2[0],
    setLocalInputValue = _React$useState2[1];
  function saveNewValue(newValue) {
    if (isExternal) {
      var newExternalValue = _objectSpread(_objectSpread({}, value), {}, {
        value: _objectSpread(_objectSpread({}, value.value), {}, _defineProperty({}, locale, newValue))
      });
      onChange(newExternalValue);
    } else {
      onChange(newValue);
    }
  }
  var onChangeDebounced = React.useCallback(debounce(function (newValue) {
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
  React.useEffect(function () {
    setLocalInputValue(valueFromProps);
  }, [valueFromProps]);
  var style = {
    opacity: localInputValue === fallbackValue ? 0.5 : 1
  };
  return {
    onChange: handleChange,
    onBlur: handleBlur,
    value: cleanString(localInputValue),
    style: style,
    placeholder: defaultPlaceholder !== null && defaultPlaceholder !== void 0 ? defaultPlaceholder : "Enter text"
  };
}

export { useTextValue };
