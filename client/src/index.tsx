import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {Provider} from "react-redux";
import cart from "./store/Store";

let root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <Provider store={cart}>
                <App/>
            </Provider>
        </DevSupport>
    </React.StrictMode>
);


