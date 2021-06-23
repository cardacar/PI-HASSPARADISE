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
    dose: {
      cc:{type: Number, default:0},
      gr:{type: Number, default:0},
    },
    appliedAmount: String,
    totalSpent: String,
    equipment: String,
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