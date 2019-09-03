import axios from 'axios';
import * as actionTypes from './headerActions';

export const bookAPlace = () => {
    return {
        type: actionTypes.BOOKA_PLACE
    };
};

export const bookAnEvent = (props) => {
    props.history.push('/bookAnEvent');
    return {
        type: actionTypes.BOOK_AN_EVENT,
    };
};

export const myFriends = () => {
    return {
        type: actionTypes.FRIENDS,
    };
};

export const loadMyProfile = (data) => {
        return {
        type: actionTypes.MY_PROFILE,
        profiledata : data.data._doc
    };
};

export const putEventDetails = () => {
    return {
        type: actionTypes.PUT_EVENT_DETAILS,
    };
}

export const eventRegister =(props,values) =>{
    // console.log('on eventRegister props',props);
    // console.log('on eventRegister values',values);
    return dispatch => {
        axios.post('/eventdetails/putEventDetails',{
            params:{
                update:values
            },
            method: 'POST',
            credentials: 'same-origin',
            // body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }) //end of axios post
        .then(response => {
            if(response.data.success){
                console.log('on eventRegister response.data if',response.data);
                dispatch(putEventDetails());
                props.history.push('/dashboard');
            }else{
                console.log('on eventRegister response.data else',response.data);
                props.history.push('/');
            }
        })
        .catch(err => {
            console.log('eventRegister catch err',err);
            props.history.push('/');
        });
    } //end of dispatch
}//end of eventRegister

export const updateProfileData = () => {
    return {
        type: actionTypes.MY_PROFILE_UPDATE,
    };
}

export const myProfileUpdate = (props,values) => {
    console.log('on myProfileUpdate props',props);
    // let id = null;
    return dispatch => {
        axios.post('/userinfo/updateUserInfo',{
            params:{
                update:values
            },
            method: 'POST',
            credentials: 'same-origin',
            // body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }) //end of axios post
        .then(response => {
            if(response.data.success){
                console.log('on myProfileUpdate response.data if',response.data);
                dispatch(updateProfileData());
                props.history.push('/dashboard');
            }else{
                console.log('on myProfileUpdate response.data else',response.data);
                props.history.push('/');
            }
        })
        .catch(err => {
            console.log('putProfileData catch err',err);
            props.history.push('/');
        });
    } //end of dispatch
}//end of function

export const myProfile = (props) => {
    let id = null;
    return dispatch => {
        console.log('getProfile props',props)
        axios.get(`/userinfo/selectUserInfo`,{
            params:{
                id: props.id,
            },
            method: 'GET',
            credentials: 'same-origin',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('myProfile then response',response);
            if(response.data.success){
                // console.log('response.data.data',response.data.data._doc.id);
                // console.log('getProfile response.data',response.data);
                dispatch(loadMyProfile(response.data));
                // props.history.push('/dashboard');
                props.history.push('/myprofile');
            }
            else{
                // console.log('myProfile catch err 1',err);
                props.history.push('/');
                // dispatch(authFail(response.data.data.error));
            }
        })
        .catch(err => {
            console.log('myProfile catch err 2',err);
            props.history.push('/');
            // dispatch(authFail(response.data.data.error));
        });
    };
}

export const myHostProfile = (props) => {
    let id = null;
    return dispatch => {
        console.log('myHostProfile props',props)
        axios.get(`/userinfo/selectUserInfo`,{
            params:{
                id: props.id,
            },
            method: 'GET',
            credentials: 'same-origin',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('myHostProfile then response',response);
            if(response.data.success){
                // console.log('response.data.data',response.data.data._doc.id);
                // console.log('getProfile response.data',response.data);
                dispatch(loadMyProfile(response.data));
                // props.history.push('/dashboard');
                props.history.push('/myhostprofile');
            }
            else{
                // console.log('myProfile catch err 1',err);
                props.history.push('/');
                // dispatch(authFail(response.data.data.error));
            }
        })
        .catch(err => {
            console.log('myProfile catch err 2',err);
            props.history.push('/');
            // dispatch(authFail(response.data.data.error));
        });
    };
}

export const registerNewPremises = () => {
    return {
        type: actionTypes.REGISTER_NEW_PREMISES,
    };
}

export const goToHome = (props) => {
    props.history.push('/');
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

