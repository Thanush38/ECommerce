import React from 'react';
import './ProductDisplay.css';
import { Slide } from 'react-slideshow-image';
import ImageSlider from "./ImageSlider/ImageSlider";

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    sizes: {[key: string]: number};
    keyWords: string[];
    description: string;
    images: string[];
    imageCode: string[];

}
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}
const ProductDisplay = (props : Product) => {
    const [imageString, setImageString] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("Select Size");
    // const getImage = async () => {
    //     const url = "http://localhost:8080/server-1.0-SNAPSHOT/api/images/vijay";
    //     try {
    //         const response: Response = await fetch(url);
    //         const data = await response.json();
    //         // console.log(data);
    //         setImageString("data:image/png;base64," + data.image);
    //         console.log(imageString);
    //     } catch (error) {
    //         console.log(error);
    //
    //     }
    //     return "error"
    // }
    // getImage();

    const setPriceFunction = (size: string) => {
        setPrice("$" + props.sizes[size]);
    }

    const getButtons = () => {
        let buttons = [];
        for (let key in props.sizes) {
            buttons.push(<div className={"productButtonContainer"}><button className={"productButton"} onClick={() => setPriceFunction(key)}>{key}</button></div>);
        }
        return buttons;
    }
    return (
        <div>
            <div className="singleProductContent">
                <div className={"productImageContainer"}>
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
                                      <h2>Price: {price}</h2>
                                  </div>
                                  <p>{props.description}</p>
                                  <button className="CartBtn" >
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
