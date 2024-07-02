import React, {useState, useEffect} from 'react';
import './SingleProduct.css';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ProductDisplay from "./ProductDisplay/ProductDisplay";
import Loader from "../reusable/Loader/Loader";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {apiGet} from "../../Api";

type Size = {
    price: number;
    quantity: number;
    sizeId: number;
};
interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    sizes: { [key: string]: Size };
    keyWords: string[];
    description: string;
    images: string[];
    imageLocation: string;
    imageCode: string[];

}
const SingleProduct = () => {

    const [singleProduct, setSingleProduct] = useState<Product | null>(null);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    let {id} = useParams();


    useEffect(() => {
        const url: string = '/contents/product/' + id;
            apiGet(url).then((response) => {
                setSingleProduct(response.data);
                setDataLoaded(true);
            }).catch((error) => {
                console.log(error);
            });


    }, []);


    return (
        <div>
            <NavBar active="products" />
            <div className="singleProductContainer">
                {dataLoaded ? (
                    singleProduct ?  (
                        <div key={singleProduct.id}><ProductDisplay
                            id={singleProduct.id}
                            key={singleProduct.id}
                            name={singleProduct.name}
                            image={singleProduct.image}
                            price={singleProduct.price}
                            description={singleProduct.description}
                            sizes={singleProduct.sizes}
                            keyWords={singleProduct.keyWords}
                            images={singleProduct.images}
                            imageCode={singleProduct.imageCode}
                        /></div>
                    ) : (
                        <p>No product found.</p>
                    )
                ) : (
                    <Loader />
                )}
            </div>
            <Footer />

        </div>
    );
};

export default SingleProduct;
