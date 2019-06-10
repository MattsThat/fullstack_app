
import  React  from 'react';
// import {  Link, NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
//import styles from './Header.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Login from '../Login/Login';
import { connect } from 'react-redux';
import * as actionTypes from '../../actions/loginActions';

class Header extends React.Component {

  constructor(props){
      super(props);
      this.state = { address: '' };
  }
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

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
      <div>
      <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <Link class="nav-link bg-primary" href='/'>Life is Sports</Link>
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
          <li class="nav-item active">
            {/* <a class="nav-link" href={this.props.onLoginMenu}>Login <span class="sr-only">(current)</span></a> */}
            <Link class="nav-link" onClick={this.props.onLoginMenu}>Login<span class="sr-only">(current)</span></Link>
          </li>
          <li class="nav-item active">
            <Link class="nav-link" onClick={this.props.onPersonalSignupMenu}>Signup<span class="sr-only">(current)</span></Link>
          </li>
          <li class="nav-item active">
            <Link class="nav-link" onClick={this.props.onHostSignUpMenu}>Become a Host<span class="sr-only">(current)</span></Link>
          </li>
        </ul>
      </div>
      </nav>
      <div>
        {displayModal}
      </div>
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
    