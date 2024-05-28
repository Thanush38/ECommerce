import React, {useState, useEffect} from 'react';
import './SingleProduct.css';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ProductDisplay from "./ProductDisplay/ProductDisplay";
import Loader from "../reusable/Loader/Loader";
import axios from 'axios';
interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    sizes: {[key: string]: number};
    keyWords: string[];
    description: string;
    images: string[];
    imageLocation: string;
    imageCode: string[];

}
const SingleProduct = () => {

    const [singleProduct, setSingleProduct] = useState<Product | null>(null);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    // useEffect(() => {
    //     const url: string = 'http://localhost:8080/server-1.0-SNAPSHOT/api/contents/product'
    //     const fetchProducts = async () => {
    //         try {
    //             const response: Response = await fetch(url);
    //             const data = await response.json();
    //             console.log(data.items);
    //             // setSingleProducts(data.items);
    //             // singleProducts = data.items;
    //             setSingleProducts(data.items);
    //             if(singleProduct != null){
    //                 setDataLoaded(true);
    //             }
    //
    //             console.log(singleProduct)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchProducts();
    //
    // }, []);

    useEffect(() => {
        const url: string = 'http://localhost:8080/server-1.0-SNAPSHOT/api/contents/product';
        axios.get(url).then((response) => {

            console.log(response.data);
            setSingleProduct(response.data);
            setDataLoaded(true);
        }).catch((error) => {
            console.log(error);
        })

    }, []);


    // const getHTML = () => {
    //     if (singleProducts != null) {
    //         console.log("showing data");
    //         return <ProductDisplay id={singleProducts.id} key={singleProducts.id} name={singleProducts.name} image={singleProducts.image}
    //                                price={singleProducts.price} description={singleProducts.description}
    //                                sizes={singleProducts.sizes} keyWords={singleProducts.keyWords}
    //                                images={singleProducts.images}/>;
    //     }
    //     console.log(singleProducts);
    //
    //
    //
    // }

    return (
        <div>
            <NavBar active="products" />
            <div className="singleProductContainer">
                {dataLoaded ? (
                    singleProduct ?  (
                        <ProductDisplay
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
                        />
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
