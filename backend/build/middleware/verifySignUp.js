"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRoleExisting = exports.userRepeat = void 0;

var _rolModel = require("../models/rolModel");

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Verifico si el usuario que se usa para crear existe
var userRepeat = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userModel["default"].findOne({
              cc: req.body.cc
            });

          case 2:
            user = _context.sent;

            if (!user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "The user already exists"
            }));

          case 5:
            //Si no existe le permito procedeer
            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userRepeat(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); //Verifico si los roles que me pasan por parametros existen


exports.userRepeat = userRepeat;

var checkRoleExisting = function checkRoleExisting(req, res, next) {
  //Obtengo los roles
  var role = req.body.role; //Si hay un rol hago la verificacion con los datos guardados

  if (role) {
    for (var i = 0; i < role.length; i++) {
      if (!_rolModel.ROLES.includes(role[i])) {
        //Si el rol no existe envio el mensaje
        return res.status(400).json({
          message: "Role ".concat(role[i], " does not exists")
        });
      }
    }
  }

  next();
};

exports.checkRoleExisting = checkRoleExisting;