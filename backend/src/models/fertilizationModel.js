import { Schema, model } from "mongoose";

const fertilizationSchema = new Schema(
  {
    fullName: String,
    lot: String,
    product: String,
    composition: { 
      N:{type: Number, default:0},
      P2O2:{type: Number, default:0},
      K2O:{type: Number, default:0},
      CaO:{type: Number, default:0},
      S:{type: Number, default:0},
      Fe:{type: Number, default:0},
      Mn:{type: Number, default:0},
      Cu:{type: Number, default:0},
      Zn:{type: Number, default:0},
      Mo:{type: Number, default:0},
      B:{type: Number, default:0},
     },
    method: String,
    amount: {
      cc:{type: Number, default:0},
      gr:{type: Number, default:0},
      total:{type: Number, default:0}
    },
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
