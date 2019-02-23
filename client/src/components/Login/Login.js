
import axios from "axios";
import React from 'react';
import ReactModalLogin from 'react-modal-login';
import { facebookConfig, googleConfig } from './Social-config.js';
import { withRouter } from 'react-router-dom';
import Auth from "./AuthHelperMethods";

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          showModal: true,
          loading: false,
          error: null
        }; //end of setState
        
        //console.log('inLogin state constructor',this.state.showModal);

    }//end of constructor

  componentWillUpdate(props,state){
    // console.log('inLogin props componentWillUpdate',props.display);
    // console.log('inLogin state componentWillUpdate',state);
    this.state.showModal = props.display;
    //console.log('inLogin state1 componentWillUpdate',this.state);
  } //
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    console.log('componentDidMount');
    //  this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      //let interval = setInterval(this.getDataFromDb, 1000);
      //this.setState({ intervalIsSet: interval });
    }
  }
  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
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

    // this method will check the valid login attempt
    selectDataFromDB(username, password, props){
      let validLogin = null;
      //Auth = new AuthHelperMethods();
      //console.log('1111=',validLogin);
      axios.get(`/selectLoginDetails`, {
        params: {
          username: username,
          password: password
        },
        method: 'POST',
        credentials: 'same-origin',
        //body: JSON.stringify(this.state),
        body: JSON.stringify({username,password}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response){
        validLogin = response.data.success;
        console.log('response=',response);
        console.log('response headers=',response.headers["Set-Cookie"]);
        //console.log('request cookies=',request.cookies);
        //Set-Cookie: token=
        if(validLogin){
          // Auth.setToken(response.data.token);
          props.history.push('/dashboard');
        }
        else{
          props.history.push('/invalidlogin');
        }
      })
      .catch(function (error) {
        console.log('error',error);
      });  
    }//end of selectDataFromDB
    
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

    onLogin() {
        console.log('__onLogin__');
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);
    
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
    
        if (!email || !password) {
          this.setState({
            error: true
          })
        } else {
          this.selectDataFromDB(email, password,this.props);
          this.closeModal();
        }//end of else
    }// end of onLogin
    
    onRegister() {
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
        }
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

    openModal(){
      this.setState({
        showModal: true
      });
      //console.log('on open modal');
    }
    
    closeModal(){
      this.setState({
        showModal: false,
        error: null
      });
      //console.log('on close modal');
    }
    onAfterCloseModal(){
      console.log('on after close modal');
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

    startLoading(){
        this.setState({
            loading: true
        })
    }

    getLogin(){
        this.setState({
            loading: true
        })
    }

    finishLoading(){
        this.setState({
         loading: false
        })
    }

    onTabsChange(){
        this.setState({
          error: null
        });
    }

    render() {
      // const loggedIn = this.state.loggedIn
      // ? <div>
      //     <p>You are signed in with: {this.state.loggedIn}</p>
      //   </div>
      // : <div>
      //     <p>You are signed out</p>
      // </div>;

    const isLoading = this.state.loading;
    //console.log("showmodal"+this.state.showModal);
    return(
        <div>
            <ReactModalLogin
                visible={this.state.showModal}
                onCloseModal={this.closeModal.bind(this)}
                loading={this.state.loading}
                error={this.state.error}
                tabs={{
                    onChange: this.onTabsChange.bind(this)
                }}
                loginError={{
                    label: "Couldn't sign in, please try again."
                }}
                registerError={{
                    label: "Couldn't sign up, please try again."
                }}
                startLoading={this.startLoading.bind(this)}
                finishLoading={this.finishLoading.bind(this)}
                form={{
                    onLogin: this.onLogin.bind(this),
                    onRegister: this.onRegister.bind(this),
                    onRecoverPassword: this.onRecoverPassword.bind(this),
                    recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
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

export default withRouter(Login)    