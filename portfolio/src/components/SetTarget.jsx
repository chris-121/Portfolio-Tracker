import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

export default function SetTarget() {
    const [formData, setFormData] = useState({ Amount: '', SIP: '', Years: '' })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData) {
            axios.post('http://localhost:5000/setTarget', formData
            )
        }
    }
    return (
        <FormContainer onSubmit={handleSubmit} method='post'>
            <h2>Target Amount</h2>
            <input type="Number" id='text-box' placeholder='Enter Amount' onChange={(event) => setFormData({ ...formData, Amount: event.target.value })} />
            <h2>Monthly SIP</h2>
            <input type="Number" placeholder='Enter Monthly SIP' onChange={(event) => setFormData({ ...formData, SIP: event.target.value })} />
            <h2>Years</h2>
            <input type="Number" placeholder='Enter Years' onChange={(event) => setFormData({ ...formData, Years: event.target.value })} />
            <button onClick={handleSubmit}>Submit</button>
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
justify-content:center;
align-items:center;
flex-direction:column;
gap:1rem;
input{
  width:20rem;
  padding:0.4rem;
  border-radius:10px;
}
button{
    background-color:${colors.darkBlue};
    border:1px solid ${colors.darkBlue};
    color:${colors.blue};
    border-radius:25px;
    padding:0.5rem 2rem;
}
}
`