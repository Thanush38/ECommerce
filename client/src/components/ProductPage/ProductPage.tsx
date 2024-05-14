import React, {useEffect, useState} from 'react';
import './ProductPage.css';
import NavBar from "../NavBar/NavBar";
import ProductCard from "../reusable/ProductCard/ProductCard";
import Footer from "../Footer/Footer";

interface Product {
    name: string;
    image: string;
    price: string;
    sizes: {[key: string]: number};
    keyWords: string[];

}
const ProductPage = () => {

    const [products, setProducts] = useState<Product[] | null>(null);

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


    const getHTML = products?.map((product: Product) => {

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