import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// We'll create this soon
import App from './app';
const KEYS = require("../keys");

const Root = ({ store }) => {

    const head = document.head
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${KEYS.googleAPI}&libraries=places,drawing`
    head.appendChild(googleScript); 

    return  (
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    )
};

export default Root;