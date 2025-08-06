import mongoose from "mongoose";
// import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
      username:{type:String,required:true},
      password:{type:String,required:true},
      islogin:{type:Boolean,default:false},
      email:{type:String, match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]},
      contact:{type:Number},
})

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const User = mongoose.model("users",userSchema);

export default User;
