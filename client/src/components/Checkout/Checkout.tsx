import React,{useState, useEffect} from 'react';
import './Checkout.css';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CheckoutSingleProduct from "./CheckoutSingleProduct/CheckoutSingleProduct";
import {useDispatch, useSelector} from "react-redux";
import {removeItem, setCart} from "../../store/Cart";
import Button from "../reusable/Button/Button";
import {apiPost} from "../../Api";
import {RootState} from "../../store/Store";
import {auth} from "../../firebase";

type pricing = {
    subtotal: number,
    tax: number,
    shipping: number,
    foundShipping: boolean,
    total: number
}
type orderDetails = {
    FullName: string,
    Email: string,
    PhoneNumber: string,
    CardNumber: string,
    CardHolder: string,
    Expires: string,
    CVC: string
}
const Checkout = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cartItem);
    const [currentCart, setCurrentCart] = useState<any>([]);
    const [pricing, setPricing] = useState<pricing>({
        subtotal: 0,
        tax: 0,
        shipping: 0,
        foundShipping: false,
        total: 0
    });
    const [Address, setAddress] = useState<string>('');
    const [City, setCity] = useState<string>('');
    const [PostalCode, setPostalCode] = useState<string>('');
    const [orderDetails, setOrderDetails] = useState<orderDetails>({
        FullName: '',
        Email: '',
        PhoneNumber: '',
        CardNumber: '',
        CardHolder: '',
        Expires: '',
        CVC: ''
    });

    // useEffect(() => {
    //     const fetchCart = () => {
    //         const cart = localStorage.getItem("cart");
    //         if (cart) {
    //             const parsedCart = JSON.parse(cart);
    //             dispatch(setCart(parsedCart));
    //             // setCurrentCart(parsedCart.items);
    //             console.log("parsedCart", parsedCart);
    //             calculateEverything(parsedCart.items)
    //         } else {
    //             // dispatch(setCart());
    //             setCurrentCart([]);
    //         }
    //     };
    //
    //     const handleStorageChange = (event: StorageEvent) => {
    //         if (event.key === "cart") {
    //             fetchCart();
    //         }
    //     };
    //
    //     window.addEventListener('storage', handleStorageChange);
    //
    //     fetchCart();
    //
    //
    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, [dispatch]);

    useEffect(() => {
        const fetchCart = () => {
            const cart = localStorage.getItem("cart");
            if (cart) {
                dispatch(setCart(JSON.parse(cart)));
                calculateEverything(JSON.parse(cart).items);
            } else {
                // dispatch(setCart([]));
            }
        };

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "cart") {
                fetchCart();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        fetchCart();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch]);

    useEffect(() => {

        setCurrentCart(cart.items);
    }, [cart]);

    const incrementQuantity = (id: string, size: string) => {
        let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        let index = cartData.items.findIndex((item: any) => (item.id === id && item.size === size));
        cartData.items[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cartData));
        // setCart(cartData);
        dispatch(setCart((cartData)));


    }

    const decrementQuantity = (id: string, size: string) => {
        let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        let index = cartData.items.findIndex((item: any) => (item.id === id && item.size === size));
        if(cartData.items[index].quantity) {
            if (cartData.items[index].quantity === 1) {
                cartData.items.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cartData));

                dispatch(setCart(cartData));
            } else {
                cartData.items[index].quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(cartData));
                setCart(cartData);
                dispatch(setCart((cartData)));
            }
        }
    }

    const deleteProduct = (id: string, size: string) => {
        let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        let index = cartData.items.findIndex((item: any) => (item.id === id && item.size === size));
        cartData.items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartData));
        dispatch(setCart((cartData)));
    }

    const calculateEverything = async (parsedCart: any) => {
        console.log("parsedCart", parsedCart)
        let total:number = getSubTotal(parsedCart)
        let tax:number = getTax(total);
        let shipping:number = await getShipping(pricing.foundShipping);
        let totalCost:number = total + tax + shipping;
        setPricing({
            ...pricing,
            subtotal: total,
            tax: tax,
            shipping: shipping,
            total: totalCost
        });
    }

    const getSubTotal = (parsedCart:any) => {
        let total:number = 0;
        parsedCart.forEach((item: any) => {
            console.log("item price", item.price)
            total += item.price * item.quantity;

        });
        return total;
    }



    const getTax = (subTotal:number) => {
        return subTotal * 0.13;

    }

    const getShipping = async (shippingFound:boolean) => {
        if(Address === '' || City === '' || PostalCode === '') {
            return 0;
        }
        const data = {
            address: Address,
            city: City,
            postalCode: PostalCode
        }

        const response = await apiPost('shipping', data);

        const responseData = await response.data;
        console.log("responseData", responseData)

        let shipping:number = responseData;
        return shipping;

    }

    const getTotal = (parsedCart:any) => {
        setPricing({
            ...pricing,
            total: pricing.subtotal + pricing.tax + pricing.shipping
        });
    }

    const foundShipping = () => {
        setPricing({
            ...pricing,
            foundShipping: true
        });
    calculateEverything(currentCart);

    }

    const handleOrderDetails = (e: any) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value
        });
    }

    const getUserId = async () => {
        const user = await auth.currentUser;
        if(user) {
            return user.uid;
        } else {
            return null;
        }
    }

    const submitOrder = async () => {
        const userId = await getUserId();
        const data = {
            Id: userId,
            Delivery: {
                Address: Address,
                City: City,
                PostalCode: PostalCode
            },
            OrderDetails: orderDetails,
            Cart: currentCart,
            pricing: pricing
        }

        let payload = JSON.stringify(data).replace(/"/g, '\\"');
        // let payload = JSON.stringify(data);
        console.log(payload);

        const response = await apiPost('api/BodyTypes/order', payload);
        const responseData = await response.data;
        console.log("responseData", responseData);


    }





    const getSingleProducts = currentCart?.length ? (
        currentCart.map((item: any) => (
            <div key={item.id}>
                <CheckoutSingleProduct
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    size={item.size}
                    quantity={item.quantity}
                    decrementQuantity={decrementQuantity}
                    incrementQuantity={incrementQuantity}
                    deleteProduct={deleteProduct}
                />
            </div>
        ))
    ) : (
        <div className={"EmptyCart"}><h3>Cart is Empty</h3>
            <Button text={"Browse Products"} onClick={()=>{window.location.href = "/products"}}/>
        </div>

    );

    const [selectedCard, setSelectedCard] = useState<string>('Visa');
    const [dropdownImage, setDropdownImage] = useState<string>('https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png');

    const handleCardSelection = (card: string) => {
        setSelectedCard(card);
        if(card==='Visa'){
            setDropdownImage('https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png');
        };
        if(card==='Mastercard'){
            setDropdownImage('https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png');
        };
        if(card==='Debit'){
            setDropdownImage('https://dl.dropboxusercontent.com/s/2k3z9z2bq5q1b3z/debit_logo%20%281%29.png');
        }
        if(card==='American Express'){
            setDropdownImage('https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png');
        };
    }







    return (
        <div>
            <NavBar active={"0"}/>

            <div className='checkoutContainer'>
                <div className='checkoutWindow'>
                    <div className='order-info'>
                        <div className='order-info-content'>
                            <h2>Order Summary</h2>
                            <div className='checkoutLine'></div>
                            <div className={"checkoutProducts"} >
                            {getSingleProducts}
                            </div>



                            <div className='checkoutTotal'>
          <span className='checkoutSpanLeft'>
            <div className='thin dense'>Subtotal</div>
            <div className='thin dense'>GST (19%)</div>
            <div className='thin dense'>Delivery</div>
            TOTAL
          </span>
                                <span className='checkoutSpanRight'>
            <div className='thin dense'>${pricing.subtotal}</div>
            <div className='thin dense'>${pricing.tax}</div>
            <div className='thin dense'>${pricing.shipping}</div>
            <div className='thin dense'>${pricing.total}</div>
          </span>
                            </div>
                        </div>
                    </div>
                    <div className='credit-info'>

                        <div className='credit-info-content'>
                            <div className={"AddressInfo"}>
                                <h2>Enter Shipping Address to Find Cost</h2>
                                <input className={"input-field"} placeholder={"Enter Address"} onChange={(e) => setAddress(e.target.value)}/>
                                <div className="flex flex-row gap-1.5">
                                    <input className={"input-field"} placeholder={"Enter City"} onChange={(e) => setCity(e.target.value)}/>
                                    <input className={"input-field"} placeholder={"Enter Postal Code"} onChange={(e) => setPostalCode(e.target.value)}/>
                                </div>
                                <button className={"FindCostBTN"} onClick={() =>calculateEverything(currentCart)}>Find Cost</button>

                            </div>
                            <div className={"chechkoutDetails"}>
                                <input className={"input-field"} placeholder={"Enter Full Name"} onChange={handleOrderDetails} name={"FullName"}/>
                                <input className={"input-field"} placeholder={"Enter Email"} onChange={handleOrderDetails} name={"Email"}/>
                                <input className={"input-field"} placeholder={"Enter Phone Number"} onChange={handleOrderDetails} name={"PhoneNumber"}/>
                            </div>
                            <table className='half-input-table'>
                                <tbody>
                                <tr>
                                    <td>Please select your card:</td>
                                    <td>
                                        <div className='dropdown' id='card-dropdown'>
                                            <div
                                                className="relative group rounded-lg w-64 bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]">
                                                <svg
                                                    y={0}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x={0}
                                                    width={100}
                                                    viewBox="0 0 100 100"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    height={100}
                                                    className="w-8 h-8 absolute right-0 -rotate-45 stroke-pink-300 top-1.5 group-hover:rotate-0 duration-300"
                                                >
                                                    <path
                                                        strokeWidth={4}
                                                        strokeLinejoin="round"
                                                        strokeLinecap="round"
                                                        fill="none"
                                                        d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                                                        className="svg-stroke-primary"
                                                    />
                                                </svg>
                                                <select
                                                    className="appearance-none hover:placeholder-shown:bg-emerald-500 relative text-pink-400 bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                                                    onChange={(e) => handleCardSelection(e.target.value)}
                                                >
                                                    <option onClick={() => handleCardSelection('Visa')}>Visa</option>
                                                    <option
                                                        onClick={() => handleCardSelection('Mastercard')}>Mastercard
                                                    </option>
                                                    <option
                                                        onClick={() => handleCardSelection('American Express')}>American
                                                        Express
                                                    </option>
                                                </select>
                                            </div>


                                            {/*<div*/}
                                            {/*    className='dropdown-btn'*/}
                                            {/*    id='current-card'*/}
                                            {/*    onClick={showDropdown}*/}
                                            {/*>*/}
                                            {/*    {selectedCard}*/}
                                            {/*</div>*/}
                                            {/*{dropdownOpen && (*/}
                                            {/*    <div className='dropdown-content'>*/}

                                            {/*        /!*<div*!/*/}
                                            {/*        /!*    className='dropdown-item'*!/*/}
                                            {/*        /!*    onClick={() => handleCardSelection('Visa')}*!/*/}
                                            {/*        /!*>*!/*/}
                                            {/*        /!*    Visa*!/*/}
                                            {/*        /!*</div>*!/*/}
                                            {/*        /!*<div*!/*/}
                                            {/*        /!*    className='dropdown-item'*!/*/}
                                            {/*        /!*    onClick={() => handleCardSelection('Mastercard')}*!/*/}
                                            {/*        /!*>*!/*/}
                                            {/*        /!*    Mastercard*!/*/}
                                            {/*        /!*</div>*!/*/}
                                            {/*        /!*<div*!/*/}
                                            {/*        /!*    className='dropdown-item'*!/*/}
                                            {/*        /!*    onClick={() => handleCardSelection('American Express')}*!/*/}
                                            {/*        /!*>*!/*/}
                                            {/*        /!*    American Express*!/*/}
                                            {/*        /!*</div>*!/*/}
                                            {/*    </div>*/}
                                            {/*)}*/}

                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <img
                                src={dropdownImage}
                                height='80'
                                className='credit-card-image'
                                id='credit-card-image'
                                alt='Credit Card'
                            />
                            Card Number
                            <input className='input-field' onChange={handleOrderDetails} name={"CardNumber"}/>
                            Card Holder
                            <input className='input-field' onChange={handleOrderDetails} name={"CardHolder"}/>
                            <table className='half-input-table'>
                                <tr>
                                    <td> Expires
                                        <input className='input-field' onChange={handleOrderDetails} name={"Expires"}/>
                                    </td>
                                    <td>CVC
                                        <input className='input-field' onChange={handleOrderDetails} name={"CVC"}/>
                                    </td>
                                </tr>
                            </table>
                            <button className='pay-btn' onClick={submitOrder}>Pay</button>

                        </div>

                    </div>
                </div>
            </div>
            <Footer/>

        </div>
    );
};

export default Checkout;
