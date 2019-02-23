
import  React  from 'react';
import {  Link, NavLink } from 'react-router-dom';
//import styles from './Header.css';
import Button from '@material-ui/core/Button';
import Login from './../Login/Login';
import axios from "axios";


class LoggedInHeader extends React.Component {

constructor(props){
    super(props);
    this.state = {
        visible: false,
        hostsignup: false
    };
    this.myprofile = this.myprofile.bind(this);
    this.friends = this.friends.bind(this);
    this.eventsdetails = this.eventsdetails.bind(this);
    this.bookaplace = this.bookaplace.bind(this);
    this.eventsdetails = this.eventsdetails.bind(this);
}

myprofile(params) {
    // alert('here myprofile');
    this.setState({
    visible: true,
    hostsignup: false
    });
}

friends(params) {
    // alert('here friends');
    this.setState({
    visible: true,
    hostsignup: false
    });
}

eventsdetails(params) {
    // alert('here eventsdetails');
    this.setState({
    visible: true,
    hostsignup: false
    });
}

bookaplace(params) {
    // alert('here bookaplace');
    this.setState({
    visible: true,
    hostsignup: false
    });
}

search(params) {
    alert('here search');
}

goToHome(props){
    console.log('mgoToHome');
    axios.get(`/goToHome`, {
    //   params: {
    //     loggedin: true,
    //   }
    })
    .then(function (response) {
      console.log(response);
      props.history.push('/');
    })
    .catch(function (error) {
      console.log(error);
    });  
    console.log('goToHome');
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
            <Button onClick={this.logout}>My Profile</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                Signup
            </NavLink> */}
            <Button onClick={this.friends}>Friends</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                Signup
            </NavLink> */}
            <Button onClick={this.bookaplace}>Book a Place</Button>
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
            state: {signup : true,}}}>
            Become a Host
            </Link> */}
            <Button onClick={this.eventsdetails}>Events</Button>
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
            <Link to='/' onClick={this.goToHome(this.props)}>
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

export default LoggedInHeader
    