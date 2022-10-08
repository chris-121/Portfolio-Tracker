import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PieChart from './PieChart'

export default function LTPortfolio({ Data }) {
  let AmountInvested = 0;
  let currentValue = 0;
  let gainLoss = 0;
  let Capital = Data[0].Capital
  let arr = Data.slice(1)
  arr.forEach((element, index) => {
    AmountInvested += element.Qty * element.avgPrice;
    currentValue += element.Qty * element.Current_Price;
    gainLoss += (element.Current_Price - element.avgPrice) * element.Qty
  });
  let investedPercentage = (AmountInvested / Data[0].Capital) * 100
  return (
    <Container>
      <div className='Main-details'>
        <div className="wrap">
          <p>Capital</p>
          <p>{Capital}</p>
        </div>
        <div className="wrap">
          <p>Amount Invested</p>
          <p>{AmountInvested}</p>
        </div>
        <div className="wrap">
          <p>% of Capital Invested</p>
          <p>{parseInt(investedPercentage )+ ' %'}</p>
        </div>
        <div className="wrap">
          <p>Current Value</p>
          <p>{currentValue}</p>
        </div>
        <div className="wrap">
          <p>Gain/Loss (CAP)</p>
          <p className={`${gainLoss>0 ? 'green' : 'red' }`}>{parseInt(gainLoss) +' |' +parseInt(AmountInvested ? gainLoss / AmountInvested * 100 : 0)+'% ('+parseInt(gainLoss / Capital * 100) + '% )'}</p>
        </div>
      </div>
      <div className='buttons'>
        <button><Link to="/AddScrip">ADD Scrip</Link></button>
        <button><Link to="/SellScrip">SELL Scrip</Link></button>
      </div>
      <div className="stock-list-div">
        <table>
          <tr>
            <th rowspan="2">Company</th>
            <th rowspan="2">Category</th>
            <th rowspan="2">Avg.buy price</th>
            <th rowspan="2">Qty</th>
            <th colSpan="2">Invested amount</th>
            <th rowspan="2">LTP</th>
            <th colspan="2">Gain/Loss</th>
            <th colspan="2">Current Value</th>
          </tr>
          <tr>
            <th >Amount</th>
            <th>%</th>
            <th >Amount</th>
            <th>%</th>
            <th >Amount</th>
            <th>%</th>
          </tr>
          {
            arr.map((e) => {
              let gL=parseInt(e.Current_Price*e.Qty-e.avgPrice*e.Qty);
              let percentage=parseInt((((e.Current_Price*e.Qty)-(e.avgPrice*e.Qty))/(e.avgPrice*e.Qty)) * 100);
              return (

                <tr>
                  <td>{e.ScriptName}</td>
                  <td>{e.Category}</td>
                  <td>{parseInt(e.avgPrice)}</td>
                  <td>{e.Qty}</td>
                  <td>{parseInt(e.avgPrice * e.Qty)}</td>
                  <td>{`${parseInt((e.avgPrice * e.Qty / Capital) * 100 )}%`}</td>
                  <td>{parseInt(e.Current_Price)}</td>
                  <td className={`${gL>0 ? 'green' : 'red' }`}>{gL}</td>
                  <td className={`${percentage>0 ? 'green' : 'red' }`}>{`${percentage}%`}</td>
                  <td>{parseInt(e.Current_Price*e.Qty)}</td>
                  <td>{`${parseInt((e.Current_Price * e.Qty / currentValue) * 100 )}%`}</td>
                </tr>
              )
            })
          }
        </table>
      </div>
     <PieChart arr={arr}/>
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
height:100%;
width:100%;
overflow:hidden;
background-color: ${colors.blue};
display:flex;
flex-direction:column;
align-items:center;
.red{
  color:red
}
.green{
  color:green;
}
.Main-details{
  margin-top:20px;
  background-color:white;
  height:6rem;
  width:80%;
  border-radius:25px;
  flex-wrap:wrap;
  justify-content:space-evenly;
  align-items:center;
  display:flex;
  gap:3rem;
  .wrap{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1rem;
  }
}
.buttons, .updatePriceBtn{
  display:flex;
  justify-content:center;
  gap:1rem;
  margin:1rem 0;
  button{
    background-color:${colors.darkBlue};
    border:1px solid ${colors.darkBlue};
    padding:0.5rem 2rem;
    border-radius:25px;
    opacity:0.8;
    transition:opacity 250ms;
  }
  button:hover{
    cursor:pointer;
    opacity:1;
  }
  a{
    color:${colors.blue};
    text-decoration:none;
  }
}
.stock-list-div{
  margin-top:5px;
  width:80%;
  background-color:white;
  border-radius:25px;
  overflow:hidden;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  th{
    border-right:1px solid #dddddd;
    border-top:1px solid #dddddd;
    background-color:${colors.darkBlue};
    color:white;
  }
  td{
    border: 1px solid #dddddd;
  }
  td, th {
    text-align: center;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
}
`
