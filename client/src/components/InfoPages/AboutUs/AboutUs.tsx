import React from 'react';
import './AboutUs.css';
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import LogoImage from "../../../images/PosterLogo.png"

const AboutUs = () => {
    return (
        <div>
            <NavBar active="3"  />
            <div className="aboutUsContainer">
                <div className="aboutUsContent">
                    <div className="aboutTitle">
                        <h1>About Us</h1>
                    </div>
                    <div className="aboutContentContainer">
                        <div className={"aboutImageContainer"}>
                            <img src={LogoImage} alt="About Us" className={"aboutImage"}/>
                        </div>
                        <div className={"aboutInfo"}>
                            <p>Shadow Posters is a company that provides you with the best quality posters. We provide you with a wide variety of options to choose from. We have a wide range of posters from sports to movies. We have a team of designers who are passionate about their work and are always looking to provide you with the best quality posters.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
};

export default AboutUs;
