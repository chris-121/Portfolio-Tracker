import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import FundTransaction from '../components/FundTransaction';

export default function Funds() {
  return (
    <Container>
        <Navbar />
        <FundTransaction/>
    </Container>
  )
}
const Container = styled.div``