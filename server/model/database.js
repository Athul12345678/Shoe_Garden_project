const mongoose=require('mongoose')
require('dotenv').config()
async function main(){
    await mongoose.connect(process.env.mongo_url);
    console.log('database connected')    
}
module.exports=main
//http://localhost:9000/addproduct/addproduct
