import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { updatePrices } from '../utils/APIRoutes';
import { autoUpdateAPI } from '../utils/APIRoutes';

export default function UpdatePrice({ Data }) {
  let arr = Data.slice(1)
  const [form, setForm] = useState([]);
  const handleSubmit = () => {
    axios.post(updatePrices, form).then((res) => {
      console.log(res);
    })
  }
  const handleChange = (e,name) => {
    form.forEach((element)=>{
      if(element.name === name){
        element.price=e.target.value;
        return
      }
    })
    setForm([{ name: name, price: e.target.value }])
  }
  const autoUpdate = () => {
    axios.get(autoUpdateAPI).then((res) => {
      console.log(res);
    })
  }
  return (
    <Container>
      {
        arr.map((e) => {
          console.log(e);
          return (
            <div className="form">
              <label htmlFor="">{e.ScriptName}</label>
              <input type="text" onChange={(event) => {handleChange(event,e.ScriptName) }} />
            </div>
          )
        })
      }
      <div className="btns">
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={autoUpdate}>Auto Update</button>
      </div>
    </Container>
  )
}
const colors = {
  orange: '#f43a09',
  blue: '#e8f9fd',
  green: '#59ce8f',
  darkBlue: '#2782cc',
}
const Container = styled.div`
background-color:${colors.blue}
display:flex;
flex-direction:column;
gap:1rem; 
margin:4rem 0;
.form{
  margin:1rem 0;
  display:flex;
  gap:0.5rem;
  justify-content:center;
}
.btns{
  margin:2rem 0;
  display:flex;
  justify-content:center;
  gap:1rem;
  button{
    background-color:${colors.darkBlue};
    border:1px solid ${colors.darkBlue};
    padding:0.5rem 2rem;
    border-radius:25px;
    opacity:0.8;
    transition:opacity 250ms;
    color:${colors.blue};
  }
  button:hover{
    cursor:pointer;
    opacity:1;
  }
}
`
