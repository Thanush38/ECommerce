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
};

type size = {
    size: {
        [key: string]: number
    };
}
const ProductCard = (props: ProductCardProps) => {
    const [price, setPrice] = React.useState<string>("Select Size");

    const priceClickHandler = (givenPrice: number) => {
        let stringNumber: string = givenPrice.toString();
        setPrice("$" + stringNumber);
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
                <div className="price">
                    <span>{price}</span>
                </div>
                <button className="cart-button">
                    <svg
                        className="cart-icon"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                    <span>Add to cart</span>
                </button>
            </div>
        </div>

    );
};

export default ProductCard;


