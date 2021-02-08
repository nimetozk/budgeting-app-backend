import mongoose, {Schema} from 'mongoose';

export const TaskSchema = new Schema({
  name: String,
  uploadDate: {type: Date},
  fileName: String,
  status: String,
  refBankAccount: {type:Schema.Types.ObjectId, ref:"bankAccount"}
});

const TaskModel = mongoose.model('task', TaskSchema,"task");

export default TaskModel;