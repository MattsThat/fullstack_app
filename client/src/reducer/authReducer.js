import * as actionTypes from '../actions/loginActions';
import axios from 'axios';
import { updateObject } from '../common/utility';

const initialState = {
    loading: false,
    error: null,
    recoverPasswordSuccessLabel: null,
    token: null,
    isAuth : false,
    hostsignup : false,
    authRedirectPath: '/'
}

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject(state,{
        token: action.token,
        error: null,
        isAuth : true,
        loading: false
     });
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const authReducer = (state=initialState, action) =>{
    switch(action.type){
        // case actionTypes.EMAIL_AUTH:
        //     console.log('email',action.authdata.email);
        //     console.log('pwd',action.authdata.pwd);
        //     return auth(state, action);
        // case actionTypes.EMAIL_SIGNUP:
        // case actionTypes.FORGOT_PASSWORD:
        // case actionTypes.RECOVER_PASSWORD:
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default: return state           
    }//end of switch
}//end of function

export default authReducer;