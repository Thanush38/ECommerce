import React from 'react';
import './ProductDisplay.css';
import { Slide } from 'react-slideshow-image';
import ImageSlider from "./ImageSlider/ImageSlider";
import {useDispatch} from "react-redux";

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    sizes: {[key: string]: number};
    keyWords: string[];
    description: string;
    images: string[];
    imageCode: string[];

}

const ProductDisplay = (props : Product) => {
    const [imageString, setImageString] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("Select Size");
    const [size, setSize] = React.useState<string>("");
    const dispatch = useDispatch();


    const setPriceFunction = (size: string) => {
        setPrice("$" + props.sizes[size]);
        setSize(size);
    }

    const getButtons = () => {
        let buttons = [];
        for (let key in props.sizes) {
            buttons.push(<div className={"productButtonContainer"}><button className={"productButton"} onClick={() => setPriceFunction(key)}>{key}</button></div>);
        }
        return buttons;
    }


    const addToCart = () => {
        console.log("Added to Cart");
        let cart = localStorage.getItem("cart");
        if(size === "") {
            alert("Please select a size");
            return;
        }

        if(cart) {
            let cartData = JSON.parse(cart);
            let found = false;
            for (let i = 0; i < cartData.length; i++) {
                if (cartData[i].id === props.id && cartData[i].size === size) {
                    cartData[i].quantity += 1;
                    found = true;
                    dispatch({type: "ADD_TO_CART", payload: cartData});
                    break;
                }
            }
            if (!found) {
                let data = {
                    id: props.id,
                    name: props.name,
                    price: price,
                    size: size,
                    quantity: 1
                }
                cartData.push(data);
                dispatch({type: "ADD_TO_CART", payload: cartData})
            }
            localStorage.setItem("cart", JSON.stringify(cartData));
        }else {
            let data = {
                id: props.id,
                name: props.name,
                price: price,
                size: size,
                quantity: 1
            }
            localStorage.setItem("cart", "[" + JSON.stringify(data) + "]");
            dispatch({type: "ADD_TO_CART", payload: [data]});
        }

    }
    return (
        <div>
            <div className="singleProductContent">
                <div className={"productImageContainer"}>
                    <ImageSlider images={props.imageCode}/>
                    {/*{getImage()}*/}
                </div>
                              <div className={"productInfo"}>
                                  <h1>{props.name}</h1>

                                  <div className={"productSizes"}>
                                      <h3>Sizes:</h3>
                                      <div className={"productButtons"}>
                                          {getButtons()}
                                      </div>
                                      <h2>Price: {price}</h2>
                                  </div>
                                  <p>{props.description}</p>
                                  <button className="CartBtn" onClick={addToCart}>
                <span className="IconContainer">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="cart"><path
        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
                        <p className="text">Add to Cart</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
