import React, {useState} from 'react';
import './ImageSlider.css';
import { GrPrevious } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
type ImageProps = {
    images: string[];

}
const ImageSlider = (props: ImageProps) => {
    const [currentImage, setCurrentImage] = useState<number>(0);


    const nextImage = () => {
        if (currentImage === props.images.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(currentImage + 1);
        }
    }
    const previousImage = () => {
        if (currentImage === 0) {
            setCurrentImage(props.images.length - 1);
        } else {
            setCurrentImage(currentImage - 1);
        }
    }
    return (
        <div>
            <div className={"SliderImageContainer"}>
                <button className={"SliderButton"} onClick={previousImage}><GrPrevious /></button>
                <img src={props.images[currentImage]} alt="image1" className={"SliderImage"} />
                <button className={"SliderButton"} onClick={nextImage}><IoIosArrowForward /></button>
            </div>
        </div>
    );
};

export default ImageSlider;
