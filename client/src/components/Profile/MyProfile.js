import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
// import { Input, Datepicker, PhoneInput, Radio, Checkbox } from 'react-formik-ui';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import './../../static/css/profileform.css'; 
// import { ProfileForm } from './ProfileForm';
import { RadioButton, RadioButtonGroup } from '../common/CommonComp';

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

class MyProfile extends React.Component {

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

  // handleClose = event => {
  //   if (this.anchorEl.contains(event.target)) {
  //     return;
  //   }
  //   this.setState({ open: false });
  // };
  // handleProfileSubmit(){
  //   console.log('handleProfileSubmit this.props=',this.props);
  //   this.props.onProfileSubmit(this.props);
  //   // this.handleClose(event);
  // }

  render() {
    let firstname='';
    let lastname='';
    let email='';
    let id='';
    let gender='';
    let lineid='';
    let address='';
  if (this.props.profiledata === null){
      firstname=''; 
      lastname='';
      email='';
      id='';
      gender='';
      lineid='';
      address='';
    }else{
      id=this.props.profiledata.id; 
      firstname=this.props.profiledata.firstname; 
      lastname=this.props.profiledata.lastname;
      email=this.props.profiledata.email;
      gender=this.props.profiledata.gender;
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
          gender: gender,
          lineid: lineid,
          address: address
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // console.log('render this.props.values=',this.props.values);
            // alert(JSON.stringify(values, null, 2));
            this.props.onProfileSubmit(this.props,values);
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
                <div> First Name
                    <input name="firstname" 
                    type= "text" 
                    // value={values.firstName} 
                    defaultValue={firstname} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    />
                    {errors.firstname && touched.firstname ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                </div> 
                 <div> Last Name
                    <input name="lastname" 
                    type= "text" 
                    // value={values.lastName} 
                    defaultValue={lastname} 
                    onChange={handleChange} 
                    onBlur={handleBlur}/>
                    {errors.lastname && touched.lastname ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                </div>
                <div> Email
                    <input name="email" 
                    type="email" 
                    // value={values.email} 
                    defaultValue={email}
                    onChange={handleChange} 
                    onBlur={handleBlur}/>
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </div>
                <div> 
                    <RadioButtonGroup
                      id="gender"
                      label="Gender"
                      // value={values.gender}
                      // error={errors.gender}
                      // touched={touched.gender}
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      >
                      <Field
                        component={RadioButton}
                        name="gender"
                        id="male"
                        label="Male"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        />
                      <Field
                        component={RadioButton}
                        name="gender"
                        id="female"
                        label="Female"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        />
                      <Field
                        component={RadioButton}
                        name="gender"
                        id="na"
                        label="Not Preffered to Say"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        />
                    </RadioButtonGroup>
                    {errors.gender && touched.gender ? <div>{errors.gender}</div> : null}
                </div>
                <div> LiNE ID 
                    <input name="lineid" 
                    type="text" 
                    // value={values.line} 
                    defaultValue={lineid}
                    onChange={handleChange} 
                    onBlur={handleBlur}/>
                    {errors.line && touched.line ? <div>{errors.line}</div> : null}
                </div>
                <div> Address 
                    <input name="address" 
                    type="textarea" 
                    rows="4" cols="50" 
                    // value={values.address} 
                    defaultValue={address}
                    onFocus= {this.geolocate()}
                    onChange={handleChange} 
                    onBlur={handleBlur}/>
                    {errors.address && touched.address ? <div>{errors.address}</div> : null}
                </div>
                <div>
                    <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>
                      Reset
                    </button>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MyProfile));