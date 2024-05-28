import React, {useState, useEffect} from 'react';
import './LoggedShow.css';
import {connect} from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/Store';
import { setCart, addItem, removeItem, clearCart } from '../../../../store/Cart';
import {useNavigate} from "react-router-dom";

type LoggedShowProps = {
    email: string;
    logOut: () => void;
    image: string;
}
interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    sizes: {[key: string]: number};
    keyWords: string[];

}
const LoggedShow = (props: LoggedShowProps) => {
    const[currentCart, setCurrentCart] = useState<JSON[]>([]);
    const [cartNumber, setCartNumber] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        const fetchCart = () => {
            const cart = localStorage.getItem("cart");
            if (cart) {
                dispatch(setCart(JSON.parse(cart)));
            } else {
                dispatch(setCart([]));
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
    }, [dispatch]);

    // const handleAddItem = (item: Product) => {
    //     dispatch(addItem(item));
    //     localStorage.setItem('cart', JSON.stringify([...cart, item]));
    // };

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem(id));
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        localStorage.removeItem('cart');
    };



    useEffect(() => {
        const handleStorage = () => {
            const cart = localStorage.getItem("cart");
            let count = 0;
            if (cart) {
                const parsedCart = JSON.parse(cart);
                setCurrentCart(parsedCart);

                parsedCart.forEach((item: any) => {
                    count += item.quantity;
                });
                setCartNumber(count);
            } else {
                setCurrentCart([]);
                setCartNumber(0);
            }
        };

        window.addEventListener('storage', handleStorage);
        handleStorage(); // Fetch cart data initially when component mounts

        return () => {
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    const handleCheckout = () => {
        navigate('/checkout');
    }




    const getImagePicture = () => {
        if (props.image) {
            return <img src={props.image} alt="profile" className={"profileImage"} height={30} width={30} />
        }
        else {
            return (
                <svg className="user-img" viewBox="0 0 24 24">
                    <path
                        d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z">

                    </path>
                </svg>

            )
        }
    }
    return (
        <div>
            <button id="btn-message" className="button-message">
                <div className="content-avatar">
                <div className="status-user"></div>
                    <div className="avatar">
                        {getImagePicture()}

                    </div>
                </div>
                <div className="notice-content">
                    <div className="username">{props.email}</div>
                    <div className="lable-message">Thanush<span className="number-message">{cartNumber}</span></div>
                    <div className={"noticeLength"}>
                    <div className="user-id" onClick={props.logOut}>Log Out</div>
                    <div className="user-id"onClick={handleCheckout}>Checkout</div>
                    </div>
                </div>
            </button>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(LoggedShow);

