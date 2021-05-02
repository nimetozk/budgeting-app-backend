/**
 * Defines the dynamic schema for 'migration' documents stored in the database.
 *
 * This is the guide I followed: https://mongoosejs.com/docs/guide.html
 */

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
