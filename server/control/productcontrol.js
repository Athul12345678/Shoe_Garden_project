const main=require('../model/database')
main().catch(err=>console.log(err))
const productmodel=require('../model/productmodel')
const Addproduct = (req, res) => {
    const { productname, productsize, productprice, productquantity, productbrand,productcategory,productdescription } = req.body;
    const productimage = req.file ? req.file.filename : null;
        productmodel.create({ productname, productsize, productprice, productquantity, productbrand, productimage,productcategory,productdescription })
      .then(() => res.json("Product added"))
      .catch(err => res.status(400).json(err));
  };
  
const Display=async(req,res)=>{
    const record=await productmodel.find()
    if(record.length>0){
        res.json(record)
    }
    else{
        res.json([])
    }
}
const Deleteproduct=async(req,res)=>{
    const editid=req.params.id;
    try{
        await productmodel.findByIdAndDelete(editid);
    }
    catch(error){
        res.json("error")
    }
}
const findById=async(req,res)=>{
    const record=await productmodel.find({_id:req.params.id})
    if(record.length>0){
        res.json(record)
    }
    else{
        res.json([])
    }
}
const updateDatas=async(req,res)=>{
    const id=req.headers.productid;
    console.log(id)
    const {productname,productsize,productprice,productquantity,productbrand}=req.body
    console.log(req.body)
    await productmodel.updateOne({_id:id},req.body)
    res.json("data update")
}
module.exports={Addproduct,Display,Deleteproduct,findById,updateDatas}