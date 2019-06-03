import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers();

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;
