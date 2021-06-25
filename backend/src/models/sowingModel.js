import { Schema, model } from "mongoose";

const sowingSchema = new Schema(
  {
    fullName: String,
    lot: String,
    variety: String,
    vegetableOrigin: String,
    totalTrees: String,
    distance: String,
    microesentials: {
      gr: { type: Number, default: 0 },
      kg: { type: Number, default: 0 },
    },
    Agrocilceo: {
      gr: { type: Number, default: 0 },
      kg: { type: Number, default: 0 },
    },
    Agrimins: {
      gr: { type: Number, default: 0 },
      kg: { type: Number, default: 0 },
    },
    calDolomita: {
      gr: { type: Number, default: 0 },
      kg: { type: Number, default: 0 },
    },
    micorrizas: {
      gr: { type: Number, default: 0 },
      kg: { type: Number, default: 0 },
    },
    Organomineral: {
      gr: { type: Number, default: 0 },
      kg: { type: Number, default: 0 },
    },
    user: [
      {
        ref: "users",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('sowing', sowingSchema);
