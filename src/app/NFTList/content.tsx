"use client"
import React, { Fragment, useEffect, useState } from 'react'
import Abi from "@/../GNFT/abi.json"
import Address from "@/../GNFT/address.json"
import GameContractAddress from "@/../Game/Address.json";
import GameABI from "@/../Game/ABI.json";
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useNotification } from 'web3uikit'
import { ethers } from 'ethers';

interface tokenRequirements {
    FireReq: string;
    EarthReq: string;
    WaterReq: string;
    WindReq: string;
}

interface TokenData {
    tokenId: object;
    tokenUri: string;
    tokenFunctionality: string;
    isLocked: boolean;
    requirements: tokenRequirements;
    canBeSwaped: boolean;
}

const NFTListContent = () => {
    const [data, setData] = useState<Array<TokenData>>([])
    const { Moralis } = useMoralis();
    const dispatch = useNotification();
    const handleSuccess = async (tx: any) => {
        await tx.wait(1);
        handleNewNotification(tx);
    }




    const handleNewNotification = (tx: any) => {
        dispatch({
            type: "info",
            message: "Transaction compleate!",
            title: "Tx notification",
            position: "topR",
        })
    }

    useEffect(() => {
        enableWeb3().then(() => {
            console.log('This is the address', Address["5"][0])
            getGameTokens({
                onSuccess: (res: unknown) => {
                    getTokenData({
                        onSuccess: res => {
                            var db = JSON.stringify(res);
                            const response: TokenData = res as TokenData;
                            console.log(response.tokenId.toString())
                            setData([...data, response])
                        },
                        onError: err => {
                            console.log(err)
                        }
                    })
                },
                onError: (err) => {
                    console.log('This error', err.stack)
                }
            })
        })
    }, [])

    const enableWeb3 = async () => {
        const web3 = await Moralis.enableWeb3()
    }

    

    const { runContractFunction: getTokenData } = useWeb3Contract({
        abi: Abi,
        contractAddress: Address["5"][0],
        functionName: "getTokenData",
        params: {
            tokenId: '0'
        },
    });
   
    const { runContractFunction: getGameTokens } = useWeb3Contract({
        abi: GameABI,
        contractAddress: GameContractAddress["5"][0],
        functionName: "getGameTokens",
        params: {
            _name: `'Memory Game'`
        },
    });


    return (
        <div className='flex'>
            {data.filter(x => x.canBeSwaped)
            .map(item => 
            <NFTDetails key={item.tokenId.toString()}
                        tokenFunctionality={item.tokenFunctionality}
                        tokenUri={item.tokenUri} />
                        )}
        </div>
    )
}

const NFTDetails = ({ tokenFunctionality, tokenUri }: TokenData) => {

    const handleSuccess = async (tx: any) => {
        await tx.wait(1);
        handleNewNotification(tx);
    }

    const dispatch = useNotification();



    const handleNewNotification = (tx: any) => {
        dispatch({
            type: "info",
            message: "Transaction compleate!",
            title: "Tx notification",
            position: "topR",
        })
    }

    const mintNFT = async () => {
        await swapTokens({
            onSuccess: handleSuccess,
            onError: err => console.log(err)
        });
    }
    const { runContractFunction: swapTokens } = useWeb3Contract({
        abi: Abi,
        contractAddress: Address["5"][0],
        functionName: "swapTokens",
        params: {
            basicTokenIds: ['0'],
            tokenToSwapForId: '0'
        }
    });

    return (
        <div>
            <div className='border border-solid border-red-600 h-64 w-56 m-2 p-2'>
                <div className='border flex justify-center items-center border-solid border-red-600 h-36 w-52'>
                    {tokenUri}
                </div>
                <div className='pl-1 pt-1'>
                    <h1>Token Functionality</h1>
                    {tokenFunctionality}
                </div>
            </div>
            <div className='w-56 flex justify-center'>
                <button onClick={mintNFT} className='rounded-lg text-white bg-blue-600 w-28 text-lg font-bold'>Mint</button>
            </div>
        </div>
    )
}


export default NFTListContent;