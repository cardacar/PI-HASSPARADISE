"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var fumigationSchema = new _mongoose.Schema({
  fullName: String,
  lot: String,
  timeFinish: String,
  supplies: String,
  activeIngredients: String,
  pr: String,
  pc: String,
  plague: String,
  dose: {},
  appliedAmount: String,
  totalSpent: String,
  equipment: {
    backPump: {
      type: Boolean,
      "default": false
    },
    stationary: {
      type: Boolean,
      "default": false
    }
  },
  surplus: String,
  technicalVisit: String,
  meteorologicalCondition: String,
  user: [{
    ref: "users",
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('fumigation', fumigationSchema);

exports["default"] = _default;