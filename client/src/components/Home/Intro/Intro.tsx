import React from 'react';
import './Intro.css';
import Button  from "../../reusable/Button/Button";

const Intro = () => {
    const viewProducts = () => {
        console.log("View Products");
    }
    return (
        <div className="introWrapper">
            <div className="introContainer">
                <div className="introText">
                    <h1 >Get the best out of your day</h1>
                    <p>Ultra High 4K Poster Pictures</p>
                    <Button text="Browse Options" onClick={viewProducts}></Button>
                </div>
            </div>
        </div>
    );
};

export default Intro;
