import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

export default function FundTransaction() {
  const [formData, setFormData] = useState({ Amount: '', Operation: '' })

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData) {
      axios.post('http://localhost:5000/funds', formData
      )
    }
  }
  return (
    <FormContainer onSubmit={handleSubmit} method='post'>
      <h2>Add / Withdraw money</h2>
      <input type="Number" id='text-box' placeholder='Enter Amount' onChange={(event) => setFormData({ ...formData, Amount: event.target.value })} />
      <div>
        <input type="Submit" value="Add" onClick={(event) => setFormData({ ...formData, Operation: event.target.value })} />
        <input type="Submit" value="Withdraw" onClick={(event) => setFormData({ ...formData, Operation: event.target.value })} />
      </div>
    </FormContainer>
  )
}
const colors = {
  orange: '#f43a09',
  blue: '#e8f9fd',
  green: '#59ce8f',
  darkBlue: '#2782cc',
}
const FormContainer = styled.form`
display:flex;
align-items:center;
flex-direction:column;
#text-box{
  margin-top:10px;
  width:20rem;
  padding:0.4rem;
  border-radius:10px;
}
div{
  padding:10px;
  display:flex;
  gap:0.5rem;
  input{
    background-color:${colors.darkBlue};
    color:${colors.blue};
    border:none;
    padding:0.3rem 2rem;
    border-radius:10px;
  }

}
`