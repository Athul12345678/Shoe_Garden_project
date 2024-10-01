import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from '../prodct/Adminnavbar';

export default function User_display() {
    const [record, setRecord] = useState([]);

    const userDisplay = () => {
        const url = 'http://localhost:9000/userreg/user_display';
        axios.get(url)
            .then((res) => {
                setRecord(res.data);
            })
            .catch((err) => {
                console.error("Error displaying users", err);
            });
    };

    useEffect(() => {
        userDisplay();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    return (
        <>
        <Adminnavbar/>
            <h1>All Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {record.map((item) => (
                        <tr key={item._id}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.mobilenumber}</td>
                            <td>
                                <button>Orders</button>
                                <a href={`/delete/${item._id}`}>Delete</a> {/* Example link to delete */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
