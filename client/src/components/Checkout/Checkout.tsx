import React,{useState, useEffect} from 'react';
import './Checkout.css';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CheckoutSingleProduct from "./CheckoutSingleProduct/CheckoutSingleProduct";
import {useDispatch} from "react-redux";
const Checkout = () => {
    const dispatch = useDispatch();
    const [cart, setCart] = useState<JSON[]>([]);

    useEffect(() => {
        const fetchCart = () => {
            const cart = localStorage.getItem("cart");
            if (cart) {
                let data = JSON.parse(cart);
                setCart(JSON.parse(cart));
                console.log("quantity", data[0].quantity);
            } else {
                setCart([]);
            }
        };

        fetchCart();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "cart") {
                fetchCart();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const incrementQuantity = (id: string, size: string) => {
        let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        let index = cartData.findIndex((item: any) => (item.id === id && item.size === size));
        cartData[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cartData));
        setCart(cartData);

        dispatch({type: "ADD_TO_CART", payload: cartData[index]});

    }

    const decrementQuantity = (id: string, size: string) => {
        let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        let index = cartData.findIndex((item: any) => (item.id === id && item.size === size));
        if (cartData[index].quantity === 1) {
            cartData.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartData));
            setCart(cartData);
            dispatch({type: "REMOVE_FROM_CART", payload: id});
        } else {
            cartData[index].quantity -= 1;
            localStorage.setItem("cart", JSON.stringify(cartData));
            setCart(cartData);
            dispatch({type: "ADD_TO_CART", payload: cartData[index]});
        }
    }

    const deleteProduct = (id: string, size: string) => {
        let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        let index = cartData.findIndex((item: any) => (item.id === id && item.size === size));
        cartData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartData));
        setCart(cartData);
        dispatch({type: "REMOVE_FROM_CART", payload: id});
    }

    const getSubTotal = () => {
        let total = 0;
        cart.forEach((item: any) => {
            total += item.price * item.quantity;

        });
        return total;
    }



    const getTax = () => {
        return getSubTotal() * 0.13;
    }

    const getShipping = () => {
        return 10;
    }

    const getTotal = () => {
        return getSubTotal() + getTax() + getShipping();
    }

    const getSingleProducts = cart?.map((item: any) => {
        return <CheckoutSingleProduct id={item.id} name={item.name} image={item.image} price={item.price} size={item.size} quantity={item.quantity} decrementQuantity={decrementQuantity} incrementQuantity={incrementQuantity} deleteProduct={deleteProduct} />
    });




    return (
        <div>
            <NavBar active={"0"} />
            <div className="checkout">
                <div className="checkoutContainer">
                    <h1>Checkout</h1>
                    <div className={"checkoutWrapper"}>
                        <div className={"checkoutDetails"}>
                            <h3>Order details</h3>
                            {getSingleProducts}
                        </div>
                        <div className={"checkoutSummary"}>
                            <h3>Summary</h3>
                            <div className={"checkoutSummaryContainer"}>
                                <div className={"checkoutSummaryDetails"}>
                                    <p>Subtotal: {getSubTotal()}</p>
                                    <p>Tax: {getTax()}</p>
                                    <p>Shipping: {getShipping()}</p>
                                    <p>Total: {getTotal()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />

        </div>
    );
};

export default Checkout;
