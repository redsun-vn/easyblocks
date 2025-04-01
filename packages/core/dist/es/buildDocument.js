/* with love from shopstory */
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { serialize } from '@redsun-vn/easyblocks-utils';
import { buildEntry } from './buildEntry.js';

function buildDocument(_x) {
  return _buildDocument.apply(this, arguments);
}
function _buildDocument() {
  _buildDocument = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var documentId, config, locale, _yield$resolveEntryFo, entry, _buildEntry, meta, externalData, renderableContent, configAfterAuto;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          documentId = _ref.documentId, config = _ref.config, locale = _ref.locale;
          _context.next = 3;
          return resolveEntryForDocument({
            documentId: documentId,
            config: config,
            locale: locale
          });
        case 3:
          _yield$resolveEntryFo = _context.sent;
          entry = _yield$resolveEntryFo.entry;
          _buildEntry = buildEntry({
            entry: entry,
            config: config,
            locale: locale
          }), meta = _buildEntry.meta, externalData = _buildEntry.externalData, renderableContent = _buildEntry.renderableContent, configAfterAuto = _buildEntry.configAfterAuto;
          return _context.abrupt("return", {
            renderableDocument: {
              renderableContent: renderableContent,
              meta: serialize(meta),
              configAfterAuto: configAfterAuto
            },
            externalData: externalData
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _buildDocument.apply(this, arguments);
}
function resolveEntryForDocument(_x2) {
  return _resolveEntryForDocument.apply(this, arguments);
}
function _resolveEntryForDocument() {
  _resolveEntryForDocument = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref2) {
    var documentId, config, locale, documentResponse;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          documentId = _ref2.documentId, config = _ref2.config, locale = _ref2.locale;
          _context2.prev = 1;
          _context2.next = 4;
          return config.backend.documents.get({
            id: documentId,
            locale: locale
          });
        case 4:
          documentResponse = _context2.sent;
          if (documentResponse) {
            _context2.next = 7;
            break;
          }
          throw new Error("Document with id ".concat(documentId, " not found."));
        case 7:
          return _context2.abrupt("return", documentResponse);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          throw new Error("Error fetching document with id ".concat(documentId, "."));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return _resolveEntryForDocument.apply(this, arguments);
}

export { buildDocument };
