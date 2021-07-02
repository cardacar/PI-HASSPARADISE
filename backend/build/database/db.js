"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//const MONGOBD_URI='mongodb+srv://cardacar:822jtZZKSNmrvWS@hassparadise.lb5ya.mongodb.net/hasspd?retryWrites=true&w=majority'

/* const MONGODB_URI_COMPASS='mongodb+srv://cardacar:822jtZZKSNmrvWS@hassparadise.lb5ya.mongodb.net/hasspd?authSource=admin&replicaSet=atlas-2g1tr3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
 */
_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var USER, PASSWORD, URI, db;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //const MONGODB_URI_LOCAL='mongodb://localhost/hasspd'
          USER = 'cardacar';
          PASSWORD = '822jtZZKSNmrvWS';
          URI = "mongodb+srv://".concat(USER, ":").concat(PASSWORD, "@hassparadise.lb5ya.mongodb.net/hasspd?retryWrites=true&w=majority");
          _context.prev = 3;
          _context.next = 6;
          return _mongoose["default"].connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });

        case 6:
          db = _context.sent;
          console.log("Database is connected: ", db.connection.name);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[3, 10]]);
}))();