
import { useWeb3React } from '@web3-react/core'

function bid(contract, tokenId, price){
    contract.bid(tokenId,{
        value: price
    })
}

function NFTCard({contract, tokenId, seller, price}){
    const { library, account } = useWeb3React()
    return (
        <div>
            <div>{tokenId}</div>
            <div>{seller}</div>
            <div>{price}</div>
            <button onClick={()=>{
                bid(contract, tokenId)
            }}>Buy</button>
        </div>
    )
}

export default NFTCard