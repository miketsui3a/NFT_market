import { useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const injected = new InjectedConnector({ supportedChainIds: [4002, 250] })

function NavBar(props) {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React()

    return (
        <button onClick={() => { account ? deactivate() : activate(injected) }}>{
            account ? account.slice(0, 6) + "..." : "Connect"
        }</button>
    )
}

export default NavBar