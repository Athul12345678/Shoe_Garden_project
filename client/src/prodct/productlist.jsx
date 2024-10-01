import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

export default function Productlist() {
    const [record, setRecord] = useState([]);

    const Productdisplay = () => {
        const url = 'http://localhost:9000/addproduct/display'; // Add your API URL here
        axios.get(url)
            .then((res) => {
                setRecord(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    useEffect(() => {
        Productdisplay();
    }, []);
    const handleDelete = (id) => {
        const url = `http://localhost:9000/addproduct/delete/${id}`;
        axios.delete(url)
          .then((res) => {
            console.log("Delete successful:", res.data);
            // Refresh the product list after successful deletion
            productDisplay();
          })
          .catch((err) => {
            console.error("Error during delete operation:", err);
          });
      }

    return (
        <>
        <Adminnavbar/>
        <div>
            <h1>Product List</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Size</th>
                            <th>Product price</th>
                            <th>Product Quantity</th>
                            <th>Brand Name</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productname}</td>
                                <td>{item.productsize}</td>
                                <td>{item.productprice}</td>
                                <td>{item.productquantity}</td>
                                <td>{item.productbrand}</td>
                                <td>
                                <a href={`/edit/${item._id}`}>Edit</a>
                                                                <button onClick={()=>handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                           
                        ))}
                        

                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}