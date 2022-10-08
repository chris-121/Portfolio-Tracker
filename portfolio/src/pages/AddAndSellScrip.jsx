import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { BuyAndSellScrip } from '../utils/APIRoutes';

export default function AddAndSellScrip({ Operation }) {
    const [formData, setFormData] = useState({ ScripName: '', Qty: '', AvgPrice: '', Operation: Operation, Category: "Stock" })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData)
            axios.post(BuyAndSellScrip, formData)
    }
    return (
        <>
            <Navbar />
            <FormContainer onSubmit={handleSubmit} method='post'>
                <h1>{Operation + ' Scrip'}</h1>
                <label htmlFor="">Scrip Name</label>
                <input type="Text" placeholder='Enter Amount' onChange={(event) => setFormData({ ...formData, ScripName: event.target.value })} />
                <label htmlFor="">Quantity</label>
                <input type="Text" placeholder='Enter Quantity' onChange={(event) => setFormData({ ...formData, Qty: event.target.value })} />
                <label htmlFor="">Avg Price</label>
                <input type="Text" placeholder='Enter Avg Price' onChange={(event) => setFormData({ ...formData, AvgPrice: event.target.value })} />
                <label htmlFor="">Category</label>
                <select id="Category" name="Category" onChange={(event) => setFormData({ ...formData, Category: event.target.value })}>
                    <option value="Stock">Stock</option>
                    <option value="Crypto">Crypto</option>
                </select>
                <button type='submit'>Submit</button>
            </FormContainer>
        </>
    )
}
const colors = {
    orange: '#f43a09',
    blue: '#e8f9fd',
    green: '#59ce8f',
    darkBlue: '#2782cc',
}
const FormContainer = styled.form`
width:100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:0.5rem;
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
select{
    width:21rem;
    height:2rem;
    padding:0.4rem;
    border:1.5px solid;
    border-radius:10px;
}
}
`