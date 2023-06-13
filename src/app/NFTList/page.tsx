"use client"
import React from "react";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import NFTListContent from "./content";
const NFTList = () => {

    return (
        <MoralisProvider appId={'001'} serverUrl={'http://localhost:1337/'} initializeOnMount={true}>
            <NotificationProvider>
                <NFTListContent />
            </NotificationProvider>
        </MoralisProvider>

    )
}


export default NFTList;