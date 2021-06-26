import React from 'react';
import { Formik, Form ,  useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../input/Input';
import './Registration.scss'
import HomePage from '../homePage/HomePage';
import Loader from '../loader/Loader';

function RegistrationFormik ()  {
  const { status , setStatus , resetForm , isSubmitting , setErrors} = useFormik({});
  const validate = Yup.object({
    firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 charaters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm password is required'),
  })
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => 
        {
        fetch('https://reqres.in/api/posts', {
          method: "POST",
          body: JSON.stringify(
            {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
            }
          )
        })
          .then(res => res.json())
          .then(json => {
            console.log(json);
            resetForm();
            setStatus(true);
          }).catch((error) => {
            console.log(error)
            setErrors({main: 'errooorr'})
          })
        }
      }
    >
      {formik => (
        <div className='mainDiv'>
          {status ? (<Loader isLoading={isSubmitting}><HomePage/></Loader>) : (
            <div>
              <h1 className="register">Register</h1>
                <Form>
                  <Input label="First Name" name="firstName" type="text" />
                  <Input label="last Name" name="lastName" type="text" />
                  <Input label="Email" name="email" type="email" />
                  <Input label="password" name="password" type="password" />
                  <Input label="Confirm Password" name="confirmPassword" type="password"/>
                  <button className="button registerButton" type="submit">Register</button>
                  <button className="button reset" type="reset">Reset</button>
                </Form>
            </div>
          )}
        </div>
      )}
    </Formik>
  )
}

export default RegistrationFormik;