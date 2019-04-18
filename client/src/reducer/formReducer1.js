import * as actionTypes from '../actions/headerActions';
// import { updateObject } from '../common/utility';

const initialState = {
    token : null,
}

const formReducer = (state=initialState, action) => {
    console.log('action.type',action.type)
    switch (action.type){
        case actionTypes.EVENTS:
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

export default formReducer;