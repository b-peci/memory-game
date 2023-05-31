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
import { useState, useEffect } from 'react'

export default function Home() {
  const [timer, setTimer] = useState(30);
  const [images, setImages] = useState([Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8]);
  const [imageIndexes, setImageIndexes] = useState<Array<number>>([])
  const [selectedImages, setSelectedImages] = useState<Array<StaticImageData>>([])
  const [matchedImages, setMatchedImages] = useState<Array<StaticImageData>>([]);
  const imagesTwice: Map<number, number> = new Map<number, number>;
  let availableIndexes = [0, 1, 2, 3, 4, 5, 6, 7]
  useEffect(() => {
    if (timer == 0) return;
    const interval = setInterval(() => setTimer(timer - 1), 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setImages(shuffle([Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8]))
    setImageIndexes(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]))
    setTimeout(() => {
      console.log(imageIndexes)
    }, 4_000)
    // const array : Array<number> = [];
    // for(let i =0; i < 16; i++) {
    //   const index = choseImageSrc();
    //   array.push(index);
    // }
    // console.log(array)
    // setImageIndexes(array);
  }, [])

  const hasBeenSelectedOrMatched = (image : StaticImageData): boolean => {
    return selectedImages.some(x => x.src === image.src)  || matchedImages.some(x => x.src === image.src);
  }

  const selectImage = (image: StaticImageData) => {
    debugger;
    setSelectedImages([...selectedImages, image])
    if(selectedImages.length == 2) {
      if(selectedImages[0] == image) {
        setMatchedImages([...matchedImages, image]);
      }
      setTimeout(() => {
        setSelectedImages([]);
      }, 3000)
    }
  }

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

  return (
    <div className='flex justify-center h-[100vh]'>
      <div className=' flex flex-col p-3 border w-[42vw] border-solid self-center rounded-xl border-white h-[62vh]'>
        <div className='flex'>
          <Box onClick={() => {
            selectImage(images[imageIndexes[1]])
          }}
           imageSrc={
            hasBeenSelectedOrMatched(images[imageIndexes[1]]) ? images[imageIndexes[1]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[4]])
          }}
           imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[4]]) ?  images[imageIndexes[4]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[5]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[5]]) ?  images[imageIndexes[5]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[3]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[3]]) ?  images[imageIndexes[3]] : ''} />
        </div>
        <div className='flex'>
          <Box onClick={() => {
            selectImage(images[imageIndexes[2]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[2]]) ?  images[imageIndexes[2]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[0]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[0]]) ?  images[imageIndexes[0]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[6]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[6]]) ?  images[imageIndexes[6]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[7]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[7]]) ?  images[imageIndexes[7]] : ''} />
        </div>
        <div className='flex'>
          <Box onClick={() => {
            selectImage(images[imageIndexes[8]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[8]]) ?  images[imageIndexes[8]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[9]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[9]]) ?  images[imageIndexes[9]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[10]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[10]]) ?  images[imageIndexes[10]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[11]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[11]]) ?  images[imageIndexes[11]] : ''} />
        </div>
        <div className='flex'>
          <Box onClick={() => {
            selectImage(images[imageIndexes[12]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[12]]) ?  images[imageIndexes[12]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[13]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[13]]) ?  images[imageIndexes[13]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[14]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[14]]) ?  images[imageIndexes[14]] : ''} />
          <Box onClick={() => {
            selectImage(images[imageIndexes[15]])
          }} imageSrc={hasBeenSelectedOrMatched(images[imageIndexes[15]]) ?  images[imageIndexes[15]] : ''} />
        </div>
        <div className='flex  p-3 justify-around border-solid border-white border'>
          <p className='text-xl'>Time: {timer}s</p>
          <button className='rounded-lg text-white bg-blue-600 w-28 text-lg font-bold'>Retry</button>
        </div>
      </div>
    </div>
  )
}
