import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux";
import rootReducer from "../src/store/reducers/rootReducer";
import thunk from "redux-thunk";
import FBconfig from "../src/config/FBconfig";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase"
import { reduxFirestore, getFirestore } from "redux-firestore"

const store = createStore(rootReducer, 
    compose( 
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(FBconfig),
        reactReduxFirebase(FBconfig)
    )
)

ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
