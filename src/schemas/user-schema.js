import mongoose, {Schema} from 'mongoose';


const userSchema = new Schema({
  firstname:  String,
  lastname: String,
  email:   String,
  password:  String,
  phoneNumber: String
});

const UserModel = mongoose.model('user', userSchema,"user");

export default UserModel;