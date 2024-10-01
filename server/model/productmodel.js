const mongoose=require('mongoose')
const productSchema=new mongoose.Schema(
    {
        productname:{type:String},
        productsize:{type:String},
        productprice:{type:String},
        productquantity: { type: Number, required: true, default: 0 }, // Add this line
        productbrand:{type:String},
        productimage:{type:String},
        productcategory:{type:String},
        productdescription:{type:String},
       }
,{timestamps:true})
const productmodel=new mongoose.model("product",productSchema)
module.exports=productmodel