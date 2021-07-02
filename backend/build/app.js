"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _fertilizationRoutes = _interopRequireDefault(require("./routes/fertilizationRoutes"));

var _fumigationRoutes = _interopRequireDefault(require("./routes/fumigationRoutes"));

var _inventoryRoutes = _interopRequireDefault(require("./routes/inventoryRoutes"));

var _precipitationRoutes = _interopRequireDefault(require("./routes/precipitationRoutes"));

var _userAdminRoutes = _interopRequireDefault(require("./routes/userAdminRoutes"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

var _package = _interopRequireDefault(require("../package.json"));

var _initialSetup = require("./libs/initialSetup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //Creacion de roles iniciales

(0, _initialSetup.createRoles)(); //Port

app.set('port', process.env.PORT || 3001); //package json

app.set('pkg', _package["default"]); //Variables de entorno

_dotenv["default"].config({
  path: './.env'
}); //Middleware


app.use((0, _morgan["default"])('dev')); //ver las peticiones que llegan al servidor

app.use(_express["default"].json()); //saber leer json

app.use(_express["default"].urlencoded({
  extended: false
})); //obtencion de datos de la url

app.use((0, _cors["default"])({
  origin: "http://localhost:3000",
  credentials: true
})); //app.use(cors({origin:"http://localhost:5000", credentials:true}));//aceptacion de datos desde el frontend
//Routes

app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/api/hpd/fertilization', _fertilizationRoutes["default"]);
app.use('/api/hpd/fumigation', _fumigationRoutes["default"]);
app.use('/api/hpd/inventory', _inventoryRoutes["default"]);
app.use('/api/hpd/precipitation', _precipitationRoutes["default"]);
app.use('/api/hpd/userAdmin', _userAdminRoutes["default"]);
app.use('/api/hpd/auth', _authRoutes["default"]);
var _default = app;
exports["default"] = _default;