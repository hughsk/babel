var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");
var _        = require("lodash");

exports.Function = function (node, parent, file, scope) {
  if (!node.defaults || !node.defaults.length) return;
  t.ensureBlock(node);

  var ids = node.params.map(function (param) {
    return t.getIds(param);
  });

  var iife = false;
  var i;
  var def;

  for (i in node.defaults) {
    def = node.defaults[i];
    if (!def) continue;

    var param = node.params[i];

    // temporal dead zone check - here we prevent accessing of params that
    // are to the right - ie. uninitialized parameters
    _.each(ids.slice(i), function (ids) {
      var check = function (node, parent) {
        if (!t.isIdentifier(node) || !t.isReferenced(node, parent)) return;

        if (ids.indexOf(node.name) >= 0) {
          throw file.errorWithNode(node, "Temporal dead zone - accessing a variable before it's initialized");
        }

        if (scope.has(node.name)) {
          iife = true;
        }
      };

      check(def, node);
      traverse(def, { enter: check });
    });

    // we're accessing a variable that's already defined within this function
    var has = scope.get(param.name);
    if (has && node.params.indexOf(has) < 0) {
      iife = true;
    }
  }

  var body = [];

  for (i in node.defaults) {
    def = node.defaults[i];
    if (!def) continue;

    body.push(util.template("if-undefined-set-to", {
      VARIABLE: node.params[i],
      DEFAULT:  def
    }, true));
  }

  if (iife) {
    var container = t.functionExpression(null, [], node.body, node.generator);
    container._aliasFunction = true;

    body.push(t.returnStatement(t.callExpression(container, [])));

    node.body = t.blockStatement(body);
  } else {
    node.body.body = body.concat(node.body.body);
  }

  node.defaults = [];
};
