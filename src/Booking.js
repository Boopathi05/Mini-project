import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Booking.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Card } from 'react-bootstrap';
import { Select } from '@mui/material';
import Bar from './Bar'



function Booking() {
  const navigate = new useNavigate();

  const [orderid,setorderid] = useState(0);
  const [merchant,setmerchant] = useState("");
  const [inputlist, setinputlist] = useState([{
    Cloth:"",Density:0,xs:0,s:0, m:0 ,l:0,xl:0
  }]);

  const handlechange = (e, index) => {
    console.warn(inputlist)
    const { name, value } = e.target;
    const list = [...inputlist];
    list[index][name] = value;
    setinputlist(list)
  
  }

  const handleadd = () => {
    setinputlist([...inputlist, 
      {Cloth:"",Density:0,xs:0,s:0, m: 0 ,l:0,xl:0,stot:0
    }])
  }
  const handleremove = index => {
    const list = [...inputlist]
    list.splice(index, 1)
    setinputlist(list)
  }
  async function handlesubmit(){
    const result = {"orderid":parseInt(orderid),
    "merchant":merchant,
      "orders":inputlist,
    "total":thetotal,
    "status":"incomplete"
    }
    let resp = await fetch("http://localhost:9000/insert" ,{
             method:'POST',
             headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"    
             },
             body: JSON.stringify(result)
         })
         resp = await resp.json();
         console.warn(resp)
         navigate('/home',{state:{id:"0"}})
  }
  var thetotal = 0;
  for(let i=0;i<inputlist.length;i++){
    thetotal+=inputlist[i].stot
  }
  return (
    
   
   
   

    <div className="booking">
    
      <Container>
      <Card className='card' style={{borderBlockWidth:'1rem',borderTopLeftRadius:'5rem',borderBottomLeftRadius:'5rem',borderTopLeftRadius:'5rem',borderBottomLeftRadius:'5rem',borderBottomRightRadius:'5rem',borderTopRightRadius:'5rem'}}>
        <Card.Body>
 

      
    <label className='align'>ORDER ID</label>
    <input type="text" name="orderid"  className='order' placeholder="Order ID" onChange={(e)=>setorderid(e.target.value)}/>
    <label  className='order3'>Merchant Name</label>
    <input type="text" name="merchant"  className='order4' placeholder="Merchant Name" onChange={(e)=>setmerchant(e.target.value)}/>
  <label className='align'>   Date  {new Date().getDate().toLocaleString()+"/"+new Date().getMonth().toLocaleString()+"/"+new Date().getFullYear().toLocaleString()+''}</label>  
      {inputlist.map((item, i) => {
        return (
          <div key={i} className="box">
            <label className='align'>Fabric : </label>
            <input className='align' type="text" name="Cloth" placeholder="Fabric"  value={item.Cloth} onChange={e => handlechange(e, i)} />
            <label className='align'>Density : </label>
            <input className='align' type="number" min="0" step="10" name="Density" placeholder="Density(in GSM)" value={item.Density} onChange={e => handlechange(e, i)} />

            <label className='order6'>SIZE XS : </label>
            <input className='align' type="number" name="xs" min="0" placeholder="xs" value={item.xs} onChange={e => handlechange(e, i)} />
            <label className='align'>SIZE S : </label>
            <input  className='align' type="number" name="s" min="0" placeholder="s"  value={item.s} onChange={e => handlechange(e, i)} />
            <label  className='align'>SIZE M : </label>
            <input  className='order5' type="number" name="m"  min="0" placeholder="m" value={item.m} onChange={e => handlechange(e, i)} />
            <label  className='align'>SIZE L : </label>
            <input  className='order7' type="number" name="l" min="0" placeholder="l"  value={item.l} onChange={e => handlechange(e, i)} />
            <label  className='align'>SIZE XL : </label>
            <input  className='order2' type="number" name="xl" min="0" placeholder="xl"  value={item.xl} onChange={e => handlechange(e, i)} />
            <label  className='align'>Sub Total</label>
            {item.stot = parseInt(item.xs)+parseInt(item.s)+parseInt(item.m)+parseInt(item.l)+parseInt(item.xl)}
            {i !== 0 && <input  className='align' type="button" value="remove"  onClick={() => handleremove(i)} />}
            {inputlist.length === i + 1 && <input  className='align' type="button" value="add" onClick={handleadd} />}
          </div>
        

        )
      })}
      <label  className='align'>Total  {thetotal}</label>
     
      <button  className='align'  onClick={handlesubmit}>Submit</button>
      </Card.Body>
      </Card>
      </Container>
    
      
    </div>
  
  )
}

export default Booking
