import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "./SalesManagerNavBar"
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import '../Order/.css'

export default function Pending_Orders() {

    //Search date and get details
    const [search, setSerch] = useState("");
    function searchItem(event) {
        setSerch(event.target.value);
    }

    //view all pending orders
    const [Pending, setPending] = useState([]);
    useEffect(() => {
        function getPendingOrders() {
            axios.get("http://localhost:8889/order/view").then((res) => {
                console.log(res.data);
                setPending(res.data)
            }).catch((err) => {
                alert(err.message)
            })
        }
        getPendingOrders();

    }, [Pending])


    //use accept order
    const [orderID, setOid] = useState("");
    const [UserName, setUsername] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [transport_details, setTDetails] = useState("");
    const [note, setNote] = useState("");

    function sendData(e) {
        e.preventDefault();

        const Accept_order = {
            orderID,
            UserName,
            category,
            quantity,
            date,
            transport_details,
            note
        }

        axios.post("http://localhost:8889/order/accept", Accept_order).then(() => {
            alert("Order Added")
        }).catch((err) => {
            alert(err)
        })
        console.log(Accept_order)
    }

    //Reject pending order
    const deleteDataD = (e) => {

        var result = window.confirm("Are you sure?");

        if (result == true) {

            axios.delete(`http://localhost:8889/order/reject/${e._id}`).then((res) => {

            }).catch(e => {

                alert(e)

            })

        } else {

            e.preventDefault();

        }

    }

    return (
        <div>
            <Navbar />

            <div className="order_bground" style={{ zIndex: 98 }} >

                <div className='all_container'>
                    <div className='row'>
                        <div className='col-lg-9 mt-2 mb-2'>
                            <h2 class="B_heading"><center><u>Pending Orders</u></center></h2>
                            <br></br><br></br>
                        </div>

                        <div className='col-lg-3 mt-2 mb-2'>
                            <br></br>
                            <div className='check_button'><Link to="checkInventory"><button
                                type="button2" style={{backgroundColor:"#2E2EFF" }} 
                                class="btn btn-info">Check Inventory</button></Link></div>
                        </div>
                    </div>

                    <input
                        onChange={searchItem}
                        className='form-control'
                        type='search'
                        placeholder='Search....'
                        name='searchQuery'>
                    </input>
                    <br></br>


                    <table class="table" style={{ width: "1350px" }}>
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">OrderID</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Category</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Date</th>
                                <th scope="col">Transport</th>
                                <th scope="col">Note</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {Pending.filter(e =>
                                e.UserName.toLowerCase().includes(search) ||
                                e.date.includes(search) ||
                                e.orderID.includes(search)
                            ).map(e => (
                                <tr>
                                    <td>{e._id}</td>
                                    <td>{e.UserName}</td>
                                    <td>{e.category}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.date}</td>
                                    <td>{e.transport_details}</td>
                                    <td>{e.note}</td>
                                    <td></td>
                                    <td></td>
                                    <td><Button color="error" onClick={() => { deleteDataD(e) }} variant="contained" startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button></td>
                                </tr>
                            ))
                            }

                        </tbody>
                    </table>


                    <br></br>
                    <br></br>
                    <hr />

                    <form noValidate onSubmit={sendData}>
                        <input className='textfield' type="text" onChange={(event) => {
                            setOid(event.target.value);
                        }} placeholder='Enter orderID' />

                        <input className='textfield' type="text" onChange={(event) => {
                            setUsername(event.target.value);
                        }} placeholder='Enter UserName' />

                        <input className='textfield' type="text" onChange={(event) => {
                            setCategory(event.target.value);
                        }} placeholder='Enter category' />

                        <input className='textfield' type="number" onChange={(event) => {
                            setQuantity(event.target.value);
                        }} placeholder='Enter quantity' />

                        <input className='textfield' type="date" onChange={(event) => {
                            setDate(event.target.value);
                        }} />

                        <input className='textfield' type="text" onChange={(event) => {
                            setTDetails(event.target.value);
                        }} placeholder='Enter transport' />

                        <input className='textfield' type="text" onChange={(event) => {
                            setNote(event.target.value);
                        }} placeholder='Enter note' />

                        <Button color="success" style={{ marginLeft: "70px" }} href="/pending_orders" variant="contained" ><CheckIcon />
                            Accept
                        </Button>
                    </form>


                </div>
            </div>
        </div>
    )

}
