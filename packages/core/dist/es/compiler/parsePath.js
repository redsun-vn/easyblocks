/* with love from shopstory */
import _typeof from '@babel/runtime/helpers/typeof';
import { dotNotationGet } from '@redsun-vn/easyblocks-utils';

/**
 * When selecting text within $richText, we keep information about which text parts are selected
 * within focused fields. If the text part is partially selected, we add information about the selection.
 * This selection has format: ".{textPartCharacterSelectionStartIndex,textPartCharacterSelectionEndIndex}".
 * We often want to query related to selection text part component config and to do that correctly we need to
 * strip information about selection.
 */
function stripRichTextPartSelection(value) {
  return value.replace(/\.\{\d+,\d+\}$/g, "");
}
function parsePath(path, form) {
  var values = form.values;
  var pathSplit = path === "" ? [] : stripRichTextPartSelection(path).split(".");
  var pathInfo = undefined;

  // We're going from current path down the path to find current template and parent template
  for (var i = pathSplit.length; i >= 0; i--) {
    var testedPath = pathSplit.slice(0, i).join(".");
    var value = dotNotationGet(values, testedPath);
    if (_typeof(value) === "object" && typeof value._component === "string") {
      if (pathInfo === undefined) {
        pathInfo = {
          templateId: value._component
        };

        // fieldName
        var fieldPath = pathSplit.slice(i);
        if (fieldPath.length > 0) {
          pathInfo.fieldName = fieldPath.join(".");
        }
        var potentialIndex = parseInt(pathSplit[i - 1]);
        if (!isNaN(potentialIndex)) {
          pathInfo.index = potentialIndex;
        }
      } else {
        pathInfo.parent = {
          templateId: value._component,
          fieldName: pathSplit[i],
          path: testedPath
        };
        break;
      }
    }
  }
  if (!pathInfo) {
    throw new Error("incorrect path: ".concat(path));
  }
  return pathInfo;
}
function findPathOfFirstAncestorOfType(path, templateId, form) {
  while (true) {
    var parseResult = parsePath(path, form);
    if (!parseResult.parent) {
      throw new Error("couldn't find ancestor of type ".concat(templateId));
    }
    if (parseResult.parent.templateId === templateId) {
      return parseResult.parent.path;
    }
    path = parseResult.parent.path;
  }
}

export { findPathOfFirstAncestorOfType, parsePath, stripRichTextPartSelection };
