import { combineReducers } from 'redux'
import * as actionTypes from '../actions/loginActions';

const initialState = {
    showModal = false
}

function home(state=initialState, action){
    switch (action.type){
        case HOMEPAGE:
            return [
                ...state, {
                    showModal: false
                }
            ]
        case LOGIN:
            return [
                ...state, {
                    showModal: true
                }
            ]
        case SIGNUP:
            return [
                ...state, {
                    showModal: true
                }
            ]
        default: return state           
    }//end of switch
}//end of function

function auth(state=initialState, action){
    switch(action.type){
        case EMAIL_AUTH:
        case EMAIL_SIGNUP:
        case FORGOT_PASSWORD:
        case RECOVER_PASSWORD:
        default: return state           
    }//end of switch
}//end of function

const login = combineReducers({
    home,
    auth
})

export default login;