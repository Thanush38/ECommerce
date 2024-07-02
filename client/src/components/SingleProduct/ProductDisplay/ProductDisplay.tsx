import React from 'react';
import './ProductDisplay.css';
import { Slide } from 'react-slideshow-image';
import ImageSlider from "./ImageSlider/ImageSlider";
import {useDispatch} from "react-redux";
import cart, {setCart} from "../../../store/Cart";
import {auth} from "../../../firebase";

type Size = {
    price: number;
    quantity: number;
    sizeId: number;
};
interface cartItem {
    id: string;
    items: smallProduct[];

}

interface smallProduct {
    id: number;
    name: string;
    price: string;
    size: string;
    quantity: number;
    image: string;
}
interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    sizes: { [key: string]: Size };
    keyWords: string[];
    description: string;
    images: string[];
    imageCode: string[];

}

const ProductDisplay = (props : Product) => {
    const [price, setPrice] = React.useState<string>("Select Size");
    const [size, setSize] = React.useState<string>("");
    const dispatch = useDispatch();


    const setPriceFunction = (size: string) => {
        setPrice("$" + props.sizes[size].price);
        setSize(size);
    }

    const getButtons = () => {
        let buttons = [];
        for (let key in props.sizes) {
            buttons.push(<div className={"productButtonContainer"} key={props.sizes[key].sizeId + "1"}><button className={"productButton"} onClick={() => setPriceFunction(key)}>{key}</button></div>);
        }
        return buttons;
    }

    const verifyIDs = (cartData: any, item:Product) => {
        let found = false;
        for (let i = 0; i < cartData.length; i++) {
                console.log(cartData[i].id, item.id, cartData[i].size)
                if (cartData[i].id === item.sizes[size].sizeId) {
                    found = true;
                    cartData[i].quantity += 1;
                    break;

            }
        }
        return found;

    }


    const addToCart = () => {
        if (!auth.currentUser) {
            alert("Please sign in to add to cart");
            return;
        }
        let userID = auth.currentUser.uid;

        let cart = localStorage.getItem("cart");
        if(size === "") {
            alert("Please select a size");
            return;
        }

        if(cart) {
            // console.log(cart)
            let cartData = JSON.parse(cart);

            if(cartData.id!==userID) {
                cartData = {
                    id: userID,
                    items: []
                }
                let found :boolean = verifyIDs(cartData, props);
                console.log("found", found)
                if (!found) {
                    let data = {
                        id: props.sizes[size].sizeId,
                        name: props.name,
                        price: price,
                        size: size,
                        quantity: 1,
                        image: props.image
                    }
                    console.log("cart before", cartData.items)
                    cartData.items.push(data);
                    console.log("cartData", cartData.items)
                    dispatch(setCart((cartData)))
                }
                localStorage.setItem("cart", JSON.stringify(cartData));
            }else {
                let cartData:cartItem = JSON.parse(cart);
                let data = {
                    id: props.sizes[size].sizeId,
                    name: props.name,
                    price: price,
                    size: size,
                    quantity: 1,
                    image: props.image
                }
                cartData.items.push(data);

                localStorage.setItem("cart", JSON.stringify(cartData));
                dispatch(setCart((cartData)))
            }
        }

    }
    return (
        <div>
            <div className="singleProductContent">
                <div className={"productImageContainer"} key={props.id}>
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
                                      <h2 className={"priceP"}>Price: {price}</h2>
                                  </div>
                                  <p className={"descriptionP"}>{props.description}</p>
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
