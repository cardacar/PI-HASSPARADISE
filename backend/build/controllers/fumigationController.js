"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFumigationById = exports.updateFumigationById = exports.getAllFumigationById = exports.getAllFumigation = exports.createFumigation = void 0;

var _fumigationModel = _interopRequireDefault(require("../models/fumigationModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createFumigation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, userId, Name, lot, timeFinish, supplies, activeIngredients, pr, pc, plague, dose, appliedAmount, totalSpent, equipment, surplus, technicalVisit, meteorologicalCondition, newFumigation, fumigationSave;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //extraigo los datos del body
            _req$body = req.body, userId = _req$body.userId, Name = _req$body.Name, lot = _req$body.lot, timeFinish = _req$body.timeFinish, supplies = _req$body.supplies, activeIngredients = _req$body.activeIngredients, pr = _req$body.pr, pc = _req$body.pc, plague = _req$body.plague, dose = _req$body.dose, appliedAmount = _req$body.appliedAmount, totalSpent = _req$body.totalSpent, equipment = _req$body.equipment, surplus = _req$body.surplus, technicalVisit = _req$body.technicalVisit, meteorologicalCondition = _req$body.meteorologicalCondition; //creo un objeto gracias al modelo

            newFumigation = new _fumigationModel["default"]({
              fullName: Name,
              lot: lot,
              timeFinish: timeFinish,
              supplies: supplies,
              activeIngredients: activeIngredients,
              pr: pr,
              pc: pc,
              plague: plague,
              dose: dose,
              appliedAmount: appliedAmount,
              totalSpent: totalSpent,
              equipment: equipment,
              surplus: surplus,
              technicalVisit: technicalVisit,
              meteorologicalCondition: meteorologicalCondition,
              user: [userId]
            }); //guardo los datos en la coleccion de fumigation

            _context.next = 4;
            return newFumigation.save();

          case 4:
            fumigationSave = _context.sent;
            res.status(201).json(fumigationSave);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createFumigation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createFumigation = createFumigation;

var getAllFumigation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var allfumigation;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _fumigationModel["default"].find();

          case 2:
            allfumigation = _context2.sent;
            //Envio los datos obtenidos como respuesta
            res.json(allfumigation);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllFumigation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllFumigation = getAllFumigation;

var getAllFumigationById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var fumigationId, getfumigation;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fumigationId = req.params.fumigationId; //Realizo la busqueda de los datos que coincidan con  el id

            _context3.next = 3;
            return _fumigationModel["default"].findById(fumigationId);

          case 3:
            getfumigation = _context3.sent;
            //Envio el dato obtenido como respuesta
            res.json(getfumigation);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAllFumigationById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllFumigationById = getAllFumigationById;

var updateFumigationById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var fumigationId, fumigationUpdate;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //Extraigo el id de la url
            fumigationId = req.params.fumigationId; //Hago una busqueda por id y actualizo los datos recibidos desde el body y me devuelve
            //el dato actualizado

            _context4.next = 3;
            return _fumigationModel["default"].findByIdAndUpdate(fumigationId, req.body, {
              "new": true
            });

          case 3:
            fumigationUpdate = _context4.sent;
            //Envio el dato como respuesta
            res.status(200).json(fumigationUpdate);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateFumigationById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateFumigationById = updateFumigationById;

var deleteFumigationById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var fumigationId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            fumigationId = req.params.fumigationId; //Envio la peticion de eliminar datos

            _context5.next = 3;
            return _fumigationModel["default"].findByIdAndDelete(fumigationId);

          case 3:
            res.status(204).json();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteFumigationById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteFumigationById = deleteFumigationById;