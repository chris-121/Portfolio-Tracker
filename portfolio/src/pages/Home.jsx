import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import LTPortfolio from '../components/LTPortfolio';
import UpdatePrice from '../components/UpdatePrice';
import Settings from '../components/Settings';
import axios from 'axios';
import { getAllDetails } from '../utils/APIRoutes';

export default function Home() {
    const [focus, setFocus] = useState('home');
    const [data,setData]=useState();
    useEffect(() => {
        axios.get(getAllDetails).then((res)=>{
            setData(res.data)
            console.log(res.data);
        })
    }, [])
    function component(Data) {
        switch (focus) {
            case 'home':
                return <Dashboard  Data={Data}/>;
            case 'LT':
                return <LTPortfolio Data={Data}/>;
            case 'updatePrice':
                return <UpdatePrice Data={Data}/>;
            case 'Settings':
                return <Settings />
            default:
                return null;
        }
    }
    return (
        <Container>
            <Navbar focus={focus} setFocus={setFocus} />
            {
                data ? component(data) : ""
            }
        </Container>
    )
}
const Container = styled.div`
`