import React, {useEffect, useState} from 'react';
import './ProductPage.css';
import NavBar from "../NavBar/NavBar.tsx";
import ProductCard from "../reusable/ProductCard/ProductCard.tsx";

import Footer from "../Footer/Footer.tsx";
const ProductPage = () => {

    const [products, setProducts] = useState(null);

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
    }, []);
    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/server-1.0-SNAPSHOT/api/contents/products");
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.log(error);
        }
    };
    const productss = products;

    const getHTML = products?.map((product) => {

        return <div className={"singleProducts"}><ProductCard title={product.name} image={product.image} price={product.price} sizes={product.sizes} /></div>;
    });

    return (
        <div>
            <NavBar active="products"/>
                <div className="productPage">
                    {getHTML}
                </div>
            <Footer />
        </div>
    );
};


export default ProductPage;