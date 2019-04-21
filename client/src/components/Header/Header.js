
import  React  from 'react';
import {  Link, NavLink } from 'react-router-dom';
//import styles from './Header.css';
import Button from '@material-ui/core/Button';
import Login from './../Login/Login';
import { connect } from 'react-redux';
import * as actionTypes from '../../actions/loginActions';

class Header extends React.Component {

  constructor(props){
      super(props);
  }

  render() {
    let displayModal = null;
    // console.log("this.props.showModal",this.props.showModal);
    // console.log("this.props.hostsignup",this.props.hostsignup);
    if(this.props.hostsignup)
      displayModal = this.props.showModal ? <Login hostsignup="true"/> : null
    else
      displayModal = this.props.showModal ? <Login/> : null
    // console.log("displayModal",displayModal);
    return(
      <div className="d-flex flex-row-reverse bd-highlight navbar-light" styles="font-family:Verdana;">
      <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">                      
            <Button onClick={this.props.onLoginMenu}>Login</Button>
          </li>
        </ul>
      </div>
      <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                Signup
              </NavLink> */}
            <Button onClick={this.props.onPersonalSignupMenu}>Signup</Button>
          </li>
        </ul>
      </div>
      <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            {/* <Link to={{
              pathname: "/",
              //search: "?host=y",
              //hash: "#the-host",
              onClick:{this.hostsignup},
              state: { 
                signup : true,
                }
              }}>
              Become a Host
            </Link> */}
            <Button onClick={this.props.onHostSignUpMenu}>Become a Host</Button>
          </li>
        </ul>
      </div>
      <div class="p-2 flex-grow-1 bd-highlight">
          {/* <form class="form-inline my-2 my-lg-0"> */}
          <form class="form-inline mr-auto mt-2 mt-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Try Sports" aria-label="Search"/>
              <Button onClick={this.props.onSearchMenu}>Search</Button>
          </form>              
      </div>
      <div class="p-2 flex-grow-1 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <Link to='/'>
                Life is Sports!!
            </Link>
          </li>
        </ul>
      </div>
      {displayModal}
    </div>
      );//end of return
  }//end of render
}//end of class

const mapStateToProps = state => {
  return {
    showModal : state.login.showModal,
    hostsignup : state.login.hostsignup
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onLoginMenu : () => dispatch({type:actionTypes.LOGIN}),
    onHostSignUpMenu : () => dispatch({type:actionTypes.HOSTSIGNUP}),
    onPersonalSignupMenu : () => dispatch({type:actionTypes.SIGNUP}),
    onSearchMenu : () => dispatch({type:actionTypes.SEARCHFROMMENU}),
    // onLogout : () => dispatch({type:actionTypes.LOGOUT})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header)
    