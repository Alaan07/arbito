import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username:{type:String,required:true},
      password:{type:String,required:true},
      islogin:{type:Boolean,default:false},
      emai:{type:String},
      contact:{type:Number},
})

const User = mongoose.model("users",userSchema);

export default User;
