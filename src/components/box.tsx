import React from "react";
import Image, { StaticImageData } from "next/image";
interface BoxProps {
    imageSrc: string | StaticImageData,
    onClick: () => void;
}

const Box = (props : BoxProps) => {
    return (
        <>
            <div onClick={props.onClick} className="border border-solid border-white h-28 m-2 w-28 rounded-lg">
                {props.imageSrc && <Image src={props.imageSrc} alt="Icon" />}
            </div>
        </>
    )
}

export default Box;