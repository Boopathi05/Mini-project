import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './Edit.css'
import {Card} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
function Edit() {
    const [data, setdata] = new useState([])
    var thedata = {}
    const navigate = new useNavigate()

    const [selectedid, setselectedid] = new useState("")

    useEffect(() => { fetch("http://localhost:9000/retrieve", { method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }, body: JSON.stringify({ "status": "incomplete" }) }).then((response) => response.json()).then((value) => setdata(value)) }, [])
    console.warn(data)
    var theind = -1;
    function handleedit() {
        
        for (let i = 0; i < data.length; i++) {
            if (data[i].orderid === parseInt(selectedid)) {
                theind = i
            }
        }
        thedata = data[theind]
         thedata.status = "completed"
         console.warn(JSON.stringify(thedata))
         fetch("http://localhost:9000/delete" ,{
             method:'POST',
             headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"    
             },
             body: JSON.stringify({"orderid":parseInt(selectedid)})
         })
         fetch("http://localhost:9000/insert" ,{
             method:'POST',
             headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"    
             },
             body: JSON.stringify(thedata)
         })
         navigate('/home',{state:{id:"1"}})
    }

    return (
       
        <div className='mask'>
           <Image src='./image/thumbsup.png' thumbnail style={{border:'none'}}/>
         <Card  style={{borderBlockWidth:'0.1rem',borderWidth:'0.1rem' ,borderTopLeftRadius:'3rem',borderLeftColor:'black',borderRightColor:'black',borderBlockColor:'black',borderBottomLeftRadius:'2rem',borderTopLeftRadius:'2rem',borderBottomLeftRadius:'2rem',borderBottomRightRadius:'2rem',borderTopRightRadius:'2rem'}}>
             <Card.Body>
        {data.length!==0 &&<div>
            <select name="" onChange={(e)=>{
            setselectedid(e.target.value)
        }}>
            <option>Please select an option</option>
                {
                    data.map((item, i) =>
                        <option key={i} value={item.orderid}>{item.orderid}</option>
                    )}


            </select>
            <input type="button" value="Edit" onClick={handleedit} />
        </div>}
        {data.length===0&&<div className='asd'>No orders Pending</div>
        }
        </Card.Body>
        </Card>
        
       </div>
    )
}

export default Edit