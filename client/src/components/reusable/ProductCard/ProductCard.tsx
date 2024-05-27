import React from 'react';
import styled from 'styled-components';
import './ProductCard.css';
import {TbZoomInArea} from "react-icons/tb";
import ImageViewer from "../ImageViewer/ImageViewer";
import {useNavigate} from "react-router-dom";

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
    background: url(${(props: ImageProps) => props.image}) no-repeat center;
    background-size: contain;
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

    const priceClickHandler = (givenPrice: number) => {
        let stringNumber: string = givenPrice.toString();
        setPrice("Price: $" + stringNumber);
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

    const navigate = useNavigate();
    //
    const handleProductClick = () => {
        console.log("Product Clicked")
        navigate("/product");
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
                <span>Available Sizes</span>
                <ul className="list-size">
                    {getSizes()}
                </ul>
            </div>
            <div className="action">
                <div data-tooltip={price} className="cardButton">
                    <div className="card-button-wrapper" onClick={handleProductClick}>
                        <div className="text" >Buy Now</div>
                        <span className="icon">
      <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16"
           xmlns="http://www.w3.org/2000/svg">
  <path
      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
</svg>
    </span>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default ProductCard;


