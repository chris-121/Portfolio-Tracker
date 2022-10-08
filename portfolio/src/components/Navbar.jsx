import React from 'react';
import styled from 'styled-components';

export default function Navbar({focus,setFocus}) {
  return (
    <Nav>
        <div className="title">PORTFOLIO TRACKER</div>
        <div className="list">
            <ul>
                <li className={focus==='home' ? `selected` : ''} onClick={()=> setFocus('home')}>Home</li>
                <li className={focus==='LT' ? `selected` : ''} onClick={()=> setFocus('LT')}>LT Portfolio</li>
                <li className={focus==='updatePrice' ? `selected` : ''} onClick={()=> setFocus('updatePrice')}>Update Price</li>
                <li className={focus==='Settings' ? `selected` : ''} onClick={()=> setFocus('Settings')}>Settings</li>
            </ul>
        </div>
    </Nav>
  )
}
const colors={
    orange:'#f43a09',
    blue:'#e8f9fd',
    green:'#59ce8f',
    darkBlue:'#2782cc',
}
const Nav =styled.div`
.title{
font-family: 'Roboto', sans-serif;
font-weight:900;
font-size:1.5rem;
}
color:${colors.darkBlue};
padding:1rem 3rem;
display:flex;
align-items:center;
justify-content:space-between;
.list{
    ul{
        color:black;
        list-style:none;
        display:flex;
        gap:1.5rem;
        li{
            font-weight:400;
            cursor:pointer;
        }
    }
}
.selected{
    color:${colors.darkBlue};
}
`
