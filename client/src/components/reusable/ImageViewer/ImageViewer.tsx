import React from 'react';
import './ImageViewer.css';

type ImageViewerProps = {
    image: string;
    func: () => void;
};
const ImageViewer = (props: ImageViewerProps) => {
    const image : string = props.image;
    return (
        <div  className={"imageViewerContainer"}>
            <div className={"imageViewerClose"} onClick={props.func}>
                <div className="imageViewerOuter">
                    <div className="imageViewerInner">
                        <label>Back</label>
                    </div>
                </div>
            </div>
            <div className="imageViewer">
                <img src={image} alt="Image"/>
            </div>
        </div>
    );
};

export default ImageViewer;
