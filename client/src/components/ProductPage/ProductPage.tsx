import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './ProductPage.css';
import NavBar from "../NavBar/NavBar";
import ProductCard from "../reusable/ProductCard/ProductCard";
import Footer from "../Footer/Footer";
import ImageViewer from "../reusable/ImageViewer/ImageViewer";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setCart, addItem, removeItem, clearCart } from '../../store/Cart';
interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    sizes: {[key: string]: number};
    keyWords: string[];

}
const ProductPage = () => {

    const [products, setProducts] = useState<Product[] | null>(null);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    let {search} = useParams();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);

    // const saveProduct = async (product: Product) => {
    //     let currentCart = localStorage.getItem("cart");
    //     if (currentCart) {
    //         let cart = JSON.parse(currentCart);
    //         cart.push(product);
    //         console.log(cart);
    //         localStorage.setItem("cart", JSON.stringify(cart));
    //         return;
    //     }else {
    //         localStorage.setItem("cart", "[" + JSON.stringify(product) + "]");
    //     }
    //     window.dispatchEvent(new Event('storage'))
    // }

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

    const handleAddItem = (item: Product) => {
        dispatch(addItem(item));
        localStorage.setItem('cart', JSON.stringify([...cart, item]));
    };

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
        const fetchProducts = async () => {
            try {
                const productsHTML = await getProducts();
                setProducts(productsHTML);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [search]);
    const getProducts = async () => {
        try {

            console.log(search);
            let url = "";
            if(search){
                url = `http://localhost:8080/server-1.0-SNAPSHOT/api/contents/products/${search}`
            }else{
                url = "http://localhost:8080/server-1.0-SNAPSHOT/api/contents/products";
            }
            const response:Response = await fetch(url);
            const data = await response.json();
            console.log(data)
            return data.items;
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageClick = (imageLink:string) => {
        setShowImage(true);
        setImage(imageLink)
    }

    const handleImageClose = () => {
        setShowImage(false);
    }


    const getHTML = products?.map((product: Product) => {

        return <div className={"singleProducts"}><ProductCard key={product.id} title={product.name} image={product.image} price={product.price} sizes={product.sizes} func={()=>handleImageClick(product.image)} cartFunc={()=>handleAddItem(product)}/></div>;
    });

    return (
        <div>
            <NavBar active="products"/>
                <div className="productPage" >

                    {showImage && <ImageViewer image={image} func={handleImageClose}/>}
                    {getHTML}
                </div>
            <Footer />
        </div>
    );
};


export default ProductPage;