import React, {useState} from 'react';
import './ImageSlider.css';
import { GrPrevious } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
type ImageProps = {
    images: string[];

}
const ImageSlider = (props: ImageProps) => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    // const images = [
    //     "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    //     "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    //     "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    // ];

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
