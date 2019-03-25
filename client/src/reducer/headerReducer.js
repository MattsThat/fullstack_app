import * as actionTypes from '../actions/headerActions';
// import { updateObject } from '../common/utility';

const initialState = {
    token : null,
}

const headerReducer = (state=initialState, action) => {
    console.log('action.type',action.type)
    switch (action.type){
        case actionTypes.EVENTS:
            return {
                ...state,
                token:  action.token
            }
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
        case actionTypes.MY_PROFILE:
            return {
                ...state, 
                token:  action.token
            }
        case actionTypes.AUTH_LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');    
            // console.log('state in AUTH_LOGOUT',state);
            return state
        default: return state           
    }//end of switch
}//end of function

export default headerReducer;