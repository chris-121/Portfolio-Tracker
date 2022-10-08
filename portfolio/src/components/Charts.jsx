import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export function Charts({Data}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
   const options = {
  maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Portfolio Value',
      },
    }
  };
  const labels = Data[0].portfolioValue.map((data)=> data.createdAt.split("T")[0]);
  let arr=Data[0].fundtransaction.map((data)=> data.Amount)
  arr.forEach((element,index)=>{
    if(index!==0)
    arr[index]=element+arr[index-1];
    else
    arr[index]=element
  })
   const data = {
    labels,
    datasets: [
      {
        label: 'Current Value',
        data: Data[0].portfolioValue.map((data)=> data.CurrentValue),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total added fund',
        data: arr.map((data)=> data),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        spanGaps:true
      },
    ],
  };
  return <Line options={options} data={data} height={1000}/>;
}
