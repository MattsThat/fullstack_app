import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import './../../static/css/profileform.css'; 
import { MyTextField } from '../common/MyTextField';
import { MyTextArea } from '../common/MyTextArea';
// import { MyMultiSelect } from '../common/MyMultiSelect';
import Select from 'react-select';
import { MySwitch } from '../common/MySwitch';


// const SignupSchema = Yup.object().shape({
//   premisename: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   premisedesc: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
// });

let payment=null;
let sports=null;
let selectedSports=[];
let selectedPayment=[];

const sportsOptions = [
  { value: 'futsal', label: 'Futsal' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'badminton', label: 'Badminton' },
  { value: 'cricket', label: 'Cricket' },
  { value: 'squash', label: 'Squash' }
]

const paymentOptions = [
  { value: 'credit', label: 'Credit Card' },
  { value: 'paypal', label: 'Paypal' },
  { value: 'stripe', label: 'Stripe' },
  { value: 'paypay', label: 'Paypay' },
  { value: 'cash', label: 'Cash' }
]

class PremisesInfo extends React.Component {

  constructor(props){
    super(props);
    // let autocomplete=null;
  }

  onMultiSelectSportsChange = sports => {
    var arrlength = sports.length;
    var element = sports[arrlength-1];
    var selectValue = element.value;
    // console.log('onMultiSelectSportsChange selectValue=',selectValue);
    selectedSports.push(selectValue);
  };

  onMultiSelectPaymentChange = payment => {
    var arrlength = payment.length;
    var element = payment[arrlength-1];
    var selectValue = element.value;
    // console.log('onMultiSelectPaymentChange selectValue=',selectValue);
    selectedPayment.push(selectValue);
  };

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

    return (
    <div>
      <h1>Premises Info</h1>
      <br/>
      <br/>
      <Formik
        initialValues={{
          parking:false,
          shower: false,
          clubhouse:false,
          food: false,
          sportsshop: false,
        }}
        onSubmit={(values,{setSubmitting}) => {
          setTimeout(() => {
            console.log('premises update selectedSports=',selectedSports);
            console.log('premises update selectedPayment=',selectedPayment);
            values['availablesports'] = selectedSports;
            values['availablepaymentmenthods'] = selectedPayment;
            values['loginid'] = this.props.username;
            values['joineddate'] = new Date();
            alert(JSON.stringify(values, null, 2));
            selectedSports=null;
            selectedPayment=null;
            this.props.onPremisesSubmit(this.props,values);
            setSubmitting(false);
          }, 500);
        }}
        >
        {/* // validationSchema={SignupSchema}> */}
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
            <Form class="h-adr" onSubmit={handleSubmit}>
              <input type="hidden" name="history" defaultValue={this.props.history}/>
              <input type="hidden" class="p-country-name" value="Japan"/>                
              <div class="container justify-content-center">  
                  <div className="form-row">  
                    <div className="form-group col-md-3">
                        Premises Name
                    </div>
                    <div className="form-group col-md-9">
                      <MyTextField
                          id="premisename"
                          placeholder="Premises Name"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      Short Description  
                    </div>
                    <div className="form-group col-md-9">
                      <MyTextArea
                          id="premisedesc"
                          placeholder="Short Description"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                        />
                    </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-3"> 
                    Pin Code 〒
                    </div>
                    <div className="form-group col-md-9">
                      <MyTextField
                              id="pincode"
                              placeholder="Pin Code"
                              classtype="p-postal-code" 
                              size="10" 
                              maxLength="8"
                              onChange={handleChange} 
                              onBlur={handleBlur}
                          />
                    </div>
                  </div>
                <div className="form-row">
                    <div className="form-group col-md-3"> 
                      Address 1
                    </div>
                    <div className="form-group col-md-9">
                      <MyTextField
                            id="address1"
                            placeholder="Address"
                            classtype="p-region p-locality p-street-address" 
                            readOnly
                            onChange={handleChange} 
                            onBlur={handleBlur}
                        />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3"> 
                      Address 2
                    </div>
                    <div className="form-group col-md-9">
                      <MyTextField
                            id="address2"
                            placeholder="Address 2"
                            classtype="p-extended-address" 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                        />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3"> 
                      Access Details
                    </div>
                    <div className="form-group col-md-9"> 
                      <MyTextArea
                        id="accessdetails"
                        placeholder="Access Details"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3"> 
                        Available Sports
                      </div>
                    <div className="form-group col-md-9">                       
                      {/* <MyMultiSelect
                          // id="sportsoptions"
                          name="sportsoptions"
                          options={sportsOptions} 
                          onChange={handleChange} 
                          // onBlur={handleBlur}
                      /> */}
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isMulti
                            name={sports}
                            options={sportsOptions}
                            onChange={this.onMultiSelectSportsChange} 
                        />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3"> 
                        Payment Methods
                      </div>
                    <div className="form-group col-md-9">                       
                      {/* <MyMultiSelect
                          id="paymentptions" 
                          name="paymentptions"
                          options={paymentOptions} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          selectedvalue={payment}  */}
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isMulti
                            name={payment}
                            options={paymentOptions}
                            onChange={this.onMultiSelectPaymentChange} 
                        />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3"> 
                        Facilities
                      </div>
                    <div className="form-group col-md-9"> 
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
                    <button type="submit" disabled={!dirty || isSubmitting}>Submit</button>
                </div>
              </div>  
            </Form>
          );//end of formik return
        }}
        </Formik>
      </div>
    ); //end of outer return
  }//end of render
}//end of class

const mapStateToProps = state => {
  return{
      username : state.auth.username,
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onPremisesSubmit : (props,values) => dispatch(actions.newPremisesRegister(props,values)),
      // onGetProfile : (props) => dispatch(actions.getProfile(props)),
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PremisesInfo));