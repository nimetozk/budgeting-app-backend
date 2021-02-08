import mongoose, {Schema} from 'mongoose';

export const categorySchema = new Schema({
  interClassCode: String,
  name: String,
  words: {types:[]}
});

const CategoryModel = mongoose.model('category', categorySchema,"category");

export default CategoryModel;