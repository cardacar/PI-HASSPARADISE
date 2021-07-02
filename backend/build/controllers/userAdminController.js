"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUser = exports.createUser = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _rolModel = _interopRequireDefault(require("../models/rolModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, fullName, cc, password, birthDate, cellphone, numberTelephony, roles, newUser, foundRole, role, userSave;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //obtengo los datos del body
            _req$body = req.body, fullName = _req$body.fullName, cc = _req$body.cc, password = _req$body.password, birthDate = _req$body.birthDate, cellphone = _req$body.cellphone, numberTelephony = _req$body.numberTelephony, roles = _req$body.roles; //creo el objeto usuario

            _context.t0 = _userModel["default"];
            _context.t1 = fullName;
            _context.t2 = cc;
            _context.next = 6;
            return _userModel["default"].encryptPassword(password);

          case 6:
            _context.t3 = _context.sent;
            _context.t4 = birthDate;
            _context.t5 = cellphone;
            _context.t6 = numberTelephony;
            _context.t7 = {
              fullName: _context.t1,
              cc: _context.t2,
              password: _context.t3,
              birthDate: _context.t4,
              cellphone: _context.t5,
              numberTelephony: _context.t6
            };
            newUser = new _context.t0(_context.t7);

            if (!roles) {
              _context.next = 19;
              break;
            }

            _context.next = 15;
            return _rolModel["default"].find({
              name: {
                $in: roles
              }
            });

          case 15:
            foundRole = _context.sent;
            newUser.role = foundRole.map(function (rol) {
              return rol._id;
            });
            _context.next = 23;
            break;

          case 19:
            _context.next = 21;
            return _rolModel["default"].findOne({
              name: "user"
            });

          case 21:
            role = _context.sent;
            newUser.role = [role._id];

          case 23:
            _context.next = 25;
            return newUser.save();

          case 25:
            userSave = _context.sent;
            //Devuelvo el token con los datos del usuario
            res.json(userSave);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getAllUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var allUsers;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userModel["default"].find();

          case 2:
            allUsers = _context2.sent;

            if (!allUsers) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.json(allUsers));

          case 5:
            //si no existen usuarios envio un mensaje
            res.json({
              message: "No hay usuarios"
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllUser = getAllUser;

var getUserById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userId, userFound;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //Obtengo el id del params
            userId = req.params.userId; //realizo una busqueda del id pasado

            _context3.next = 3;
            return _userModel["default"].findById(userId);

          case 3:
            userFound = _context3.sent;

            if (!userFound) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.json(userFound));

          case 6:
            res.json({
              message: "El usuario no existe"
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var updateUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userId, pass, userUpdate;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //Obtengo el id del params
            userId = req.params.userId;

            if (!req.body.password) {
              _context4.next = 6;
              break;
            }

            pass = req.body.password;
            _context4.next = 5;
            return _userModel["default"].encryptPassword(pass);

          case 5:
            req.body.password = _context4.sent;

          case 6:
            userUpdate = {}; //Busco y actualizo los datos del usuario

            _context4.prev = 7;
            _context4.next = 10;
            return _userModel["default"].findByIdAndUpdate(userId, req.body, {
              "new": true
            });

          case 10:
            userUpdate = _context4.sent;
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](7);
            //Si ocurre un error mando un mensaje e imprimo el error
            console.log(_context4.t0);
            res.json({
              message: "Usuario no actualizado"
            });

          case 17:
            //si todo es correcto mando mensaje afirmativo
            res.json(userUpdate);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[7, 13]]);
  }));

  return function updateUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUserById = updateUserById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var userId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //Extraigo el id de la url
            userId = req.params.userId; //Envio la peticion de eliminar datos

            _context5.next = 3;
            return _userModel["default"].findByIdAndDelete(userId);

          case 3:
            res.status(204).json();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;