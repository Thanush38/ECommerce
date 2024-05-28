import React from 'react';
import './CheckoutSingleProduct.css';
import {useDispatch} from "react-redux";

type checkoutProps = {
    id: string,
    name: string,
    image: string,
    price: number,
    size: string,
    quantity: number
    incrementQuantity: (id: string, size: string) => void,
    decrementQuantity: (id: string, size: string) => void,
    deleteProduct: (id: string, size: string) => void

}

const CheckoutSingleProduct = (props: checkoutProps) => {
    const dispatch = useDispatch();

    const incrementQuantity = () => {
        props.incrementQuantity(props.id, props.size);
    }

    const decrementQuantity = () => {
        props.decrementQuantity(props.id, props.size);
    }

    const deleteProduct = () => {
        props.deleteProduct(props.id, props.size);
    }


    return (
        <div>
            <div className="checkout-single-product">
                {/*<img src={props.image} alt="product" className="checkout-single-product-image"/>*/}
                <div className={"checkoutImageContainer"}>
                    <img src={props.image} alt="product" className="checkout-single-product-image"/>
                </div>
                <div className="checkout-single-product-info">
                    <div className={"checkoutProductTitle"}>
                    <h2>{props.name}</h2>
                    <h3>Size: {props.size}</h3>
                        </div>
                    <div className={"checkoutProductPrice"}>
                        <div className={"checkoutProductPriceBTN"}>
                            <button className={"CheckoutProductIncrement"} onClick={decrementQuantity}>-</button>
                            <input type="number" value={props.quantity} readOnly className={"CheckoutProductInput"}/>
                            <button className={"CheckoutProductIncrement"} onClick={incrementQuantity} >+</button>
                        </div>
                    <h3>Price: ${props.price}</h3>
                    </div>
                    <div className={"checkoutProductDelete"}>


                        <button className="checkoutNoselect" onClick={deleteProduct}><span className="checkoutDeleteText">Delete</span><span className="checkoutDeleteIcon"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                            d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckoutSingleProduct;
