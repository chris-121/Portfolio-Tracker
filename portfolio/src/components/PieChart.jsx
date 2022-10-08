import React from 'react';
import {
  Chart as ChartJS,
  ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

export default function PieChart({ arr }) {
  ChartJS.register(
    ArcElement,
  );
  let AmountInvestedInStock= 0
  let AmountInvestedInCrypto= 0
  let CurrentValueInStock= 0
  let CurrentValueInCrypto= 0
  arr.forEach(element => {
    if(element.Category === 'Stock'){
      AmountInvestedInStock+=element.Qty*element.avgPrice
      CurrentValueInStock+=element.Qty*element.Current_Price
    }
    if(element.Category === 'Crypto'){
      AmountInvestedInCrypto+=element.Qty*element.avgPrice
      CurrentValueInCrypto+=element.Qty*element.Current_Price
    }
  });
  console.log(arr.map((data) => data.ScriptName));
  const labels = arr.map((data) => data.ScriptName);
  const data1 = {
    labels,
    datasets: [
      {
        data: arr.map((data) => (data.Qty * data.avgPrice)),
        borderColor: 'black',
        backgroundColor:  [ "#AADEA7", "#E6F69D","#2D87BB","#EC6B56", "#FFC154", "#47B39C" ] 
      },
    ],
  };
  const data2 = {
    labels,
    datasets: [
      {
        
        data: arr.map((data) => (data.Qty * data.Current_Price)),
        borderColor: 'black',
        backgroundColor:  [ "#AADEA7", "#E6F69D","#2D87BB","#EC6B56", "#FFC154", "#47B39C" ] 
      },
    ],
  };
  const labels2 =["Stock","Crypto"]
  const data3 = {
    labels2,
    datasets: [
      {
        data: [AmountInvestedInStock,AmountInvestedInCrypto],
        borderColor: 'black',
        backgroundColor:  [ "#AADEA7", "#E6F69D","#2D87BB","#EC6B56", "#FFC154", "#47B39C" ] 
      },
    ],
  };
  const data4 = {
    labels2,
    datasets: [
      {
        data: [CurrentValueInStock,CurrentValueInCrypto],
        borderColor: 'black',
        backgroundColor:  [ "#AADEA7", "#E6F69D","#2D87BB","#EC6B56", "#FFC154", "#47B39C" ] 
      },
    ],
  };
  return (
    <Container>
      <div className="charts">

      <div style={{ width: 300 }}>
        <h3>Invested Amount</h3>
        <Pie data={data1} />;
      </div>
      <div style={{ width: 300 }}>
      <h3>Current Value</h3>
        <Pie data={data2} />;
      </div>
      </div>
      <div className="charts">
      <div style={{ width: 300 }}>
      <h3>Allocation</h3>
        <Pie data={data3} />;
      </div>
      <div style={{ width: 300 }}>
      <h3>Current Allocation</h3>
        <Pie data={data4} />;
      </div>
      </div>
    </Container>

  )
}
// const colors = {
//   orange: '#f43a09',
//   blue: '#e8f9fd',
//   green: '#59ce8f',
//   darkBlue: '#2782cc',
// }
const Container = styled.div`
margin:4rem 0;
width:80%;
.charts{
  text-align:center;
  display:flex;
  justify-content:space-evenly;
}
`