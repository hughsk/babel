"use strict";

define(["exports", "foo", "foo-bar", "./directory/foo-bar"], function (exports, _foo, _fooBar, _directoryFooBar) {
  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var foo = _interopRequire(_foo);

  var foo = _foo;
  var bar = _foo.bar;
  var bar = _foo.foo;
  exports.test = test;
  var test = exports.test = 5;

  exports["default"] = test;
});
