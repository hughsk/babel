"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports, _foo) {
  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var foo = _interopRequire(_foo);

  var foo = _interopRequire(_foo);
});
