import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import { Table } from 'react-bootstrap'
import './Home.css'
import { UserContext } from './context/context'
import {Card} from 'react-bootstrap'

function Home() {

    const navigate = new useNavigate();
    const location = useLocation();
    const { user, setUser } = useContext(UserContext)
    console.warn(user)
    const naviredirectbook = () => {
        navigate('/booking')
    }
    const naviredirectremove = () => {
        navigate('/delete')
    }
    const naviredirectstatus = () => {

        navigate('/edit')
    }

    const [keyword, setkeyword] = useState("");
    const [data, setdata] = useState([]);


    useEffect(() => { fetch("http://localhost:9000/retrieve", { method: "POST" }).then((response) => response.json()).then((value) => setdata(value)) }, [])

    const handlesearch = () => {
        fetch("http://localhost:9000/retrieve", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "orderid": parseInt(keyword) })
        }).then((response) => response.json()).then((value) => setdata(value))
    }
    console.warn(data);






    return (



        <div>
            {location?.state.id === "0" && <button className='make' onClick={naviredirectbook}>Make Order</button>}
            {location?.state.id === "0" && <button className='make' onClick={naviredirectremove}>Remove Order</button>}
            {location?.state.id === "1" && <button className='make' onClick={naviredirectstatus}>Edit Status</button>}
            <input type="text" placeholder="Enter orderid to search" onChange={(e) => setkeyword(e.target.value)} />
            <input type="button" value="search" onClick={handlesearch} />
            {data.map((item, i) => {

                return (
                    <div className="col-sm-5 " id='l05'>
                        <Card style={{borderBlockWidth:'0.1rem',borderWidth:'0.1rem' ,borderTopLeftRadius:'3rem',borderLeftColor:'black',borderRightColor:'black',borderBlockColor:'black',borderBottomLeftRadius:'2rem',borderTopLeftRadius:'2rem',borderBottomLeftRadius:'2rem',borderBottomRightRadius:'2rem',borderTopRightRadius:'2rem'}}>
                            <Card.Body>
                        <label className='table'>   OrderId: {item.orderid},Merchant Name: {item.merchant},Status:<span style={{color:item.status==="incomplete"?"orange":"green"}}>{item.status}</span>,Total:{item.total}</label>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Fabric</th>
                                    <th>Density</th>
                                    <th>Size XS</th>
                                    <th>Size S</th>
                                    <th>Size M</th>
                                    <th>Size L</th>
                                    <th>Size XL</th>
                                    <th>Sub Total</th>
                                </tr>
                            </thead>
                            {item.orders.map((order, index) => {
                                return (<tr
                                    key={index}
                                >
                                    <td>{order.Cloth}</td>
                                    <td>{order.Density}</td>
                                    <td>{order.xs}</td>
                                    <td>{order.s}</td>
                                    <td>{order.m}</td>
                                    <td>{order.l}</td>
                                    <td>{order.xl}</td>
                                    <td>{order.stot}</td>
                                </tr>)
                            })}
                        </Table>
                        </Card.Body>
                    </Card>

                    </div>
                )

            })}

            {data.length === 0 && <p>No items Match Your Search</p>}
            {/* <button onClick={logout}>LOGOUT</button> */}
        </div>

    )
}
export default Home
