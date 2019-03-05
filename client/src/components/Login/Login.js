
import axios from "axios";
import React from 'react';
import ReactModalLogin from 'react-modal-login';
import { facebookConfig, googleConfig } from './Social-config.js';
import { withRouter } from 'react-router-dom';
// import Auth from "./AuthHelperMethods";
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Login extends React.Component {

    constructor(props){
        super(props);
    }//end of constructor

  componentWillUpdate(props,state){
    console.log('componentWillUpdate',props.display);
  } //
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    console.log('componentDidMount');
  }
  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries
    sendEmail(email){
      console.log('mail start'+email);
      axios.get(`/sendemail`, {
        params: {
          email: email,
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });  
      console.log('mail done');
    }//end of sendEmail

    putDataToDB(nickname, username, password,props){
      let idToBeAdded= 0;
      axios.get(`/getLoginDetails`)
      .then(function (res) { 
        // console.log('in putDataToDB',res.data);
         idToBeAdded= res.data.data.length;
        //  console.log('in putDataToDB idToBeAdded',idToBeAdded);
         let hostsignup = props.hostsignup;
        //  console.log('hostsignup',hostsignup);
           axios.post(`/putLoginDetails`, {
             id: parseInt(idToBeAdded, 10),
             host: hostsignup,
             nickname: nickname,
             username: username,
             password: password
           });
      })
      .catch(function(error){
        console.log(error);
      });
    }//end of putDataToDB

    onLoginClick(event){
        // event.preventDefault();
        console.log('__onLogin__');
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);
    
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        if (!email || !password) {
          // this.setState({
          //   error: true
          // })
        } else {
        //this.props.history.push('/dashboard');
    this.props.onLogin(email,password,this.props.history);
      }//end of else
    }// end of onLogin
    
    onRegister(){
        console.log('__onRegister__');
        console.log('nickname: ' + document.querySelector('#login').value);
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);    
        const nickname = document.querySelector('#login').value; // nickname
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
    
        if (!nickname || !email || !password) {
          this.setState({
            error: true
          })
        } else {
          console.log('__onRegister__this.props',this.props);
          this.putDataToDB(nickname,email,password,this.props);
          this.closeModal();
          this.props.history.push('/dashboard');
        } //end of else
    }//end of onRegister
    
    onRecoverPassword() {
        console.log('__onFotgottenPassword__');
        console.log('email: ' + document.querySelector('#email').value);
    
        const email = document.querySelector('#email').value;
    
        if (!email) {
          this.setState({
            error: true,
            recoverPasswordSuccess: false
          })
        } else {
          this.setState({
            error: null,
            recoverPasswordSuccess: true
          });
          this.sendEmail(email);
          console.log('__onFotgottenPassword__ done');
        }
    }

    onLoginSuccess(method){
      console.log('logged successfully with ' + method);
    }

    onLoginFail(method, response){
        console.log('logging failed with ' + method);
        this.setState({
            error: response
        })
    }

    onTabsChange(){
        this.setState({
          error: null
        });
    }

    render() {

    const isLoading = this.props.loading;
    return(
        <div>
            <ReactModalLogin
                visible={this.props.showModal}
                onCloseModal={this.props.onLoginClose}
                loading={this.props.loading}
                error={this.props.error}
                tabs={{
                    onChange: this.onTabsChange.bind(this)
                }}
                loginError={{
                    label: "Couldn't sign in, please try again."
                }}
                registerError={{
                    label: "Couldn't sign up, please try again."
                }}
                // startLoading={this.startLoading.bind(this)}
                // finishLoading={this.finishLoading.bind(this)}
                form={{
                    onLogin:this.onLoginClick.bind(this),
                    onRegister: this.props.onRegister,
                    onRecoverPassword: this.props.onRecoverPassword,
                    recoverPasswordSuccessLabel: this.props.recoverPasswordSuccess
                      ? {
                          label: "New password has been sent to your mailbox!"
                        }
                      : null,
                    recoverPasswordAnchor: {
                      label: "Forgot your password?"
                    },
                    loginBtn: {
                      label: "Sign in"
                    },
                    registerBtn: {
                      label: "Sign up"
                    },
                    recoverPasswordBtn: {
                      label: "Send new password"
                    },
                    loginInputs: [
                      {
                        containerClass: 'RML-form-group',
                        label: 'Email',
                        type: 'email',
                        inputClass: 'RML-form-control',
                        id: 'email',
                        name: 'email',
                        placeholder: 'Email',
                      },
                      {
                        containerClass: 'RML-form-group',
                        label: 'Password',
                        type: 'password',
                        inputClass: 'RML-form-control',
                        id: 'password',
                        name: 'password',
                        placeholder: 'Password',
                      }
                    ],
                    registerInputs: [
                      {
                        containerClass: 'RML-form-group',
                        label: 'Nickname',
                        type: 'text',
                        inputClass: 'RML-form-control',
                        id: 'login',
                        name: 'login',
                        placeholder: 'Nickname',
                      },
                      {
                        containerClass: 'RML-form-group',
                        label: 'Email',
                        type: 'email',
                        inputClass: 'RML-form-control',
                        id: 'email',
                        name: 'email',
                        placeholder: 'Email',
                      },
                      {
                        containerClass: 'RML-form-group',
                        label: 'Password',
                        type: 'password',
                        inputClass: 'RML-form-control',
                        id: 'password',
                        name: 'password',
                        placeholder: 'Password',
                      }
                    ],
                    recoverPasswordInputs: [
                      {
                        containerClass: 'RML-form-group',
                        label: 'Email',
                        type: 'email',
                        inputClass: 'RML-form-control',
                        id: 'email',
                        name: 'email',
                        placeholder: 'Email',
                      },
                    ],
                  }}
                  separator={{
                    label: "or"
                  }}
                providers={{
                    facebook:{
                    config: facebookConfig,
                    onLoginSuccess: this.onLoginSuccess.bind(this),
                    onLoginFail: this.onLoginFail.bind(this),
                    inactive: isLoading,
                    label: "Continue with Facebook"
                    },
                    google:{
                    config: googleConfig,
                    onLoginSuccess: this.onLoginSuccess.bind(this),
                    onLoginFail: this.onLoginFail.bind(this),
                    inactive: isLoading,
                    label: "Continue with Google"
                    }
                }}
            />
        </div>        
    );//end of return {loggedIn}
    }//end of render
}//end of class

const mapStateToProps = state => {
  return {
    showModal : state.login.showModal,
    error: state.auth.error,
    // isAuth  : state.auth.token !== null,
    isAuth  : state.auth.isAuth,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onLogin : (email,pwd,history) => dispatch(actions.auth(email,pwd,history)),
    onRegister : () => dispatch({type:'EMAIL_SIGNUP'}),
    onRecoverPassword : () => dispatch({type:'FORGOT_PASSWORD'}),
    onLoginClose : () => dispatch({type:'LOGINMODALCLOSE'})
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))