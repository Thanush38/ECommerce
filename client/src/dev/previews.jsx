import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Footer from "../components/Footer/Footer.tsx";
import ProductPage from "../components/ProductPage/ProductPage.tsx";
import ProductCard from "../components/reusable/ProductCard/ProductCard.tsx";
import App from "../App.tsx";
import Policy from "../components/InfoPages/Policy/Policy";
import ImageViewer from "../components/reusable/ImageViewer/ImageViewer";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Footer">
                <Footer/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/ProductPage">
                <ProductPage/>
            </ComponentPreview>
            <ComponentPreview path="/ProductCard">
                <ProductCard/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Policy">
                <Policy/>
            </ComponentPreview>
            <ComponentPreview path="/ImageViewer">
                <ImageViewer/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews