const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    products:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'product',require:true},
        quantity:{type:Number,required:true,default:1}
    }]
},{timestamps:true})
const cartmodel=new mongoose.model('cart',cartSchema)
module.exports=cartmodel
