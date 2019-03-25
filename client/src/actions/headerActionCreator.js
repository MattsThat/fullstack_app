import axios from 'axios';
import * as actionTypes from './headerActions';

export const bookAPlace = () => {
    return {
        type: actionTypes.BOOKA_PLACE
    };
};

export const myEvents = () => {
    return {
        type: actionTypes.EVENTS,
    };
};

export const myFriends = () => {
    return {
        type: actionTypes.FRIENDS,
    };
};

export const myProfile = () => {
    return {
        type: actionTypes.MY_PROFILE,
    };
};

export const goToHome = () => {
    return {
        type: actionTypes.GO_TO_HOME,
    };
};

export const search = () => {
    return {
        type: actionTypes.SEARCH,
    };
};

export const authLogout = (props) => {   
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    props.history.push('/');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

