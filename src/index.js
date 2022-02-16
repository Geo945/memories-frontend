import React from 'react'
import ReactDOM from 'react-dom'

//for redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App'
import './index.css'

//to set up redux:
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    //wrap App in Provider for the reducer
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);