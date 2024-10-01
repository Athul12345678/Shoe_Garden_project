import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect,useRef } from "react";
import axios from "axios";
import Adminnavbar from "./Adminnavbar";
export default function Edit(){
    const editparams=useParams()
    const refElement=useRef()
    useEffect(()=>{
axios.get(`http://localhost:9000/addproduct/edit/${editparams.id}`)
.then((res)=>{
    console.log(res.data)
    const record=res.data
    const element=refElement.current;
    element['productname'].value=record[0].productname
    element['productsize'].value=record[0].productsize
    element['productprice'].value=record[0].productprice
    element['productquantity'].value=record[0].productquantity
    element['productbrand'].value=record[0].productbrand



})
    },[editparams.id])
    const [product,setProduct]=useState({})
const handleChange=(e)=>{
    setProduct({...product,[e.target.name]:e.target.value})
}

    const handleSubmit=(e)=>{
        e.preventDefault();
        const url="http://localhost:9000/addproduct/updateData";
        const header={productid:editparams.id}
        axios.put(url,product,{headers:header})
        .then((res)=>{
          alert(res.data)
        })
        .catch((err)=>console.log(err))
      }
    return(

        <>
        <Adminnavbar/>
        <h1>Edit page</h1>
       <form ref={refElement} onSubmit={handleSubmit} >
        <div>
            <label htmlFor="productname">
                Product Name
            </label>
        <input type='text' name='productname' onChange={handleChange}/>
        </div>
        <div>
        <label htmlFor="productSize">
                Product Size
            </label>
        <input type='text' name='productsize' onChange={handleChange}/>
        </div>
        <div>
        <label htmlFor="productprice">
                Product price
            </label>
        <input type='text' name='productprice' onChange={handleChange}/>
        </div>
        <div>
        <label htmlFor="productquantity">
                Product Quantity
            </label>
        <input type='text' name='productquantity' onChange={handleChange}/>
        </div>
        <div>
        <label htmlFor="productbrand" >
                Product Brand
            </label>
        <input type='text' name='productbrand' onChange={handleChange}/>
        </div>
        <button>Edit</button>
       </form>
        </>
    )
}