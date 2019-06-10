
import {CART_SUCCESS,CART_ERROR,CART_START} from '../actions/actionTypes';

const initialState = {
    data:{
        id:0,
        projects:[]
    },
    cartAdded:false,
    error:null,
    loading:false
}

const cartReducer = (state=initialState,action)=> {

    switch(action.type){
        case CART_START:
            return{
                ...state,
                loading:true
            };
        case CART_SUCCESS:
            return {
                ...state,
                data:action.data,
                cartAdded:action.cartAdded,
                loading:false
            };
        case CART_ERROR:
            return {
                ...state,
                error:action.error,
                loading:false
            };
        default:
            return state;
    }

};  

export default cartReducer;