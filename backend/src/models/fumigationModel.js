import { Schema, model } from "mongoose";

const fumigationSchema = new Schema(
  {
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
      backPump: {type: Boolean, default: false},
      stationary: {type: Boolean, default: false},
    },
    surplus: String,
    technicalVisit: String,
    meteorologicalCondition: String,
    user: [
      {
        ref: "users",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
      timestamps:true,
      versionKey:false
  }
);

export default model('fumigation', fumigationSchema);