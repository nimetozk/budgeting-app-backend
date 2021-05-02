/**
 * Defines the dynamic schema for 'place label' documents stored in the database.
 *
 * This is the guide I followed: https://mongoosejs.com/docs/guide.html
 */

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
