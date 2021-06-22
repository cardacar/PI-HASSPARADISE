"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var userCtrl = _interopRequireWildcard(require("../controllers/userAdminController"));

var _middleware = require("../middleware");

var _verifySignUp = require("../middleware/verifySignUp");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)(); //rutas para la administracion de usuarios, solo accesible desde el rol admin
//creacion de usuarios

router.post('/', [_middleware.authJwt.verifyToken, _middleware.authJwt.isAdmin, _verifySignUp.checkRoleExisting, _verifySignUp.userRepeat], userCtrl.createUser); //obtener todos los usuarios de la bd

router.get('/', [_middleware.authJwt.verifyToken, _middleware.authJwt.isAdmin], userCtrl.getAllUser); //obtener un usuario en especifico

router.get('/:userId', [_middleware.authJwt.verifyToken, _middleware.authJwt.isAdmin], userCtrl.getUserById); //actualizar un usuario por id

router.put('/:userId', [_middleware.authJwt.verifyToken, _middleware.authJwt.isAdmin], userCtrl.updateUserById); //eliminar un usuario

router["delete"]('/:userId', [_middleware.authJwt.verifyToken, _middleware.authJwt.isAdmin], userCtrl.deleteUserById);
var _default = router;
exports["default"] = _default;