import * as actionTypes from '../actions/loginActions';
import { updateObject } from '../common/utility';

const initialState = {
    loading: false,
    error: null,
    recoverPasswordSuccessLabel: null,
    token: null,
    nickname : null,
    username : null,
    id : null,
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
        nickname : action.nickname,
        username : action.username,
        hostsignup : action.hostsignup,
        id : action.id,
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
    return updateObject(state, { 
        token: null,
        userId: null 
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const authReducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default: return state;           
    }//end of switch
}//end of function

export default authReducer;