import {AUTH_SUCCESS,AUTH_ERROR} from '../actions/actionTypes';
const initialState = {
    token:null,
    userId:null,
    error:null
};

const authReducer = (state=initialState,action) => {
    switch(action.type){
        case AUTH_SUCCESS:
            return{
                ...state,
                token:action.token,
                userId:action.userId,
            };
        case AUTH_ERROR:
            return {
                ...state,
                error:action.error
            };
        default:
            return state;
    }
    
}

export default authReducer;