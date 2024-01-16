
import mongoose from "mongoose";

interface User {
    login: string;
    password: string;
  }

const userSchema = new mongoose.Schema({
 login: { type: String, required: true },
 password: { type: String, required: true },
 });
 
 const User = mongoose.model('User', userSchema);

 export default User