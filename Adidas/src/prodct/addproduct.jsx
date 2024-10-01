import React, { useState } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

export default function AddProduct() {
  const [product, setProduct] = useState({});

  const handleChange = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  const formdata = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    formdata.append('productname', product.productname);
    formdata.append('productprice', product.productprice);
    formdata.append('productsize', product.productsize);
    formdata.append('productbrand', product.productbrand);
    formdata.append('productquantity', product.productquantity);
    formdata.append('productimage', product.productimage);
    formdata.append('productcategory', product.productcategory);
    formdata.append('productdescription', product.productdescription);

    const url = "http://localhost:9000/addproduct/addproduct";
    axios.post(url, formdata, { headers: { "Content-Type": 'multipart/form-data' } })
      .then((res) => {
        alert(res.data);
      });
    console.log(product);
  };

  return (
    <div className="add-product-page">
      <Adminnavbar />
      <div className="add-product-container">
        <h1>Add Product</h1>
        <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-group">
            <label htmlFor='productname'>Product Name</label>
            <input type="text" id='productname' name='productname' placeholder='Enter the product name' required onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
          </div>
          <div className="form-group">
            <label htmlFor='productprice'>Product Price</label>
            <input type="text" id='productprice' name='productprice' placeholder='Enter the product price' required onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
          </div>
          <div className="form-group">
            <label htmlFor='productsize'>Product Size</label>
            <input type="text" id='productsize' name='productsize' placeholder='Enter the product size' required onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
          </div>
          <div className="form-group">
            <label htmlFor='productquantity'>Product Quantity</label>
            <input type="text" id='productquantity' name='productquantity' placeholder='Enter the product quantity' required onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
          </div>
          <div className="form-group">
            <label htmlFor='productbrand'>Product Brand</label>
            <input type="text" id='productbrand' name='productbrand' placeholder='Enter the product brand' required onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
          </div>
          <div className="form-group">
            <label htmlFor='productimage'>Product Image</label>
            <input type='file' name='productimage' onChange={(e) => { handleChange(e.target.name, e.target.files[0]) }} />
          </div>
          <div className="form-group">
            <label htmlFor='productcategory'>Product Category</label>
            <select id='productcategory' name='productcategory' required onChange={(e) => { handleChange(e.target.name, e.target.value) }}>
              <option value="">Select a category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='productdescription'>Product Description</label>
            <textarea id='productdescription' name='productdescription' placeholder='Enter the product description' required onChange={(e) => { handleChange(e.target.name, e.target.value) }}></textarea>
          </div>
          <button type='submit'>Add Product</button>
        </form>
      </div>
    </div>
  );
}