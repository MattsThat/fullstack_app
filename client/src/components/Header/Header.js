
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
        };
        this.callme = this.callme.bind(this);
    }

    callme(params) {
      this.setState({
        visible: true,
      });
    }

    render() {
      let showModal = this.state.visible ? <Login display="true" show={this.state.visible}/> : null
      // console.log("this one",showModal);
      return(
        <div className="d-flex flex-row-reverse bd-highlight navbar-light" styles="font-family:Verdana;">
        <div class="p-2 bd-highlight">
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>              
        </div>
        <div class="p-2 bd-highlight">
        </div>
        <div class="p-2 bd-highlight">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">                      
              <Link to='/dashboard'>
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div class="p-2 bd-highlight">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                  Signup
                </NavLink> */}
              <Button onClick={this.callme}>Signup</Button>
            </li>
          </ul>
        </div>
        <div class="p-2  bd-highlight">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <Link to={{
                pathname: "/",
                //search: "?host=y",
                //hash: "#the-host",
                state: { 
                  signup : true,
                 }
              }}>
                Become a Host
              </Link>
            </li>
          </ul>
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
    