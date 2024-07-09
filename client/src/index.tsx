import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {Provider} from "react-redux";
import cart from "./store/Store";

let root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
            <Provider store={cart}>
                <App/>
            </Provider>
    </React.StrictMode>
);


