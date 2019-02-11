
import  React  from 'react';
import {  Link, NavLink } from 'react-router-dom';
//import styles from './Header.css';
import Button from '@material-ui/core/Button';
import Login from './../Login/Login';

  class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          visible: false,
          hostsignup: false
        };
        this.personalsignup = this.personalsignup.bind(this);
        this.hostsignup = this.hostsignup.bind(this);
        this.search = this.search.bind(this);

    }

    personalsignup(params) {
      // alert('here personalsignup');
      this.setState({
        visible: true,
        hostsignup: false
      });
    }

    hostsignup(params) {
      // alert('here hostsignup');
      this.setState({
        visible: true,
        hostsignup: true
      });
    }

    search(params) {
      alert('here search');
      // this.setState({
      //   visible: true,
      //   hostsignup: true
      // });
    }

    render() {
      let showModal = null;
      if(this.state.hostsignup)
        showModal = this.state.visible ? <Login hostsignup="true" display="true" show={this.state.visible}/> : null
      else
        showModal = this.state.visible ? <Login display="true" show={this.state.visible}/> : null
      // console.log("this one",showModal);
      return(
        <div className="d-flex flex-row-reverse bd-highlight navbar-light" styles="font-family:Verdana;">
        <div class="p-2 bd-highlight">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">                      
              <Button onClick={this.personalsignup}>Login</Button>
            </li>
          </ul>
        </div>
        <div class="p-2 bd-highlight">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                  Signup
                </NavLink> */}
              <Button onClick={this.personalsignup}>Signup</Button>
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
              <Button onClick={this.hostsignup}>Become a Host</Button>
            </li>
          </ul>
        </div>
        <div class="p-2 flex-grow-1 bd-highlight">
            {/* <form class="form-inline my-2 my-lg-0"> */}
            <form class="form-inline mr-auto mt-2 mt-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Try Sports" aria-label="Search"/>
                <Button onClick={this.search}>Search</Button>
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
        {showModal}
      </div>
        );//end of return
    }//end of render
  }//end of class

export default Header
    