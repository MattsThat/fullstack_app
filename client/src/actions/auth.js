import axios from 'axios';
import * as actionTypes from './loginActions';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.token,
        nickname : data.nickname,
        hostsignup : data.hostsignup,
        id: data._doc.id
    };
};

export const modalClose = (error) => {
    return {
        type: actionTypes.LOGINMODALCLOSE,
        error: error
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

export const register = (nickname,username,password,props) =>{
    return dispatch => {
        // dispatch(authStart());
        let idToBeAdded= 0;
        axios.get(`/login/getLoginDetails`)
        .then(res => { 
        //   console.log('in putDataToDB',res.data);
           idToBeAdded= res.data.data.length + 1;
        //    console.log('in putDataToDB idToBeAdded',idToBeAdded);
           let hostsignup = props.hostsignup;
            // console.log('nickname',nickname);
             axios.post(`/login/putLoginDetails`, {
               id: parseInt(idToBeAdded, 10),
               hostsignup: hostsignup,
               nickname: nickname,
               username: username,
               password: password
             })
            .then(response => {
                if(response.data.success){
                    dispatch(authSuccess(response.data.data));
                    dispatch(checkAuthTimeout(response.data.data.expiresIn));
                    props.history.push('/dashboard');
       
                }else{
                    props.history.push('/');
                    dispatch(authFail(response.data.data.error));    
                }
            })
            .catch(err =>{
                props.history.push('/');
                dispatch(authFail(err));
                console.log(err);
            })
        })   
        .catch(err =>{
            props.history.push('/');
            dispatch(authFail(err));
            console.log(err);
        });
    }
};

export const auth = (email,pwd,history) => {
    let username = null;
    let password = null;
    let path = null;
    return dispatch => {
        dispatch(authStart());
        axios.get(`/login/selectLoginDetails`,{
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
                // console.log('response.data.data',response.data.data._doc.id);
                // console.log('response.data._doc.nickname',response.data._doc.nickname);
                dispatch(authSuccess(response.data.data));
                dispatch(checkAuthTimeout(response.data.data.expiresIn));
                dispatch(modalClose());
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
