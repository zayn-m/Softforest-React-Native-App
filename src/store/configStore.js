import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from './reducers/auth';
import loadingReducer from './reducers/ui';
import cartReducer from './reducers/cart';
const rootReducer = combineReducers({
    auth:authReducer,
    uiLoading:loadingReducer,
    cart:cartReducer
});
let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;
