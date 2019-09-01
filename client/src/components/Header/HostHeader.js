
import  React  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

class HostHeader extends React.Component {

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
    this.props.onBookAPlace(this.props);
    // this.handleClose(event);
}
handleGoToHome = (event) =>{
    this.props.onGoToHome(this.props);
}
handleBookAnEvent = (event) => {
    this.props.onBookAnEvent(this.props);
}

handleClickMyProfile = (event) => {
    this.props.onMyProfile(this.props);
}

handleClickLogout = (event) => {
    this.props.onLogout(this.props);
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
        <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <Link class="nav-link bg-primary" onClick={this.handleGoToHome}>Life is Sports<span class="sr-only">(current)</span></Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="form-inline mx-auto my-2 my-lg-0">
          <PlacesAutocomplete 
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input form-control mr-sm-2',
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
              {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
          </form>
          {/* <ul class="navbar-nav ml-auto"> */}
          <ul class="nav nav-tabs ml-auto bg-primary">
          <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleToggle}>Your Courts</Link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" onClick={this.handleNewCourts}>New Court Register<span class="sr-only">(current)</span></Link>
                <Link class="dropdown-item" onClick={this.handleExistingCourt}>Update Court Info<span class="sr-only">(current)</span></Link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleToggle}>Communications</Link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" onClick={this.handleInbox}>Inbox<span class="sr-only">(current)</span></Link>
                <Link class="dropdown-item" onClick={this.handleReviews}>Reviews<span class="sr-only">(current)</span></Link>
                <Link class="dropdown-item" onClick={this.handleAlerts}>Alerts<span class="sr-only">(current)</span></Link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleToggle}>Reservation</Link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" onClick={this.handleUpcomingReserv}>Upcoming Reservations<span class="sr-only">(current)</span></Link>
                <Link class="dropdown-item" onClick={this.handlePastReserv}>Past Reservations<span class="sr-only">(current)</span></Link>
                <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" onClick={this.handleStats}>Stats<span class="sr-only">(current)</span></Link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleToggle}>{this.props.nickname} Account</Link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" onClick={this.handleClickMyProfile}>Profile<span class="sr-only">(current)</span></Link>
                <Link class="dropdown-item" onClick={this.handleClickLogout}>Logout<span class="sr-only">(current)</span></Link>
              </div>
            </li>
          </ul>
        </div>
        </nav>
        <div>
            {this.props.hostsignup}
        </div>
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
        onFriends : (props) => dispatch(actions.myFriends(props)),
        onMyProfile : (props) => dispatch(actions.myProfile(props)),
        onGoToHome : (props) => dispatch(actions.goToHome(props)),
        onLogout : (props) => dispatch(actions.authLogout(props))
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HostHeader))
    