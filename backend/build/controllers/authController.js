"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = exports.signUp = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _rolModel = _interopRequireDefault(require("../models/rolModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, fullName, cc, password, birthDate, cellphone, roles, newUser, foundRole, role, userSave;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Obtengo los datos para crear el usuario del body
            _req$body = req.body, fullName = _req$body.fullName, cc = _req$body.cc, password = _req$body.password, birthDate = _req$body.birthDate, cellphone = _req$body.cellphone, roles = _req$body.roles; //Creo un objeto con los datos para crear el usuario

            _context.t0 = _userModel["default"];
            _context.t1 = fullName;
            _context.t2 = cc;
            _context.next = 6;
            return _userModel["default"].encryptPassword(password);

          case 6:
            _context.t3 = _context.sent;
            _context.t4 = birthDate;
            _context.t5 = cellphone;
            _context.t6 = {
              fullName: _context.t1,
              cc: _context.t2,
              password: _context.t3,
              birthDate: _context.t4,
              cellphone: _context.t5
            };
            newUser = new _context.t0(_context.t6);

            if (!roles) {
              _context.next = 18;
              break;
            }

            _context.next = 14;
            return _rolModel["default"].find({
              name: {
                $in: roles
              }
            });

          case 14:
            foundRole = _context.sent;
            newUser.role = foundRole.map(function (rol) {
              return rol._id;
            });
            _context.next = 22;
            break;

          case 18:
            _context.next = 20;
            return _rolModel["default"].findOne({
              name: "user"
            });

          case 20:
            role = _context.sent;
            newUser.role = [role._id];

          case 22:
            _context.next = 24;
            return newUser.save();

          case 24:
            userSave = _context.sent;

            /*   //Creacion del token con el id del usuario en la bd con javawebtokens con un expiracion de 7 dias
              const token = jwt.sign({ id: userSave._id }, "hola123", {
                expiresIn: 60 * 60 * 24 * 7,
              }); */
            //Devuelvo el token con los datos del usuario
            res.json({
              message: "Usuario creado satisfactoriamente"
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, cedula, password, userFound, passwordMatch, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, cedula = _req$body2.cedula, password = _req$body2.password; //Primero verifico si el usuario con la cedula recibida existe

            _context2.next = 3;
            return _userModel["default"].findOne({
              cc: cedula
            }).populate("role");

          case 3:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json({
              message: "El usuario no existe"
            }));

          case 6:
            _context2.next = 8;
            return _userModel["default"].comparePassword(password, userFound.password);

          case 8:
            passwordMatch = _context2.sent;

            if (passwordMatch) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.json({
              message: "Contraseña incorrecta"
            }));

          case 11:
            //Creo el token con el id del usuario
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, "hola123", {
              expiresIn: 60 * 60 * 24 * 7
            }); //Si todo es correcto envio el token con los  datos del usuario

            res.json({
              token: token
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;