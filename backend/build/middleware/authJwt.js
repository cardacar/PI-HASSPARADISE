"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGestorReportes = exports.isAdmin = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _rolModel = _interopRequireDefault(require("../models/rolModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Middleware que me verifica el token
var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var authorization, token, decodedToken, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            //Obtengo el token de la cabecera de autorizacion
            authorization = req.get("authorization"); //Verifico que exista algun token, si no existe envio un mensaje

            if (authorization) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: "No token provider"
            }));

          case 4:
            //Creo la variable token para actualizar el bearer
            token = {}; //Verifico que tenga el bearer

            if (authorization && authorization.toLowerCase().startsWith("bearer")) {
              //Obtengo el token limpio
              token = authorization.substring(7);
            } //Variable donde guardare el token decodificado


            decodedToken = {}; //Decodifico el token

            decodedToken = _jsonwebtoken["default"].verify(token, "hola123"); //Agrego el id del token al request

            req.body.userId = decodedToken.id; //Verifico que el id proporcionado por el token exista en la bd y elimino la contraseña del token

            _context.next = 11;
            return _userModel["default"].findById(req.body.userId, {
              password: 0
            });

          case 11:
            user = _context.sent;

            if (user) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Usuario no encontrado"
            }));

          case 14:
            //si el usuario existe agrego el nombre al request
            req.body.Name = user.fullName; //Si todo es perfecto hago un next

            next();
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            //Si hay algun error mando un mensaje
            console.log(_context.t0);
            return _context.abrupt("return", res.status(401).json({
              message: "No tienes autorizacion"
            }));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); //Middleware que me verifica si es un admin


exports.verifyToken = verifyToken;

var isAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user, roles, x;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userModel["default"].findById(req.body.userId);

          case 2:
            user = _context2.sent;
            _context2.next = 5;
            return _rolModel["default"].find({
              _id: {
                $in: user.role
              }
            });

          case 5:
            roles = _context2.sent;
            x = 0;

          case 7:
            if (!(x < roles.length)) {
              _context2.next = 14;
              break;
            }

            if (!(roles[x].name === "admin")) {
              _context2.next = 11;
              break;
            }

            next();
            return _context2.abrupt("return");

          case 11:
            x++;
            _context2.next = 7;
            break;

          case 14:
            return _context2.abrupt("return", res.status(403).json({
              message: "requiere admin rol"
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;

var isGestorReportes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var user, roles, x;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userModel["default"].findById(req.body.userId);

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return _rolModel["default"].findById({
              _id: {
                $in: user.role
              }
            });

          case 5:
            roles = _context3.sent;
            x = 0;

          case 7:
            if (!(x < roles.length)) {
              _context3.next = 14;
              break;
            }

            if (!(roles[x].name === "gestorReportes")) {
              _context3.next = 11;
              break;
            }

            next();
            return _context3.abrupt("return");

          case 11:
            x++;
            _context3.next = 7;
            break;

          case 14:
            return _context3.abrupt("return", res.status(403).json({
              message: "requiere gestor de reportes"
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isGestorReportes(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isGestorReportes = isGestorReportes;