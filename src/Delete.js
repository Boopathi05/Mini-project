import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Bar from './Bar';
import {Image} from 'react-bootstrap'
import './Delete.css';
import {Card} from 'react-bootstrap'



function Delete() {
    const navigate = new useNavigate();
    const [selecteddata,setselecteddata] = useState("")
    const [data,setdata] = useState([]);
   
    useEffect(()=> {fetch("http://localhost:9000/retrieve",{method:"POST"}).then((response)=>response.json()).then((value) => setdata(value))},[])
    
    async function handledelete(){
        let item = {"orderid":parseInt(selecteddata)}
        let result = await fetch("http://localhost:9000/delete" ,{
             method:'POST',
             headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"    
             },
             body: JSON.stringify(item)
         })
         result = await result.json();
         navigate('/home',{state:{id:"0"}})
    }
    return (
        
    <div   className='switz'>
        <Image src='./image/Dustbin.png' thumbnail style={{border:'none'}}/>
        <Card style={{borderBlockWidth:'0.1rem',borderWidth:'0.1rem' ,borderTopLeftRadius:'3rem',borderLeftColor:'black',borderRightColor:'black',borderBlockColor:'black',borderBottomLeftRadius:'2rem',borderTopLeftRadius:'2rem',borderBottomLeftRadius:'2rem',borderBottomRightRadius:'2rem',borderTopRightRadius:'2rem'}}>
            <Card.Body>
       

    
        <select className='edit' name="" onChange={(e)=>{
            setselecteddata(e.target.value)
        }}>
            <option>Please select an option</option>
            {
                data.map(item=>
            <option value={item.orderid}>{item.orderid}</option>
            )}


        </select>
        <input className='edit' type="button" value="Delete" onClick={handledelete}/>
     </Card.Body>
     </Card>
    </div>
  )
}

export default Delete