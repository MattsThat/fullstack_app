import * as actionTypes from '../actions/headerActions';
import { updateObject } from '../common/utility';

const initialState = {
    token : null,
    profiledata : null,
}

const headerReducer = (state=initialState, action) => {
    // console.log('headerReducer action.type',action.type)
    switch (action.type){
        case actionTypes.BOOK_AN_EVENT:
            return {
                ...state,
                token:  action.token
            }
        case actionTypes.PUT_EVENT_DETAILS:
            // console.log("PUT_EVENT_DETAILS in reducer",action)
            return updateObject(state,{
                ...state,
                token: action.token
             });            
        case actionTypes.PUT_PREMISES_DETAILS:
            console.log("PUT_PREMISES_DETAILS in reducer",action)
            return updateObject(state,{
                ...state,
                token: action.token
            });            
        case actionTypes.BOOKA_PLACE:
            return {
                ...state,
                token:  action.token
            }
        case actionTypes.FRIENDS:
            return {
                ...state, 
                token:  action.token
            }
        case actionTypes.GO_TO_HOME:
            return {
                ...state, 
                token:  action.token
            }
        case actionTypes.MY_PROFILE_UPDATE:
            return {
                ...state, 
                token:  action.token
            }            
        case actionTypes.MY_PROFILE_UPDATE:
            return updateObject(state,{
                token: action.token
             });            
        case actionTypes.MY_PROFILE:
            console.log("MY_PROFILE in reducer",action.profiledata)
            return updateObject( state, {
                token:  action.token,
                profiledata : action.profiledata
            });
        case actionTypes.MY_HOST_PROFILE:
            console.log("MY_HOST_PROFILE in reducer",action.profiledata)
            return updateObject( state, {
                token:  action.token,
                profiledata : action.profiledata
            });
        case actionTypes.AUTH_LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');    
            // console.log('state in AUTH_LOGOUT',state);
            return state
        default: return state           
    }//end of switch
}//end of function

export default headerReducer;