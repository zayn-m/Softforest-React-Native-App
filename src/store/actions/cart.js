import {HOST_URL} from '../../settings';
import {CART_SUCCESS,CART_ERROR,CART_START} from './actionTypes';

export const cartStart=()=>{
    return {
        type:CART_START
    };
};

export const cartSuccess=(data,added)=> {
    return {
        type:CART_SUCCESS,
        data:data,
        cartAdded:added
    };
};

export const cartError = (error) =>{
    return {
        type:CART_ERROR,
        error:error
    };
};

export const checkToCart = (userId, softwareId) => {
    return dispatch => {
        fetch(HOST_URL+`/cart/${userId}/`)
        .then(res=>res.json())
        .then(res=>{
            
            const match = res.projects.filter(item=>item===softwareId);
            if(match.length>0){
                dispatch(cartSuccess(res,true));
            }
            else{
                dispatch(cartSuccess(res,false));
            }
            
        })
        .catch(err=>{
            dispatch(cartError(err));
        });
    }
}

export const addToCart = (userId,id,check) => {
    return dispatch=>{
      
        dispatch(cartStart());
        if(check.id>0){
            const project = [...check.projects];
            project.push(id);
            const data = {
                user:userId,
                projects:project
            }
            fetch(HOST_URL+"/cart/"+`${userId}/`,{
                method:"PATCH",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(response){
                  
                dispatch(cartSuccess(response,true));
                }
            }).catch(err=>{
                dispatch(cartError(err));
            });
        }
        else{
            const data = {
                user:userId,
                projects:[id]
            }
            fetch(HOST_URL+"/cart/",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(response=>{
                if(response){
                    dispatch(cartSuccess(response,true));
                }
            })
            .catch(err=>{
                dispatch(cartError(err));
        
            });
        }
    };
};