"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var inventorySchema = new _mongoose.Schema({
  lote: String,
  big: {
    type: Number,
    "default": 0
  },
  medium: {
    type: Number,
    "default": 0
  },
  small: {
    type: Number,
    "default": 0
  },
  total: Number,
  plantingDistance: String,
  totalPlantingDistance: String,
  hectaresSown: Number
});

var _default = (0, _mongoose.model)('inventory', inventorySchema);

exports["default"] = _default;