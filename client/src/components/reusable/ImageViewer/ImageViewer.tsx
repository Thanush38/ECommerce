import React from 'react';
import './ImageViewer.css';

type ImageViewerProps = {
    image: string;
    func: () => void;
};
const ImageViewer = (props: ImageViewerProps) => {
    const image : string = props.image;
    return (
        <div className={"imageViewerContainer"}>
            <div className={"imageViewerClose"} onClick={props.func}>
                <div className="imageViewerOuter">
                    <div className="imageViewerInner">
                        <label className={"imageViewerLabel"}>Back</label>
                    </div>
                </div>
            </div>
            {/*<div className="imageViewer">*/}
            {/*    <img src={image} alt="Image" width="90vw" height="90vh"/>*/}
            {/*</div>*/}
            <div className="imageViewer" style={{width: '90vw', height: '90vh'}}>
                <img src={image} alt="Image" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
            </div>
        </div>
    );
};

export default ImageViewer;
