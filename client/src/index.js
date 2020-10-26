/**
 * This component is supposed to hold REDUX's stuff
 */
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


/**
 * The Provider tag is a React component that knows how to read changes from our redux store. Any time the Redux store
 * gets some new states produced inside of it, the provider will inform all of its children components,
 * so essentially everything that the App component renders, that some new state is available and it will update all
 * of those different components with the new state.
 */ 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

// console.log('STRIPE_KEY: ', process.env.REACT_APP_STRIPE_KEY);
// console.log('NODE_ENV: ', process.env.NODE_ENV);