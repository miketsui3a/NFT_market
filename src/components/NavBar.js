import { useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import styled from 'styled-components';

import {
    Link
} from "react-router-dom";

const injected = new InjectedConnector({ supportedChainIds: [4002, 250] })

const StyledNavBarDiv = styled.div`
background: black;
float: left;
height: 100vh;
width: 100px;
`

const StyledNavButton = styled.button`
width:100%;
`

function NavBar(props) {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React()

    return (
        <StyledNavBarDiv>
            <button onClick={() => { account ? deactivate() : activate(injected) }}>{
                account ? account.slice(0, 6) + "..." : "Connect"
            }</button>
            <StyledNavButton><Link to="/collection">Collections</Link></StyledNavButton>
            <StyledNavButton><Link to="/marketplace">marketplace</Link></StyledNavButton>
            <StyledNavButton><Link to="/marketplace">my offer</Link></StyledNavButton>
        </StyledNavBarDiv>
    )
}

export default NavBar