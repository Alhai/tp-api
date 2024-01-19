import mongoose from "mongoose";

export interface IUserModel {
  _id:string,
    login: string;
    password: string;
  }

const userSchema = new mongoose.Schema({
 login: { type: String, required: true },
 password: { type: String, required: true },
 });
 
 const User = mongoose.model<IUserModel>('User', userSchema);

 export default User