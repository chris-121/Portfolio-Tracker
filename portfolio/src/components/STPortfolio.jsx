import React from 'react'
import styled from 'styled-components'

export default function STPortfolio() {
  return (
    <Container>
        <div>STPortfolio</div>
    </Container>
  )
}
const colors = {
  orange: '#f43a09',
  blue: '#e8f9fd',
  green: '#59ce8f',
}
const Container = styled.div`
height:100vh;
width:100%;
overflow:hidden;
background-color: ${colors.blue};
display:flex;
flex-direction:column;
align-items:center;
`