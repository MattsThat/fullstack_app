
import axios from "axios";
import React from 'react';
import ReactModalLogin from 'react-modal-login';
import { facebookConfig, googleConfig } from './Social-config.js';
//import Home from './../Home/Home';
import { withRouter } from 'react-router-dom';
//import Dashboard from './Dashboard/Dashboard';


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

    this.getDataFromDb();
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
      //onLoginSuccess('form');
    })
    .catch(function (error) {
      console.log(error);
      //onLoginFail('form',error);
    });  
    console.log('mail done');

  }//end of sendEmail

  // our first get method that uses our backend api to 
  // fetch data from our data base
    getDataFromDb(){
      fetch(`/getLoginDetails`)
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
      // .catch(function(error){
      //   console.log(error);
      // });
    }

    // this method will check the valid login attempt
    selectDataFromDB(username, password, props){
      let validLogin = null;
      axios.get(`/selectLoginDetails`, {
        params: {
          username: username,
          password: password
        }
      })
      .then(function (response){
        validLogin = response.data.success;
        // console.log('successful=',validLogin);
        if(validLogin)
          props.history.push('/dashboard');
        else
          props.history.push('/email');
      })
      .catch(function (error) {
        console.log(error);
      });  
      console.log('done');
    }
    
    putDataToDB(nickname, username, password){
      console.log('in putdatadb');
      let currentIds = this.state.data.map(data => data.id);
  
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
      axios.post(`/putLoginDetails`, {
        id: idToBeAdded,
        nickname: nickname,
        username: username,
        password: password
      });
      // console.log('done');
    }

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
        console.log('login: ' + document.querySelector('#login').value);
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);
    
        const login = document.querySelector('#login').value; // nickname
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
    
        if (!login || !email || !password) {
          this.setState({
            error: true
          })
        } else {
          this.putDataToDB(login,email,password);
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