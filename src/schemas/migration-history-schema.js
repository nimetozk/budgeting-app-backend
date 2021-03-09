import mongoose, { Schema, Types } from "mongoose";

export const migrationHistorySchema = new Schema({
  name: String,
});

const MigrationHistoryModel = mongoose.model(
  "migrationHistory",
  migrationHistorySchema,
  "migrationHistory"
);

export default MigrationHistoryModel;
