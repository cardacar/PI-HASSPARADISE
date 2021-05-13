import { Schema, model } from "mongoose";

const fertilizationSchema = new Schema(
  {
    fullName: String,
    lot: String,
    product: String,
    composition: {  },
    method: String,
    amount: {  },
    equipment: String,
    technicalVisit: String,
    observation: String,
    user:[{
      ref:"users",
      type:Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("fertilization", fertilizationSchema);
