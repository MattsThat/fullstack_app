import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import './../../static/css/profileform.css'; 
import MaterialTimePicker from '../common/MaterialTimePicker';
import MaterialDatePicker from '../common/MaterialDatePicker';
import TextField from '@material-ui/core/TextField';


const SignupSchema = Yup.object().shape({
  eventname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  eventdesc: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

class BookAnEvent extends React.Component {

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
  
  render() {
    
    return (
    <div>
      <h1>My Profile</h1>
      <br/>
      <br/>
      <Formik
        initialValues={{
          eventbame: '',
          eventdesc:'',
          eventsports: '',
          eventpremiseid: '',
          eventdate: '',
          eventstarttime: '',
          eventendtime: '',
          eventprivate: '',
          expectnumber: '',
          eventinvitesent: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('render this.props.values=',this.props.values);
            alert(JSON.stringify(values, null, 2));
            this.props.onEventSubmit(this.props,values);
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
                <input type="hidden" name="history" defaultValue={this.props.history}/>
                <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField
                      id="eventname"
                      required
                      placeholder="Event Name"
                      // className={classes.textField}
                      margin="normal"
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      />
                      {errors.eventname && touched.eventname ? (
                          <div>{errors.eventname}</div>
                      ) : null}
                    </div> 
                  <div className="form-group col-md-4">
                    <TextField
                    id="eventdesc"
                    // label="Event Description"
                    placeholder="Event Description"
                    multiline
                    // className={classes.textField}
                    margin="normal"
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <TextField
                    id="expectnumber"
                    required
                    placeholder="Expected Participants"
                    // className={classes.textField}
                    margin="normal"
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    />
                    {errors.expectnumber && touched.expectnumber ? <div>{errors.expectnumber}</div> : null}
                  </div>
                </div>  
                <div className="form-row">
                    <div className="switch form-group col-md-4">
                        <label>
                            <input type="checkbox" id="eventprivate" checked/>Private
                      </label>                    
                    </div>
                    <div className="switch form-group col-md-4">
                        <label>
                            <input type="checkbox" id="eventprivate" checked/>Invite Sent
                      </label>                    
                    </div>
                    <div className="form-group col-md-4">
                      <TextField
                      id="expectnumber"
                      required
                      placeholder="Expected Participants"
                      // className={classes.textField}
                      margin="normal"
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      />
                      {errors.expectnumber && touched.expectnumber ? <div>{errors.expectnumber}</div> : null}
                  </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                      <MaterialDatePicker id="eventdate" label="Event Date"/>
                    </div>
                    <div className="form-group col-md-4">
                      <MaterialTimePicker id="eventstarttime" label="Start Time"/>
                    </div>
                    <div className="form-group col-md-4">
                      <MaterialTimePicker id="eventendtime" label="End Time"/>
                    </div>
                </div>
                <div className="form-row">
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
      onEventSubmit : (props,values) => dispatch(actions.eventRegister(props,values)),
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BookAnEvent));