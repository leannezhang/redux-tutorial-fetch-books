import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";

// Step 1. Install redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Compose rootReducer as part of the store
const store = composeEnhancers()(createStore)(rootReducer);

// Step 2.1
// Store has dispatch(), getState(), subscribe() methods
// console.log("store", store);
// console.log("store", store.getState());
// store.dispatch(fetchBooksSuccess());
// store.dispatch(search());

// Provider subsribes to store and update the UI when states changes
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
