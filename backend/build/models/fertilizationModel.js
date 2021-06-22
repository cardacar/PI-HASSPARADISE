"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var fertilizationSchema = new _mongoose.Schema({
  fullName: String,
  lot: String,
  product: String,
  composition: {
    N: {
      type: Number,
      "default": 0
    },
    P2O2: {
      type: Number,
      "default": 0
    },
    K2O: {
      type: Number,
      "default": 0
    },
    CaO: {
      type: Number,
      "default": 0
    },
    S: {
      type: Number,
      "default": 0
    },
    Fe: {
      type: Number,
      "default": 0
    },
    Mn: {
      type: Number,
      "default": 0
    },
    Cu: {
      type: Number,
      "default": 0
    },
    Zn: {
      type: Number,
      "default": 0
    },
    Mo: {
      type: Number,
      "default": 0
    },
    B: {
      type: Number,
      "default": 0
    }
  },
  method: String,
  amount: {
    cc: {
      type: Number,
      "default": 0
    },
    gr: {
      type: Number,
      "default": 0
    },
    total: {
      type: Number,
      "default": 0
    }
  },
  equipment: String,
  technicalVisit: String,
  observation: String,
  user: [{
    ref: "users",
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("fertilization", fertilizationSchema);

exports["default"] = _default;