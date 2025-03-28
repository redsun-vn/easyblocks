'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components');
var React = require('react');
var buttons = require('./buttons.js');
var BasicRow = require('./rows/BasicRow.js');
var Modal = require('./modals/Modal.js');
var colors = require('./colors.js');
var icons = require('./icons.js');
var fonts = require('./fonts.js');
var debounce = require('lodash/debounce');
var ThumbnailButton = require('./ThumbnailButton.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);

function SimplePicker(_ref) {
  let {
    value,
    onChange,
    getItemById,
    getItems,
    placeholder
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(ProductPicker, {
    value: value,
    onChange: onChange,
    api: {
      products: getItems,
      product: getItemById,
      placeholder
    }
  });
}
const ProductPicker = _ref2 => {
  let {
    value,
    onChange,
    api
  } = _ref2;
  const [product, setProduct] = React.useState(getProductFromCache(value ?? null));
  const [isOpen, setOpen] = React.useState(false);
  const [state, setState] = React.useState("unknown");
  function error() {
    setProduct(null);
    setState("error");
  }
  React.useEffect(() => {
    if (product?.id === value) {
      return;
    }
    if (!value) {
      setProduct(null);
      return;
    }
    let isMounted = true;
    getProductFromId(value, api).then(product => {
      if (!isMounted) {
        return;
      }
      if (product === null || product === undefined) {
        error();
      } else {
        if (!isMounted) {
          return;
        }
        setProduct(product);
        saveProductToCache(product);
        setState("success");
      }
    }, () => {
      if (!isMounted) {
        return;
      }
      error();
    });
    return () => {
      isMounted = false;
    };
  }, [value]);
  const placeholder = api.placeholder ?? "Pick an item";
  return /*#__PURE__*/React__default["default"].createElement(_StyledDiv, null, state === "error" && /*#__PURE__*/React__default["default"].createElement(ErrorMessage, null, "Couldn't fetch data for id: ", value), /*#__PURE__*/React__default["default"].createElement(_StyledDiv2, null, /*#__PURE__*/React__default["default"].createElement(ThumbnailButton.ThumbnailButton, {
    thumbnail: product?.thumbnail ? {
      type: "image",
      src: product.thumbnail
    } : undefined,
    label: state === "loading" ? "Loading..." : product?.title ?? placeholder,
    onClick: () => {
      setOpen(true);
    }
  }), product && /*#__PURE__*/React__default["default"].createElement(buttons.ButtonGhost, {
    icon: icons.Icons.Remove,
    hideLabel: true,
    onClick: () => {
      onChange(null);
    }
  }, "Clear"), /*#__PURE__*/React__default["default"].createElement(ItemPickerModal, {
    isOpen: isOpen,
    getItems: api.products,
    onClose: () => {
      setOpen(false);
    },
    onItemPick: item => {
      onChange(item.id);
    }
  })));
};
function getProductFromId(id, api) {
  return new Promise((resolve, reject) => {
    const cached = getProductFromCache(id);
    if (cached) {
      resolve(cached);
    }
    api.product(id).then(product => {
      resolve(product);
    }, () => {
      reject();
    });
  });
}
const productCache = {};
function getProductFromCache(id) {
  if (!id) {
    return null;
  }
  if (productCache[id]) {
    return productCache[id];
  }
  return null;
}
function saveProductToCache(product) {
  productCache[product.id] = product;
}
function ItemPickerModal(_ref3) {
  let {
    isOpen,
    getItems,
    onClose,
    onItemPick
  } = _ref3;
  const [query, setQuery] = React.useState("");
  const previousQuery = React.useRef();
  const [getProductsRequest, setGetProductsRequest] = React.useState({
    status: "idle",
    data: undefined,
    error: null
  });
  React.useEffect(() => {
    previousQuery.current = query;
  }, [query]);
  React.useEffect(() => {
    if (!isOpen && query !== "") {
      setQuery("");
    }
  }, [isOpen, query]);
  React.useEffect(() => {
    let loadingTimeoutId;
    let isCanceled = false;
    const debouncedGetProducts = debounce__default["default"](query => {
      loadingTimeoutId = window.setTimeout(() => {
        setGetProductsRequest({
          status: "loading",
          data: getProductsRequest.data,
          error: null
        });
      }, 1000);
      getItems(query).then(products => {
        setGetProductsRequest({
          status: "success",
          data: products,
          error: null
        });

        // update cache after every download
        products.forEach(product => {
          saveProductToCache(product);
        });
      }).catch(error => {
        setGetProductsRequest({
          status: "error",
          data: undefined,
          error
        });
      }).finally(() => {
        window.clearTimeout(loadingTimeoutId);
        if (isCanceled) {
          return;
        }
      });
    }, 300);
    debouncedGetProducts(query);
    return () => {
      isCanceled = true;
      if (loadingTimeoutId) {
        window.clearTimeout(loadingTimeoutId);
      }
      debouncedGetProducts.cancel();
    };
  }, [query]);
  return isOpen ? /*#__PURE__*/React__default["default"].createElement(Modal.Modal, {
    mode: "center-small",
    isOpen: true,
    onRequestClose: () => {
      onClose();
    },
    headerLine: true,
    searchProps: {
      placeholder: "Search...",
      onChange: e => {
        setQuery(e.target.value);
      }
    },
    headerSymbol: "P",
    noPadding: true
  }, getProductsRequest.status === "loading" && /*#__PURE__*/React__default["default"].createElement(LoadingContainer, {
    isEmpty: !getProductsRequest.data?.length
  }, /*#__PURE__*/React__default["default"].createElement(ProductsContainer, null, getProductsRequest.data?.map(product => /*#__PURE__*/React__default["default"].createElement(BasicRow.BasicRow, {
    title: product.title,
    onClick: () => {
      onItemPick(product);
      onClose();
    },
    image: product.thumbnail
  })), /*#__PURE__*/React__default["default"].createElement(LoadingIndicatorBackdrop, null)), /*#__PURE__*/React__default["default"].createElement(LoadingIndicatorWrapper, null, /*#__PURE__*/React__default["default"].createElement(LoadingIndicator, null, loadingIcon))), getProductsRequest.status === "success" && (getProductsRequest.data.length > 0 ? getProductsRequest.data.map(product => /*#__PURE__*/React__default["default"].createElement(BasicRow.BasicRow, {
    key: product.id,
    title: product.title,
    onClick: () => {
      onItemPick(product);
      onClose();
    },
    image: product.thumbnail
  })) : /*#__PURE__*/React__default["default"].createElement(NoResults, null, "No results")), getProductsRequest.status === "error" && /*#__PURE__*/React__default["default"].createElement(NoResults, null, "Couldn't fetch data for query \"", previousQuery.current, "\"")) : null;
}
const ErrorMessage = styled__default["default"].div.withConfig({
  displayName: "SimplePicker__ErrorMessage",
  componentId: "sc-18atj0s-0"
})(["word-break:break-all;white-space:normal;margin-left:4px;", " color:", ";"], fonts.Fonts.body, colors.Colors.black40);
const LoadingContainer = styled__default["default"].div.withConfig({
  displayName: "SimplePicker__LoadingContainer",
  componentId: "sc-18atj0s-1"
})(["position:relative;display:flex;flex-direction:column;flex-grow:1;width:100%;", " max-height:331px;"], _ref4 => {
  let {
    isEmpty
  } = _ref4;
  return isEmpty && styled.css(["min-height:72px;"]);
});
const ProductsContainer = styled__default["default"].div.withConfig({
  displayName: "SimplePicker__ProductsContainer",
  componentId: "sc-18atj0s-2"
})(["width:100%;overflow:hidden;filter:blur(1px);"]);
const LoadingIndicatorBackdrop = styled__default["default"].div.withConfig({
  displayName: "SimplePicker__LoadingIndicatorBackdrop",
  componentId: "sc-18atj0s-3"
})(["position:absolute;left:0;top:0;width:100%;height:100%;background:#fefefea1;filter:blur(1px);"]);
const LoadingIndicatorWrapper = styled__default["default"].div.withConfig({
  displayName: "SimplePicker__LoadingIndicatorWrapper",
  componentId: "sc-18atj0s-4"
})(["position:absolute;display:grid;place-items:center;left:0;top:0;width:100%;height:100%;"]);
const rotate = styled.keyframes(["from{transform:rotate(0deg);}to{transform:rotate(360deg);}"]);
const LoadingIndicator = styled__default["default"].div.withConfig({
  displayName: "SimplePicker__LoadingIndicator",
  componentId: "sc-18atj0s-5"
})(["width:24px;height:24px;font-size:24px;> svg{animation:", " 500ms linear infinite;}"], rotate);
const NoResults = styled__default["default"].div.withConfig({
  displayName: "SimplePicker__NoResults",
  componentId: "sc-18atj0s-6"
})(["display:grid;place-items:center;height:48px;padding:12px;", ";"], fonts.Fonts.body);
const loadingIcon = /*#__PURE__*/React__default["default"].createElement("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 25 25",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React__default["default"].createElement("path", {
  d: "M4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5",
  stroke: "currentColor",
  strokeWidth: 1.2
}));
var _StyledDiv = styled__default["default"]("div").withConfig({
  displayName: "SimplePicker___StyledDiv",
  componentId: "sc-18atj0s-7"
})(["width:100%;"]);
var _StyledDiv2 = styled__default["default"]("div").withConfig({
  displayName: "SimplePicker___StyledDiv2",
  componentId: "sc-18atj0s-8"
})(["display:flex;flex-direction:row;align-items:center;"]);

exports.SimplePicker = SimplePicker;
