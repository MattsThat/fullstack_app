import React from 'react'
import { Field, reduxForm } from 'redux-form'
// import TextField from 'material-ui/lib/text-field'
// import RadioButton from 'material-ui/lib/radio-button'
// import RadioButtonGroup from 'material-ui/lib/radio-button-group'
// import Checkbox from 'material-ui/lib/checkbox'
// import SelectField from 'material-ui/lib/select-field'
// import MenuItem from 'material-ui/lib/menus/menu-item'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import asyncValidate from './asyncValidate'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'favoriteColor', 'notes' ]
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const MyProfile = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div align>
        <Field name="firstName" component={firstName => 
          <TextField placeholder = "First Name" 
            {...firstName} 
          />
        }/>
      </div>
      <div>
        <Field name="lastName" component={lastName =>
              <TextField 
              placeholder = "Last Name"
                {...lastName} 
              />
            }/>
      </div>
      <div>
        <FormLabel component="legend">Gender</FormLabel>
        <Field name="Gender" component={Gender =>
              <RadioGroup
              aria-label="Gender"
              name="gender1"
              value="Gender">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Prefer not to Say" />
              </RadioGroup>
          }/>
      </div>
      <div>
        <div>
          <Field name="notes" component={notes =>
              <TextField placeholder="Notes" 
                multiline = {true}
                rows={2} 
                {...notes}
              />
            }/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'myprofile',  // a unique identifier for this form
  validate
  // asyncValidate
})(MyProfile)


// const mapStateToProps = state => {
//     return {
//     //   showModal : state.login.showModal,
//     //   error: state.auth.error,
//     //   isAuth  : state.auth.isAuth,
//     //   hostsignup : state.login.hostsignup,
//     //   authRedirectPath: state.auth.authRedirectPath
//     };
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return{
//     //   onLogin : (email,pwd,history) => dispatch(actions.auth(email,pwd,history)),
//     //   onRegister : (nickname,email,password,props) => dispatch(actions.register(nickname,email,password,props)),
//     //   onRecoverPassword : () => dispatch({type:'FORGOT_PASSWORD'}),
//     //   onLoginClose : () => dispatch({type:'LOGINMODALCLOSE'})
//     };
//   };
  
// MyProfile = reduxForm({
//   form: 'myProfile',
// })(MyProfile);

// export default withRouter(MyProfile)

// export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MyProfile))
