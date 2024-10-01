const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    mobilenumber:{type:String},
    isAdmin: {type: Boolean, default: false}  // Add this line


})
const usermodel=new mongoose.model('user_tbl',userschema)
module.exports=usermodel