import React from 'react'
import styled from 'styled-components'
import { Charts } from './Charts';
import { Link } from 'react-router-dom';

export default function Home({ Data }) {
  let currentValue = Data[0].portfolioValue[Data[0].portfolioValue.length - 1].CurrentValue;
  let arr = Data.slice(1)
  let gainLoss = currentValue - Data[0].Starting_Capital
  return (
    <Container>
      <div className="long-term-portfolio">
        <div className='add-details'>
          <div>
            <h3>Total funds added</h3>
            <h4>{Data[0].totalAddedFunds}</h4>
          </div>
          <div>
            <h3>Total funds withdrawn</h3>
            <h4>{Data[0].totalWithdrawnFunds * -1}</h4>
          </div>
          <div>
            <h3>Available funds</h3>
            <h4>{Data[0].availableFunds}</h4>
          </div>
        </div>
        <div className="buttons">
          <button><Link to="/funds">Add / Widthdraw Funds</Link></button>
          <button><Link to="/setTarget">Set Target</Link></button>
        </div>
        <div className="chart">
          <Charts Data={Data}/>
        </div>
        <div className="selection">

          <select name="year" id="year">
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="All">All</option>
          </select>
          <select name="timeFrame" id="timeFrame">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <div className="details">
          <div className="wrap">
            <p>Capital</p>
            <p>{Data[0].Capital}</p>
          </div>
          <div className="wrap">
            <p>Starting_Capital</p>
            <p>{Data[0].Starting_Capital}</p>
          </div>
          <div className="wrap">
            <p>Current Value</p>
            <p>{currentValue}</p>
          </div>
          <div className="wrap">
            <p>Gain/Loss</p>
            <p className={`${(gainLoss)>0 ? 'green' : 'red' }`}>{`${parseInt(gainLoss)} (${parseInt(gainLoss / Data[0].Starting_Capital * 100)} %)`}</p>
          </div>
          <div className="wrap">
          <p>1W Change</p>
          <p className={`${(currentValue-Data[0].lastMonthClose)>0 ? 'green' : 'red' }`}>{parseInt(currentValue-Data[0].lastWeekClose)+" | " +parseInt(((currentValue-Data[0].lastWeekClose)/Data[0].lastWeekClose)*100 )+ '%' }</p>
        </div>
        <div className="wrap">
          <p>1M Change</p>
          <p className={`${(currentValue-Data[0].lastMonthClose)>0 ? 'green' : 'red' }`}>{parseInt(currentValue-Data[0].lastMonthClose)+" | " +parseInt(((currentValue-Data[0].lastMonthClose)/Data[0].lastMonthClose)*100 )+ '%'}</p>
        </div>
        </div>
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
height:100%;
width:100%;
background-color: ${colors.blue};
display:flex;
flex-direction:column;
align-items:center;
.green{
  color:green;
}
.red{
  color:red;
}
.long-term-portfolio{
  width:80%;
  display:flex;
  flex-direction:column;
  align-items:center;
  .chart{
    height:25rem;
    width:80%;
    background-color:white;

  }
  .details{
    flex-wrap:wrap;
    justify-content:center;
    width:80%;
    padding:2rem 1rem;
    display:flex;
    gap:3rem;
    .wrap{
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:1rem;
    }
  }
}
.add-details{
  display:flex;
  gap:3rem;
  text-align:center;
  margin:1rem 0 0 0;
  h3,h4{
    padding:0.5rem;
  }
}
.buttons{
  display:flex;
  gap:0.5rem;
  button{
    background-color:${colors.darkBlue};
    border:1px solid ${colors.darkBlue};
    width:10rem;
    padding:0.5rem;
    border-radius:25px;
    opacity:0.8;
    transition:opacity 250ms;
    margin:0 0 1rem 0;
    a{
      text-decoration:none;
      color:${colors.blue};
    }
  }
  button:hover{
    opacity:1;
  }
}
`