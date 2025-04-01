/* with love from shopstory */
import { spacingToPx, parseSpacing } from '../spacingToPx.js';
import { applyAutoUsingResponsiveTokens } from './applyAutoUsingResponsiveTokens.js';
import { areWidthsFullyDefined } from './areWidthsFullyDefined.js';
import { getDevicesWidths } from './devices.js';
import { getDeviceWidthPairs } from './getDeviceWidthPairs.js';
import { responsiveValueGetDefinedValue, responsiveValueGetFirstHigherValue, responsiveValueGetFirstLowerValue } from '../responsiveness/responsiveValueGetDefinedValue.js';
import { responsiveValueFill } from '../responsiveness/responsiveValueFill.js';
import { isTrulyResponsiveValue } from '../responsiveness/isTrulyResponsiveValue.js';
import { responsiveValueForceGet } from '../responsiveness/responsiveValueGet.js';

function linearizeSpace(input, compilationContext, widths) {
  var constant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  if (!isTrulyResponsiveValue(input)) {
    return input;
  }

  /**
   *
   * Important!
   *
   * Although linearizeSpace takes widths into account (it's obvious) we must still remember about responsive tokens.
   *
   * Responsive tokens will be quite rare (like a container margin or a font size).
   * But still we must remember that responsive tokens are defined relative to SCREEN WIDTH.
   * It means that even if our component has "width" that is not a screen width and is very irregular, then responsive tokens relative to screen width takes precedence!
   * So if our component has width 500px on XL and is wider on smaller breakpoint LG (800px), then if responsive token is bigger on XL than LG it will still hold.
   * It makes a total sense. If we broke this rule and somehow applied widths to responsive tokens, then user could see a font that she totally doesn't want for a specific breakpoint.
   * It usually won't hurt at all, because fonts and container margins are responsive by nature. Actually maybe other spacings shouldn't be possible to be responsive at all!
   * That's why first thing below is to fill undefined values with responsive tokens if possible and only then linearize the remaining ones (with widths taken into account).
   *
   */

  // If responsive value has some token that is responsive, then this token should be applied to all surrounding breakpoints.
  // Responsive token kind of "overrides auto".
  // If we want in the future auto for responsive tokens it's not the place for it. Linearizing tokens should happen in creating compilation context.
  var inputAfterResponsiveTokenAuto = applyAutoUsingResponsiveTokens(input, compilationContext);
  var inputWithScalarNonRefValues = {
    $res: true
  };
  compilationContext.devices.forEach(function (device) {
    if (inputAfterResponsiveTokenAuto[device.id] === undefined) {
      return;
    }
    var refValue = responsiveValueGetDefinedValue(inputAfterResponsiveTokenAuto, device.id, compilationContext.devices, getDevicesWidths(compilationContext.devices));
    if (isTrulyResponsiveValue(refValue.value)) {
      inputWithScalarNonRefValues[device.id] = spacingToPx(responsiveValueGetDefinedValue(refValue.value, device.id, compilationContext.devices, getDevicesWidths(compilationContext.devices)), device.w);
    } else {
      inputWithScalarNonRefValues[device.id] = spacingToPx(refValue.value, device.w);
    }
  });
  if (!areWidthsFullyDefined(widths, compilationContext.devices)) {
    return responsiveValueFill(inputAfterResponsiveTokenAuto, compilationContext.devices, getDevicesWidths(compilationContext.devices));
  }

  // Let's run linearize function
  var linearisedCompiledValues = linearizeSpaceWithoutNesting(inputWithScalarNonRefValues, compilationContext, widths, constant);
  compilationContext.devices.forEach(function (device) {
    if (inputAfterResponsiveTokenAuto[device.id] === undefined) {
      inputAfterResponsiveTokenAuto[device.id] = snapValueToToken(responsiveValueForceGet(linearisedCompiledValues, device.id), responsiveValueGetFirstLowerValue(inputWithScalarNonRefValues, device.id, compilationContext.devices, getDevicesWidths(compilationContext.devices)), responsiveValueGetFirstHigherValue(inputWithScalarNonRefValues, device.id, compilationContext.devices, getDevicesWidths(compilationContext.devices)), compilationContext.theme.space, constant);
    }
  });
  return inputAfterResponsiveTokenAuto;
}
function snapValueToToken(value, lowerDefinedValue, higherDefinedValue, spaces, constant) {
  var currentToken = undefined;
  var minDelta = Number.MAX_VALUE;
  for (var tokenId in spaces) {
    var tokenValue = spaces[tokenId].value;
    if (isTrulyResponsiveValue(tokenValue)) {
      // only non-responsive
      continue;
    }
    var parsedValue = parseSpacing(tokenValue);
    if (parsedValue.unit === "vw") {
      continue;
    }
    var tokenPxValue = parsedValue.value;

    // If value smaller than constant then the only possible token is the token equaling the value
    if (value <= constant && tokenPxValue !== value) {
      continue;
    }

    // token value must be within higher and lower limits
    if (higherDefinedValue !== undefined) {
      if (tokenPxValue > higherDefinedValue) {
        continue;
      }
    }
    if (lowerDefinedValue !== undefined) {
      if (tokenPxValue < lowerDefinedValue) {
        continue;
      }
    }
    if (tokenId.split(".").length > 1) {
      // only non-prefixed
      continue;
    }

    // snapped token can never be bigger than our constant
    if (tokenPxValue < constant) {
      continue;
    }
    var delta = Math.abs(value - tokenPxValue);
    if (delta < minDelta || (/* in case of equal deltas, let's take bigger token */currentToken && delta === minDelta && tokenValue > currentToken.value)) {
      minDelta = delta;
      currentToken = {
        tokenId: tokenId,
        value: tokenValue,
        widgetId: "@easyblocks/space"
      };
    }
  }
  if (!currentToken) {
    return {
      value: "".concat(value, "px")
    };
  }
  return currentToken;
}
function linearizeSpaceWithoutNesting(input, compilationContext, widths) {
  var constant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  if (!isTrulyResponsiveValue(input)) {
    return input;
  }

  // // If only 1 value is defined (2 keys, $res and value), then we return
  // if (Object.keys(input).length === 2) {
  //   return responsiveValueFill(input, compilationContext.devices);
  // }

  // Empty object returns 0
  if (Object.keys(input).length === 0) {
    console.warn("linearize Space - empty object input, that shouldn't happen, fallback to 0");
    return 0;
  }

  // For now we just use arrays (from previous implementation). Later they're mapped back to object
  var value = [];
  var referencePoints = [];
  var componentWidths = getDeviceWidthPairs(widths, compilationContext.devices);
  componentWidths.forEach(function (componentWidth, index) {
    var breakpointValue = input[componentWidth.deviceId];
    value[index] = breakpointValue;
    if (breakpointValue === null || breakpointValue === undefined) {
      value[index] = null; // null padding and normalization

      var leftIndex;
      var rightIndex;

      // Let's find closest left index
      for (var i = index - 1; i >= 0; i--) {
        var val = input[componentWidths[i].deviceId];
        if (val !== undefined) {
          leftIndex = i;
          break;
        }
      }

      // Let's find closest right index
      for (var _i = index + 1; _i < componentWidths.length; _i++) {
        var _val = input[componentWidths[_i].deviceId];
        if (_val !== undefined) {
          rightIndex = _i;
          break;
        }
      }
      if (leftIndex === undefined && rightIndex === undefined) {
        throw new Error("unreachable");
      }
      referencePoints[index] = {
        leftIndex: leftIndex,
        rightIndex: rightIndex
      };
      return;
    }
  });
  referencePoints.forEach(function (refPoint, index) {
    if (!refPoint) {
      return;
    }
    var currentX = componentWidths[index].width;

    // Single point linearity
    if (refPoint.leftIndex !== undefined && refPoint.rightIndex === undefined || refPoint.leftIndex === undefined && refPoint.rightIndex !== undefined) {
      var _refPoint$leftIndex;
      var currentRefPoint = (_refPoint$leftIndex = refPoint.leftIndex) !== null && _refPoint$leftIndex !== void 0 ? _refPoint$leftIndex : refPoint.rightIndex;
      var refY = value[currentRefPoint];
      var refX = componentWidths[currentRefPoint].width;
      var deltaY = refY - constant;
      if (deltaY <= 0) {
        value[index] = refY;
      } else {
        var a = (refY - constant) / refX;
        value[index] = a * currentX + constant;
      }
    } else if (refPoint.leftIndex !== undefined && refPoint.rightIndex !== undefined) {
      var p1_x = componentWidths[refPoint.leftIndex].width;
      var p1_y = value[refPoint.leftIndex];

      // default a, b (enabled when only p1 is defined)
      var _a = 0,
        b = p1_y;
      var p2_x = componentWidths[refPoint.rightIndex].width;
      var p2_y = value[refPoint.rightIndex];
      var deltaX = p1_x - p2_x;
      if (deltaX === 0) {
        // if delta 0 then we take lower for left and higher for right
        value[index] = index < refPoint.leftIndex ? p1_y : p2_y;
      } else {
        _a = (p1_y - p2_y) / deltaX;
        b = p2_y - _a * p2_x;
        if (_a >= 0) {
          // take into account 0 values!!!
          if (p1_y === 0 || p2_y === 0) {
            if (index < refPoint.leftIndex) {
              _a = 0;
              b = p1_y;
            } else {
              _a = 0;
              b = p2_y;
            }
          }
          value[index] = currentX * _a + b;
        } else {
          // We don't linearize descending functions!
          value[index] = index < refPoint.leftIndex ? p1_y : p2_y;
        }
      }
    } else {
      throw new Error("unreachable");
    }
  });
  var output = {
    $res: true
  };
  value.forEach(function (scalarVal, index) {
    if (scalarVal === undefined || scalarVal === null) {
      return;
    }
    output[componentWidths[index].deviceId] = scalarVal;
  });
  return output;
}

export { linearizeSpace };
