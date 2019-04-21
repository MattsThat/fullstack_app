import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LoggedInHeader from '../Header/LoggedInHeader';


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

const MyProfile = () => (
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
        <Form>
            <div> First Name
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
            </div>
            <div>
                <button type="submit">Submit</button>
            </div> 
          </Form>
        </div> 
      )}
    </Formik>
  </div>
);

export default MyProfile;