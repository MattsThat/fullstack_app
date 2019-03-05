import * as actionTypes from '../actions/loginActions';

const initialState = {
    showModal : false,
    hostsignup : false
}

const loginReducer = (state=initialState, action) => {
    console.log('action.type',action.type)
    switch (action.type){
        case actionTypes.HOMEPAGE:
            return {
                ...state,
                showModal:  false
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                showModal: true
            }
        case actionTypes.SIGNUP:
            return {
                ...state, 
                showModal: true
            }
        case actionTypes.HOSTSIGNUP:
            return {
                ...state, 
                    showModal: true,
                    hostsignup: true
            }
        case actionTypes.LOGINMODALCLOSE:
            return {
                ...state,
                showModal : false
            }        
        default: return state           
    }//end of switch
}//end of function

export default loginReducer;