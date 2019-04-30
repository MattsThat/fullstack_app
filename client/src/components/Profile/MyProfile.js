import React from 'react';
import { Formik, Field, Form as FormikForm, FieldArray } from 'formik';
import * as Yup from 'yup';
import {  Form, Input, Datepicker, PhoneInput, Radio, Checkbox } from 'react-formik-ui';

// import LoggedInHeader from '../Header/LoggedInHeader';


const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});


// const MyProfile = () => (
class MyProfile extends React.Component{

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
  }

  profileSave(){
    // alert('here');
    // alert(JSON.stringify(data));
  }

  render(){
    return(
      <div>
        <h1>My Profile</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <div>
            <Form themed>
                {/* <div> First Name
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                </div> 
                <div>Last Name
                    <Field name="lastName" />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                </div>
                <div> Email
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </div> */}
                <div>
                    <Input
                      name='firstName'
                      label='Input field label'
                      placeholder='First Name'
                      required/>
                    <Input
                      name='lastName'
                      label='Input field label'
                      placeholder='Last Name'
                      required/>
                    <Input
                      name='email'
                      label='Input field label'
                      placeholder='Email'
                      type='email'
                      required/>
                    Gender
                    <Radio
                      name='gender'
                      label='Radio options label'
                      options={[
                        { value: '1', label: 'Male'},
                        { value: '2', label: 'Female'},
                        { value: '3', label: 'Not Preferred to Say'}
                      ]}/>
                    <Input
                      name='lineid'
                      label='Input field label'
                      placeholder='LiNE ID'
                      required/>
                    <Input
                      name='autocomplete'
                      label='Input field label'
                      placeholder='Address'
                      onFocus= {this.geolocate()}
                      type='text'
                      required/>
                    {/* DOB
                    <Datepicker
                      name='dob'
                      label='Select a date'
                      placeholder='DD.MM.YYYYY'
                      dateFormat='dd.MM.yyyy'/>  */}
                    Phone Number
                    <PhoneInput
                      name='phone'
                      label='Phone Nr.'
                      preferredCountries={['jp', 'us', 'in']}/>
                    Favourite Sports<FieldArray name='favsports' component={favSportsForm}/>
                    {/* <div> */}
                    <button type="submit" onSubmit={this.profileSave()}>Submit</button>
                    {/* <SubmitBtn /> */}
                </div>
              </Form>
            </div> 
          )}
        </Formik>
      </div>
  );//end of teturn
  }//end of render
}//end of class

export const favSportsForm = ({
  move, swap, push, insert, unshift, pop, form
}) => (
  <FormikForm>
    <Checkbox
    name='favsports1'
    text='Futsal'/>   
    <Checkbox
    name='favsports2'
    text='Tennis'/> 
    <Checkbox
    name='favsports3'
    text='Badminton'/> 
    <Checkbox
    name='favsports4'
    text='Golf'/> 
    <Input
    name='otherSports'
    label='Input field label'
    placeholder='Others'/>
  </FormikForm>  
);

export default MyProfile;