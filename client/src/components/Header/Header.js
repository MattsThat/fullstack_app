
import  React  from 'react';
import {  Link, NavLink } from 'react-router-dom';
//import styles from './Header.css';
import Button from '@material-ui/core/Button';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Login from './../Login/Login';
import { connect } from 'react-redux';
import * as actionTypes from '../../actions/loginActions';
import classes from './navigation.css';


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
      // <div className="d-flex flex-row-reverse bd-highlight navbar-light" styles="font-family:Verdana;">
      <div className={classes.navigation}>
          <li>                      
            <Button onClick={this.props.onLoginMenu}>Login</Button>
          </li>
          <li>
            {/* <NavLink to='/' onClick={this.callme} activeStyle={{fontWeight: "bold",color: "red"}}>
                Signup
              </NavLink> */}
            <Button onClick={this.props.onPersonalSignupMenu}>Signup</Button>
          </li>
          <li>
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
          <li>
            <Link to='/'>
                Life is Sports!!
            </Link>
          </li>
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
    