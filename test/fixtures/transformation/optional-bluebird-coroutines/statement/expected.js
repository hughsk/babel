"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var Bluebird = _interopRequire(require("bluebird"));

var foo = Bluebird.coroutine(function* foo() {
  var wat = yield bar();
});
