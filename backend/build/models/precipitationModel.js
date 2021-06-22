"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var precipitationSchema = new _mongoose.Schema({
  data: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('precipitation', precipitationSchema);

exports["default"] = _default;