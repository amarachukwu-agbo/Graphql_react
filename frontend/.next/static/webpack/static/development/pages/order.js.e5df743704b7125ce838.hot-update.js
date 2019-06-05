webpackHotUpdate("static/development/pages/order.js",{

/***/ "./components/Order.js":
/*!*****************************!*\
  !*** ./components/Order.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Order; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.browser.umd.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_OrderStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/OrderStyles */ "./components/styles/OrderStyles.js");
/* harmony import */ var _components_ErrorMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ErrorMessage */ "./components/ErrorMessage.js");
/* harmony import */ var _lib_formatMoney__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/formatMoney */ "./lib/formatMoney.js");
var _jsxFileName = "/Users/andela/Documents/projects/Advanced-React/sick-fits/frontend/components/Order.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query SINGLE_ORDER_QUERY($id: ID!) {\n    order(id: $id) {\n      total\n      charge\n      items {\n        quantity\n        price\n        title\n        image\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










var SINGLE_ORDER_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_4___default()(_templateObject());

var Order =
/*#__PURE__*/
function (_Component) {
  _inherits(Order, _Component);

  function Order() {
    _classCallCheck(this, Order);

    return _possibleConstructorReturn(this, _getPrototypeOf(Order).apply(this, arguments));
  }

  _createClass(Order, [{
    key: "render",
    value: function render() {
      var orderId = this.props.orderId;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_2__["Query"], {
        query: SINGLE_ORDER_QUERY,
        variables: {
          id: orderId
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, function (_ref) {
        var order = _ref.data.order,
            loading = _ref.loading,
            error = _ref.error;
        console.log(order);
        if (error) return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ErrorMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
          error: error,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 37
          },
          __self: this
        });
        if (loading) return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        }, "Loading ....");
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_OrderStyles__WEBPACK_IMPORTED_MODULE_6__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 42
          },
          __self: this
        }, "Sick Fits - Order ", orderId)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          },
          __self: this
        }, "Order ID: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: this
        }, orderId)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 49
          },
          __self: this
        }, "Charge: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          },
          __self: this
        }, order.charge)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 53
          },
          __self: this
        }, "Date: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        }, Object(date_fns__WEBPACK_IMPORTED_MODULE_3__["format"])(order.createdAt, 'MMMM d, YYYY h:mm a'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        }, "Order Total: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          },
          __self: this
        }, Object(_lib_formatMoney__WEBPACK_IMPORTED_MODULE_8__["default"])(order.total))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61
          },
          __self: this
        }, "Item Count: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          },
          __self: this
        }, order.items.length)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "items",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 64
          },
          __self: this
        }, order.items.map(function (item) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "order-item",
            key: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
            src: item.image,
            alt: item.title,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 68
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "item-details",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 69
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            },
            __self: this
          }, item.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          }, "Quantity: ", item.quantity), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 72
            },
            __self: this
          }, "Each: ", Object(_lib_formatMoney__WEBPACK_IMPORTED_MODULE_8__["default"])(item.price)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 73
            },
            __self: this
          }, "Subtotal: ", Object(_lib_formatMoney__WEBPACK_IMPORTED_MODULE_8__["default"])(item.quantity * item.price))));
        })));
      });
    }
  }]);

  return Order;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(Order, "propTypes", {
  orderId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
});



/***/ })

})
//# sourceMappingURL=order.js.e5df743704b7125ce838.hot-update.js.map