import styled, { css, keyframes } from 'styled-components';
import React__default, { useState, useEffect, useRef } from 'react';
import { ButtonGhost } from './buttons.js';
import { BasicRow } from './rows/BasicRow.js';
import { Modal } from './modals/Modal.js';
import { Colors } from './colors.js';
import { Icons } from './icons.js';
import { Fonts } from './fonts.js';
import debounce from 'lodash/debounce';
import { ThumbnailButton } from './ThumbnailButton.js';

function SimplePicker(_ref) {
  let {
    value,
    onChange,
    getItemById,
    getItems,
    placeholder
  } = _ref;
  return /*#__PURE__*/React__default.createElement(ProductPicker, {
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
  const [product, setProduct] = useState(getProductFromCache(value ?? null));
  const [isOpen, setOpen] = useState(false);
  const [state, setState] = useState("unknown");
  function error() {
    setProduct(null);
    setState("error");
  }
  useEffect(() => {
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
  return /*#__PURE__*/React__default.createElement(_StyledDiv, null, state === "error" && /*#__PURE__*/React__default.createElement(ErrorMessage, null, "Couldn't fetch data for id: ", value), /*#__PURE__*/React__default.createElement(_StyledDiv2, null, /*#__PURE__*/React__default.createElement(ThumbnailButton, {
    thumbnail: product?.thumbnail ? {
      type: "image",
      src: product.thumbnail
    } : undefined,
    label: state === "loading" ? "Loading..." : product?.title ?? placeholder,
    onClick: () => {
      setOpen(true);
    }
  }), product && /*#__PURE__*/React__default.createElement(ButtonGhost, {
    icon: Icons.Remove,
    hideLabel: true,
    onClick: () => {
      onChange(null);
    }
  }, "Clear"), /*#__PURE__*/React__default.createElement(ItemPickerModal, {
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
  const [query, setQuery] = useState("");
  const previousQuery = useRef();
  const [getProductsRequest, setGetProductsRequest] = useState({
    status: "idle",
    data: undefined,
    error: null
  });
  useEffect(() => {
    previousQuery.current = query;
  }, [query]);
  useEffect(() => {
    if (!isOpen && query !== "") {
      setQuery("");
    }
  }, [isOpen, query]);
  useEffect(() => {
    let loadingTimeoutId;
    let isCanceled = false;
    const debouncedGetProducts = debounce(query => {
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
  return isOpen ? /*#__PURE__*/React__default.createElement(Modal, {
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
  }, getProductsRequest.status === "loading" && /*#__PURE__*/React__default.createElement(LoadingContainer, {
    isEmpty: !getProductsRequest.data?.length
  }, /*#__PURE__*/React__default.createElement(ProductsContainer, null, getProductsRequest.data?.map(product => /*#__PURE__*/React__default.createElement(BasicRow, {
    title: product.title,
    onClick: () => {
      onItemPick(product);
      onClose();
    },
    image: product.thumbnail
  })), /*#__PURE__*/React__default.createElement(LoadingIndicatorBackdrop, null)), /*#__PURE__*/React__default.createElement(LoadingIndicatorWrapper, null, /*#__PURE__*/React__default.createElement(LoadingIndicator, null, loadingIcon))), getProductsRequest.status === "success" && (getProductsRequest.data.length > 0 ? getProductsRequest.data.map(product => /*#__PURE__*/React__default.createElement(BasicRow, {
    key: product.id,
    title: product.title,
    onClick: () => {
      onItemPick(product);
      onClose();
    },
    image: product.thumbnail
  })) : /*#__PURE__*/React__default.createElement(NoResults, null, "No results")), getProductsRequest.status === "error" && /*#__PURE__*/React__default.createElement(NoResults, null, "Couldn't fetch data for query \"", previousQuery.current, "\"")) : null;
}
const ErrorMessage = styled.div.withConfig({
  displayName: "SimplePicker__ErrorMessage",
  componentId: "sc-hh69hi-0"
})(["word-break:break-all;white-space:normal;margin-left:4px;", " color:", ";"], Fonts.body, Colors.black40);
const LoadingContainer = styled.div.withConfig({
  displayName: "SimplePicker__LoadingContainer",
  componentId: "sc-hh69hi-1"
})(["position:relative;display:flex;flex-direction:column;flex-grow:1;width:100%;", " max-height:331px;"], _ref4 => {
  let {
    isEmpty
  } = _ref4;
  return isEmpty && css(["min-height:72px;"]);
});
const ProductsContainer = styled.div.withConfig({
  displayName: "SimplePicker__ProductsContainer",
  componentId: "sc-hh69hi-2"
})(["width:100%;overflow:hidden;filter:blur(1px);"]);
const LoadingIndicatorBackdrop = styled.div.withConfig({
  displayName: "SimplePicker__LoadingIndicatorBackdrop",
  componentId: "sc-hh69hi-3"
})(["position:absolute;left:0;top:0;width:100%;height:100%;background:#fefefea1;filter:blur(1px);"]);
const LoadingIndicatorWrapper = styled.div.withConfig({
  displayName: "SimplePicker__LoadingIndicatorWrapper",
  componentId: "sc-hh69hi-4"
})(["position:absolute;display:grid;place-items:center;left:0;top:0;width:100%;height:100%;"]);
const rotate = keyframes(["from{transform:rotate(0deg);}to{transform:rotate(360deg);}"]);
const LoadingIndicator = styled.div.withConfig({
  displayName: "SimplePicker__LoadingIndicator",
  componentId: "sc-hh69hi-5"
})(["width:24px;height:24px;font-size:24px;> svg{animation:", " 500ms linear infinite;}"], rotate);
const NoResults = styled.div.withConfig({
  displayName: "SimplePicker__NoResults",
  componentId: "sc-hh69hi-6"
})(["display:grid;place-items:center;height:48px;padding:12px;", ";"], Fonts.body);
const loadingIcon = /*#__PURE__*/React__default.createElement("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 25 25",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React__default.createElement("path", {
  d: "M4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5",
  stroke: "currentColor",
  strokeWidth: 1.2
}));
var _StyledDiv = styled("div").withConfig({
  displayName: "SimplePicker___StyledDiv",
  componentId: "sc-hh69hi-7"
})(["width:100%;"]);
var _StyledDiv2 = styled("div").withConfig({
  displayName: "SimplePicker___StyledDiv2",
  componentId: "sc-hh69hi-8"
})(["display:flex;flex-direction:row;align-items:center;"]);

export { SimplePicker };
