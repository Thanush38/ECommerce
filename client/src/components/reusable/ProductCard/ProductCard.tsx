import React from 'react';
import styled from 'styled-components';
import './ProductCard.css';
import {TbZoomInArea} from "react-icons/tb";
import ImageViewer from "../ImageViewer/ImageViewer";

type ImageProps = {
    image: string;
    children?: React.ReactNode;
};
type ImageContainerProps = {
    image: string;
}

const ImageContainerWrapper: React.FC<ImageProps> = styled.div`

    cursor: pointer;
    position: relative;
    z-index: 5;
    width: 100%;
    height: 8rem;
    background: url(${(props: ImageProps) => props.image}) no-repeat center;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ease-in-out 0.3s;

`;

const ImageContainer: React.FC<ImageProps> = ({image, children}) => {
    return <ImageContainerWrapper image={image}>{children}</ImageContainerWrapper>;
};

type ProductCardProps = {
    image: string,
    title: string,
    sizes: {
        [key: string]: number
    },
    price: string,
    func?: () => void
    cartFunc?: () => void
};

type size = {
    size: {
        [key: string]: number
    };
}
const ProductCard = (props: ProductCardProps) => {
    const [price, setPrice] = React.useState<string>("Choose Size");
    const [priceStyle, setPriceStyle] = React.useState<string>("priceStyle");

    const priceClickHandler = (givenPrice: number) => {
        let stringNumber: string = givenPrice.toString();
        setPrice("$" + stringNumber);
        setPriceStyle("priceStyleActive");
    }
    const setPriceHandler = () => {
        setPrice("Select Size");
    }
    const getSizes = () => {
        let ret: JSX.Element[] = [];
        let i: number = 0;
        for (const size in props.sizes) {
            ret.push(
                <li className="item-list">
                    <button className="item-list-button" onClick={() => priceClickHandler(props.sizes[size])}>
                        {size}
                    </button>
                </li>
            );
            i++;
        }
        ;
        return ret;
    }




    return (
        <div className="card">

            <ImageContainer image={props.image}>
                <div className="cardImageContainer" onClick={props.func}>
                    <div className="imageZoomIcon">
                        <TbZoomInArea size={30} color="white"/>
                    </div>
                </div>
            </ImageContainer>


            <div className="title">
                <span>{props.title}</span>
            </div>
            <div className="size">
                <span>Sizes</span>
                <ul className="list-size">
                    {getSizes()}
                </ul>
            </div>
            <div className="action">
                <div className={priceStyle}>
                    <span className={"priceSpan"}>{price}</span>
                </div>
                <button className="CartBtn" onClick={props.cartFunc}>
  <span className="IconContainer">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="cart"><path
        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
                    <p className="text">Add to Cart</p>
                </button>
            </div>
        </div>

    );
};

export default ProductCard;


