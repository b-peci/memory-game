"use client"
import Image, { StaticImageData } from 'next/image'
import Box from '@/components/box'
import Icon1 from "../../public/Icon-1.png"
import Icon2 from "../../public/Icon-2.png"
import Icon3 from "../../public/Icon-3.png"
import Icon4 from "../../public/Icon-4.png"
import Icon5 from "../../public/Icon-5.png"
import Icon6 from "../../public/Icon-6.png"
import Icon7 from "../../public/Icon-7.png"
import Icon8 from "../../public/Icon-8.png"
import { useState, useEffect, useRef } from 'react'
import { MoralisProvider, useMoralis, useWeb3Contract } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Abi from "@/../GNFT/abi.json"
import Address from "@/../GNFT/address.json"

export default function Home() {
  

  return (
    <MoralisProvider appId={'001'} serverUrl={'http://localhost:1337/'} initializeOnMount={true}>
            <NotificationProvider>
                <Content />
            </NotificationProvider>
        </MoralisProvider>
  )
}


const Content = () => {

  const [timer, setTimer] = useState(30);
  const [images, setImages] = useState<Array<StaticImageData>>([]);
  const [indexesToShowImage, setIndexesToShowImages] = useState<Array<number>>([]);
  const [matchedImagesCount, setMatchedImagesCount] = useState<number>(0);
  const [tokenId, setTokenId] = useState('');
  const { Moralis } = useMoralis();
  useEffect(() => {
    if (timer == 0) {
      if(matchedImagesCount !== 8) {
        alert('Wohoo, you lost loser!')
      }
      return;
    }
    const interval = setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  

  useEffect(() => {
    Moralis.enableWeb3().then(async res => {
      await getUserTokens({onSuccess: async (res : any) => {
        console.log(res);
        for(let i =0 ; i < res.length; i++) {
          setTokenId(res[0].toString())
            await getTokenData({
              onSuccess: (res : any) => {
                const response = confirm('You have a token with the functionality '
                + res.tokenFunctionality + '\n Do you want to use it?')
                if(response) {
                  setTimer(timer + 30);
                }
              },
              onError: err => console.log(err)
            })
        }
      }})
    })
    setImages(shuffle([Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8, Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8]))
  }, [])

  const { runContractFunction: getUserTokens } = useWeb3Contract({
    abi: Abi,
    contractAddress: Address["5"][0],
    functionName: "getHolderTokenIds",
});

const { runContractFunction: getTokenData } = useWeb3Contract({
  abi: Abi,
  contractAddress: Address["5"][0],
  functionName: "getTokenData",
  params: {
    tokenId: 0
  }
});



  const shuffle = (array: Array<any>): Array<any> => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  const [isTimeoutExecuting, setIsTimeoutExecuting] = useState(false);
  
  const onClickEvent = (index: number) => {
    if(isTimeoutExecuting || timer === 0) return;
    const indexes = [...indexesToShowImage, index];
    if(indexes.length % 2 === 1) {
      setIndexesToShowImages([...indexesToShowImage, index])
    }
    else {
      setIndexesToShowImages([...indexesToShowImage, index])
      const indexes = [...indexesToShowImage, index];
      
      setTimeout(() => {
        let  hasGoneInsideIf = false;
        setIsTimeoutExecuting(true);
        for(let i = 0; i < indexes.length - 1; i++) {
            if(images[indexes[indexes.length - 1]].src === images[indexes[i]].src) {
              hasGoneInsideIf = true;
              setMatchedImagesCount(matchedImagesCount + 1);
            }
        }
        console.log(matchedImagesCount)
        if(matchedImagesCount + 1 === images.length / 2) {
          alert('You have won!!!!!')
        }
        if(!hasGoneInsideIf) {
          setIndexesToShowImages(indexesToShowImage.slice(0, -1))
        }
        setIsTimeoutExecuting(false);
      }, 1000)
    }
  }

  return (
    <div className='flex justify-center h-[100vh]'>
    <div className=' flex flex-col p-3 border w-[42vw] border-solid self-center rounded-xl border-white h-[62vh]'>
      <div className='flex'>
        <Box imageSrc={indexesToShowImage?.some(x => x === 0) ? images[0] : ''} onClick={() => onClickEvent(0)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 1) ? images[1] : ''} onClick={() => onClickEvent(1)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 2) ? images[2] : ''} onClick={() => onClickEvent(2)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 3) ? images[3] : ''} onClick={() => onClickEvent(3)} />
      </div>
      <div className='flex'>
        <Box imageSrc={indexesToShowImage?.some(x => x === 4) ? images[4] : ''} onClick={() => onClickEvent(4)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 5) ? images[5] : ''} onClick={() => onClickEvent(5)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 6) ? images[6] : ''} onClick={() => onClickEvent(6)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 7) ? images[7] : ''} onClick={() => onClickEvent(7)} />
      </div>
      <div className='flex'>
        <Box imageSrc={indexesToShowImage?.some(x => x === 8) ? images[8] : ''} onClick={() => onClickEvent(8)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 9) ? images[9] : ''} onClick={() => onClickEvent(9)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 10) ? images[10] : ''} onClick={() => onClickEvent(10)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 11) ? images[11] : ''} onClick={() => onClickEvent(11)} />
      </div>
      <div className='flex'>
        <Box imageSrc={indexesToShowImage?.some(x => x === 12) ? images[12] : ''} onClick={() => onClickEvent(12)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 13) ? images[13] : ''} onClick={() => onClickEvent(13)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 14) ? images[14] : ''} onClick={() => onClickEvent(14)} />
        <Box imageSrc={indexesToShowImage?.some(x => x === 15) ? images[15] : ''} onClick={() => onClickEvent(15)} />
      </div>

      <div className='flex  p-3 justify-around border-solid border-white border'>
        <p className='text-xl'>Time: {timer}s</p>
        <button className='rounded-lg text-white bg-blue-600 w-28 text-lg font-bold'>Retry</button>
      </div>
    </div>
  </div>
  )
}
