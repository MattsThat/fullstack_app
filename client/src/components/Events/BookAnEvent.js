import React  from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import './../../static/css/profileform.css'; 
import { MyTextField } from '../common/MyTextField';
import { MyTextArea } from '../common/MyTextArea';
import { MySelect } from '../common/MySelect';
import { MySwitch } from '../common/MySwitch';
import { MyDatePicker } from '../common/MyDatePicker';
import { MyTimePicker } from '../common/MyTimePicker';

const SignupSchema = Yup.object().shape({
  // eventname: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // eventdesc: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required')
});

const sportsOptions = [
  <option defaultValue='futsal'>Futsal</option>,
  <option value='tennis'>Tennis</option>,
  <option value='badmin'>Badminton</option>,
];

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
      <h1>Book an Event</h1>
      <br/>
      <br/>
      <Formik
        initialValues={{
          eventname: '',
          eventdesc:'',
          eventsports: 'futsal',
          eventpremiseid: '',
          eventdate: '',
          eventstarttime: '',
          eventendtime: '',
          eventprivate: 'false',
          expectedpartipants: '',
          eventinvitesent: 'false',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('render this.props.values=',this.props.values);
            alert(JSON.stringify(values, null, 2));
            // this.props.onEventSubmit(this.props,values);
            setSubmitting(false);
          }, 500);
        }}
        // validationSchema={SignupSchema}
        >
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
            <Form onSubmit={handleSubmit}>
                <input type="hidden" name="history" defaultValue={this.props.history}/>
                {/* <input type="hidden" name="eventid" value="1" onChange={handleChange} onBlur={handleBlur}/> */}
              <div class="container justify-content-center">  
                <div className="form-row">
                    <div className="form-group col-md-4">
                      <MySelect
                       id="eventsports" 
                       name="eventsports" 
                       onChange={handleChange} 
                       onBlur={handleBlur}
                       optionData={sportsOptions}
                      />
                      {/* <select id="eventsports" name="eventsports" class="custom-select" onChange={handleChange} onBlur={handleBlur}>
                        <option defaultValue="futsal">Futsal</option>
                        <option value="tennis">Tennis</option>
                        <option value="badmin">Badminton</option>
                      </select> */}
                    </div> 
                    <div className="form-group col-md-4">
                      <MyTextField
                        id="eventname"
                        placeholder="Event Name"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                      />
                    {/* <input type="text" 
                      class="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default"
                      id="eventname"
                      required
                      placeholder="Event Name"
                      margin="normal"
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      />
                      {errors.eventname && touched.eventname ? (<div>{errors.eventname}</div>) : null} */}
                    </div> 
                    <div className="form-group col-md-4">
                        <MyTextArea
                          id="eventdesc"
                          placeholder="Event Description"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                        />
                    </div>
                </div>  
                <div className="form-row">
                    <div className="form-group col-md-4 ">
                      <MySwitch
                        id="eventprivate"
                        label="Private Event"
                        onChange={handleChange} 
                        onBlur={handleBlur}
                      />
                      {/* <div className="custom-control custom-switch">
                        <div className="custom-switch">
                          <input type="checkbox" 
                            class="custom-control-input" 
                            id="eventprivate"
                            onChange={handleChange} 
                            onBlur={handleBlur}/>
                          <label class="custom-control-label" for="eventprivate">Private Event</label>
                        </div>  
                      </div>     */}
                    </div>
                    <div className="form-group col-md-4 ">
                      <MySwitch
                          id="eventinvitesent"
                          label="Invite Sent"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <MyTextField
                          id="expectedpartipants"
                          placeholder="Expected Participants"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                      <MyDatePicker
                          id="eventdate"
                          label="Event Date"
                          defaultValue={new Date()}
                          margin="normal"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                      />
                      {/* <label for="eventdate">Event Date</label>
                      <input
                          class="form-control" 
                          id="eventdate"
                          label="Event Date"
                          type="date"
                          defaultValue={new Date()}
                          margin="normal"
                          onChange={handleChange} 
                          onBlur={handleBlur}/>
                          {errors.eventdate && touched.eventdate ? <div>{errors.eventdate}</div> : null} */}
                    </div>
                    <div className="form-group col-md-4">
                      <MyTimePicker
                          label="Event Start Time"
                          name="eventstarttime"
                          step="1800" 
                          min="00:30"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                      />  
                      {/* <label for="eventstarttime">Event Start Time</label>
                      <input 
                          class="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default"
                          label="Event Start Time"
                          type="time" 
                          name="eventstarttime"
                          step="1800" 
                          min="00:30"
                          margin="normal"
                          onChange={handleChange} 
                          onBlur={handleBlur}/>
                          {errors.eventstarttime && touched.eventstarttime ? <div>{errors.eventstarttime}</div> : null} */}
                    </div>
                    <div className="form-group col-md-4">
                    <MyTimePicker
                          label="Event End Time"
                          name="eventendtime"
                          step="1800" 
                          min="00:30"
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

