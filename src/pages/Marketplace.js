import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'

import address from '../address.json'
import fantomDiamondAbi from "../abis/FantomDiamond.json"
import marketplaceAbi from "../abis/Marketplace.json"
import { useEffect, useState } from 'react'

import NFTCard from '../components/NFTCard'

function getMarketplaceContract(abi, library) {
    return new Contract(address.marketplace, abi, library)
}

function getFantomDiamondContract(abi, library) {
    return new Contract(address.fantomDiamond, abi, library)
}

function getOffer(contract, tokenId) {
    return contract.ledger(tokenId)
}

async function getLedger(contract) {
    let promiseArray = []
    for (let i = 0; i < 500; i++) {
        promiseArray.push(getOffer(contract, i))
    }

    return await Promise.all(promiseArray)
}

function getOnSale(ledger) {
    let onSaleList = []
    ledger.forEach((element, i) => {
        const price = parseFloat(formatEther(element.price))
        if (price > 0) {
            onSaleList.push({
                tokenId: i,
                seller: element.seller,
                price: formatEther(element.price)
            })
        }
    })

    return onSaleList
}

function Marketplace(props) {
    const { library, account } = useWeb3React()
    const [fantomDiamondContract, setFantomDiamondContract] = useState()
    const [marketplaceContract, setMarketplaceContract] = useState()
    const [ledger, setLedger] = useState()
    const [onSaleList, setOnSaleList] = useState([])

    useEffect(async () => {
        const fdc = getFantomDiamondContract(fantomDiamondAbi, library)
        const mp = getMarketplaceContract(marketplaceAbi, library)

        setFantomDiamondContract(fdc)
        setMarketplaceContract(mp)

        const _ledger = await getLedger(mp)
        setLedger(_ledger)

        const onSale = getOnSale(_ledger)
        // console.log(_ledger)
        // console.log(onSale)
        setOnSaleList(onSale)
        // console.log(mp)

    }, [])

    return (
        <div>
            {
                onSaleList.map(e=>{
                    return <NFTCard contract={marketplaceContract} tokenId={e.tokenId} seller={e.seller} price={e.price}/>
                })
            }
        </div>
    )
}

export default Marketplace