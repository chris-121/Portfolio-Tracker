import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Funds from './pages/Funds';
import SetTarget from './pages/SetTarget'
import AddAndSellScrip from './pages/AddAndSellScrip';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/setTarget" element={<SetTarget />} />
        <Route path="/AddScrip" element={<AddAndSellScrip Operation={'ADD'}/>} />
        <Route path="/SellScrip" element={<AddAndSellScrip Operation={'SELL'}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
