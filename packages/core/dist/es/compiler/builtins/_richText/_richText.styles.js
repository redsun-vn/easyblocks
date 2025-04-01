/* with love from shopstory */
function richTextStyles(_ref) {
  var _params$passedAlign;
  var values = _ref.values,
    params = _ref.params;
  var align = (_params$passedAlign = params.passedAlign) !== null && _params$passedAlign !== void 0 ? _params$passedAlign : values.align;
  return {
    styled: {
      Root: {
        display: "flex",
        justifyContent: mapAlignmentToFlexAlignment(align),
        textAlign: align
      }
    },
    components: {
      elements: {
        // We store values within $richText to allow for changing them from sidebar, but we use them inside of $richTextBlockElement.
        itemProps: values.elements.map(function () {
          return {
            accessibilityRole: values.accessibilityRole,
            mainColor: values.mainColor,
            mainFont: values.mainFont,
            mainFontSize: values.mainFontSize,
            align: align
          };
        })
      }
    },
    props: {
      align: align
    }
  };
}
function mapAlignmentToFlexAlignment(align) {
  if (align === "center") {
    return "center";
  }
  if (align === "right") {
    return "flex-end";
  }
  return "flex-start";
}

export { mapAlignmentToFlexAlignment, richTextStyles };
