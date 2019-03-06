import axios from 'axios';
import * as actionTypes from './loginActions';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    console.log('expirationTime',expirationTime);
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email,pwd,history) => {
    let username = null;
    let password = null;
    let path = null;
    return dispatch => {
        dispatch(authStart());
        axios.get(`/selectLoginDetails`,{
            params:{
              username: email,
              password: pwd
            },
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({username,password}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.data.success){
                const expirationDate = new Date(new Date().getTime() + response.data.data.expiresIn * 1000);
                localStorage.setItem('token',response.data.data.token);
                localStorage.setItem('expirationDate',expirationDate);
                dispatch(authSuccess(response.data.data.token));
                dispatch(checkAuthTimeout(response.data.data.expiresIn));
                history.push('/dashboard');
            }
            else{
                history.push('/');
                dispatch(authFail(response.data.data.error));
            }
        })
        .catch(err => {
            history.push('/');
            dispatch(authFail(response.data.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};
