"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = void 0;

var _rolModel = _interopRequireDefault(require("../models/rolModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Creamos datos iniciales en la coleccion de roles si no existen
var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var count, values;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _rolModel["default"].estimatedDocumentCount();

          case 3:
            count = _context.sent;

            if (!(count > 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.t0 = Promise;
            _context.next = 9;
            return new _rolModel["default"]({
              name: "user"
            }).save();

          case 9:
            _context.t1 = _context.sent;
            _context.next = 12;
            return new _rolModel["default"]({
              name: "admin"
            }).save();

          case 12:
            _context.t2 = _context.sent;
            _context.next = 15;
            return new _rolModel["default"]({
              name: "gestorReportes"
            }).save();

          case 15:
            _context.t3 = _context.sent;
            _context.t4 = [_context.t1, _context.t2, _context.t3];
            _context.next = 19;
            return _context.t0.all.call(_context.t0, _context.t4);

          case 19:
            values = _context.sent;
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t5 = _context["catch"](0);
            console.error(_context.t5);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 22]]);
  }));

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;