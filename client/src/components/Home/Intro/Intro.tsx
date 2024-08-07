import React from 'react';
import './Intro.css';
import Button  from "../../reusable/Button/Button";
import {useNavigate} from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();
    const viewProducts = () => {
        navigate("/products");
    }
    return (
        <div className="introWrapper">
            <div className="introContainer">
                <div className="introText">
                    <h1 >Get the Best Posters</h1>
                    <p>Ultra High 4K Poster Pictures</p>
                    <div className="introBTNWrap">
                    <Button text="Browse Options" onClick={viewProducts}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
