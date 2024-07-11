import React from 'react';
import NavBar from "../NavBar/NavBar.tsx";
import Footer from "../Footer/Footer.tsx";
import './Error.css'
const Error = () => {
    return (
        <div>
            <NavBar active="0" />
            <div className="errorContainer">
                    <div className="errorTitle">
                        <h1 className={"error404"}>404 Error</h1>
                        <h3>The page you are looking for is not found</h3>

                    </div>
            </div>
            <Footer/>

        </div>
    );
};

export default Error;
