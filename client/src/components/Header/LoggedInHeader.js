
import  React  from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

class LoggedInHeader extends React.Component {

constructor(props){
    super(props);
    this.state = { address: '' };
}
state = {
    open: false,
};

handleChange = address => {
    this.setState({ address });
};
 
handleSelect = address => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => console.log('Success', latLng))
    .catch(error => console.error('Error', error));
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

handleBookAPlace = (event) => {
    // console.log('this.props=',this.props);
    this.props.onBookAPlace(this.props);
    this.handleClose(event);
}

handleBookAnEvent = (event) => {
    console.log('this called');
    this.props.onBookAnEvent(this.props);
    this.handleClose(event);
}

handleClickMyProfile = (event) => {
    // console.log('handleClickMyProfile this.props=',this.props);
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
            <Button onClick={this.handleFriends}>Friends</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                Signup
            </NavLink> */}
            <Button onClick={this.handleBookAPlace}>Book a Place</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 bd-highlight">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <Button onClick={this.handleBookAnEvent}>Book an Event</Button>
        </li>
        </ul>
    </div>
    <div class="p-2 flex-grow-1 bd-highlight">
        <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </PlacesAutocomplete>
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
        id : state.auth.id,
        hostsignup : state.auth.hostsignup
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onSearch: () => dispatch(actions.search()),
        onBookAnEvent : (props) => dispatch(actions.bookAnEvent(props)),
        onBookAPlace : (props) => dispatch(actions.bookAPlace(props)),
        onFriends : () => dispatch(actions.myFriends()),
        onMyProfile : (props) => dispatch(actions.myProfile(props)),
        onGoToHome : () => dispatch(actions.goToHome()),
        onLogout : (props) => dispatch(actions.authLogout(props))
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoggedInHeader))
    