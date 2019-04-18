
import  React  from 'react';
// import {  Link, NavLink } from 'react-router-dom';
//import styles from './Header.css';
import Button from '@material-ui/core/Button';
// import Login from './../Login/Login';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class LoggedInHeader extends React.Component {

constructor(props){
    super(props);
}

state = {
    open: false,
};

handleToggle = () => {
this.setState(state => ({ open: !state.open }));
};

handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
};

handleClickMyProfile = (event) => {
    this.props.onMyProfile(this.props);
    this.handleClose(event);
}

handleClickLogout = (event) => {
    // console.log('this.props=',this.props);
    this.props.onLogout(this.props);
    this.handleClose(event);
}

render(){
    const { open } = this.state;
    // let showModal = null;
    // if(this.state.hostsignup)
    //     showModal = this.state.visible ? <Login hostsignup="true" display="true" show={this.state.visible}/> : null
    // else
    //     showModal = this.state.visible ? <Login display="true" show={this.state.visible}/> : null
    // // console.log("this one",showModal);
    return(
    <div className="d-flex flex-row-reverse bd-highlight navbar-light" styles="font-family:Verdana;">
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">                      
            <Button buttonRef={node => {
                    this.anchorEl = node;
                }}
                aria-owns={open ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}>
                {this.props.nickname} Account
            </Button>
            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="simple-menu"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClickMyProfile}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClickLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>        
        </li>
        </ul>
    </div>
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                Signup
            </NavLink> */}
            <Button onClick={this.props.onFriends}>Friends</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                Signup
            </NavLink> */}
            <Button onClick={this.props.onBookAPlace}>Book a Place</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <Button onClick={this.props.onEvents}>Events</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 flex-grow-1 bd-highlight">
        {/* <form class="form-inline my-2 my-lg-0"> */}
        <form class="form-inline mr-auto mt-2 mt-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Try Sports" aria-label="Search"/>
            <Button onClick={this.props.onSearch}>Search</Button>
        </form>              
    </div>
    <div class="p-2 flex-grow-1 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <Button onClick={this.props.onGoToHome}>
                Life is Sports!!
            </Button>
        </li>
        </ul>
    </div>
    {this.props.hostsignup}
    </div>
    );//end of return
}//end of render
}//end of class

const mapStateToProps = state => {
    return{
        // showModal : state.login.showModal,
        nickname : state.auth.nickname,
        hostsignup : state.auth.hostsignup
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onSearch: () => dispatch(actions.search()),
        onEvents : () => dispatch(actions.myEvents()),
        onBookAPlace : () => dispatch(actions.bookAPlace()),
        onFriends : () => dispatch(actions.myFriends()),
        onMyProfile : (props) => dispatch(actions.myProfile(props)),
        onGoToHome : () => dispatch(actions.goToHome()),
        onLogout : (props) => dispatch(actions.authLogout(props))
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoggedInHeader))
    