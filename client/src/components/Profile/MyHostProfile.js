import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import './../../static/css/profileform.css'; 
import { MyTextField } from '../common/MyTextField';
import { MyTextArea } from '../common/MyTextArea';
import { MySelect } from '../common/MySelect';
import { MySwitch } from '../common/MySwitch';

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  gender: Yup.string()
    .required("Please select")
});


class MyHostProfile extends React.Component {

  constructor(props){
    super(props);
    // let autocomplete=null;
  }

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {types: ['geocode']});

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  }
  
  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
        // autocomplete.setBounds(circle.getBounds());
      });
    }
  }//end of geolocate

  render() {
    let firstname='';
    let lastname='';
    let email='';
    let id='';
    let companyname='';
    let lineid='';
    let address='';
    let accessdetails='';
  if (this.props.profiledata === null){
      firstname=''; 
      lastname='';
      email='';
      id='';
      companyname='';
      lineid='';
      address='';
      accessdetails='';
    }else{
      id=this.props.profiledata.id; 
      firstname=this.props.profiledata.firstname; 
      lastname=this.props.profiledata.lastname;
      email=this.props.profiledata.email;
      companyname=this.props.profiledata.companyname;
      accessdetails=this.props.profiledata.accessdetails;
      lineid=this.props.profiledata.lineid;
      address=this.props.profiledata.address;
    }
    return (
    <div>
      <h1>My Profile</h1>
      <br/>
      <br/>
      <Formik
        initialValues={{
          id: id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          accessdetails: accessdetails,
          lineid: lineid,
          companyname : companyname,
          address: address
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('profile update this.props.values=',values);
            alert(JSON.stringify(values, null, 2));
            // this.props.onProfileSubmit(this.props,values);
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={SignupSchema}>
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            //  {({ errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" defaultValue={id}/>
              <input type="hidden" name="history" defaultValue={this.props.history}/>
              <div class="container justify-content-center">  
                <div className="form-row">
                    <div className="form-group col-md-6">
                      <MyTextField
                          id="firstname"
                          placeholder="First Name"
                          defaultValue={firstname} 
                          label="First Name"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                      />
                    </div> 
                    <div className="form-group col-md-6">  
                      <MyTextField
                          id="lastname"
                          placeholder="Last Name"
                          label="Last Name"
                          defaultValue={lastname} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6"> 
                      <MyTextField
                          id="companyname"
                          placeholder="Company Name"
                          label="Email"
                          defaultValue={companyname} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <MyTextField
                          id="lineid"
                          placeholder="LiNE ID"
                          label="LiNE ID"
                          defaultValue={lineid} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                      />
                    </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6"> 
                    <MyTextArea
                      id="address"
                      placeholder="Address"
                      label="Address"
                      defaultValue={address} 
                      onChange={handleChange} 
                      onFocus= {this.geolocate()}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="form-group col-md-6"> 
                    <MyTextArea
                      id="accessdetails"
                      placeholder="Access Details"
                      label="Access Details"
                      defaultValue={accessdetails} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12"> 
                    <MySwitch
                        id="parking"
                        label="Parking"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                    <MySwitch
                        id="shower"
                        label="Shower"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                    <MySwitch
                        id="clubhouse"
                        label="Club House"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                    <MySwitch
                        id="food"
                        label="Food"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                    <MySwitch
                        id="sportshop"
                        label="Sports Shop"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="form-row">
                    <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>
                      Reset
                    </button>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </div>
              </div>  
            </form>
          );//end of formik return
        }}
        </Formik>
      </div>
    ); //end of outer return
  }//end of render
}//end of class

const mapStateToProps = state => {
  return{
      id : state.auth.id,
      hostsignup : state.auth.hostsignup,
      profiledata : state.header.profiledata
  };
};

const mapDispatchToProps = dispatch => {
  return{
      onProfileSubmit : (props,values) => dispatch(actions.myProfileUpdate(props,values)),
      // onGetProfile : (props) => dispatch(actions.getProfile(props)),
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MyHostProfile));