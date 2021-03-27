import mongoose, { Schema } from "mongoose";
import { PointSchema } from "./point-schema";

export const placeLabelSchema = new Schema({
  name: String,
  location: PointSchema,
  refUser: { type: mongoose.Types.ObjectId, ref: "user" },
});

const placeLabelModel = mongoose.model(
  "placeLabel",
  placeLabelSchema,
  "placeLabel"
);

export default placeLabelModel;
