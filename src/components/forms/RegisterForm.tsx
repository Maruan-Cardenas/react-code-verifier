import { AxiosResponse } from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { register } from "../../services/authService";

// Define Schema of validation with Yup

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "Username must have 6 letters minimun")
    .max(12, "username must have maximum 12 letters")
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid Email Format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, "Password must have 8 letters minimun")
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    })
    .required('Confirm Password is required'),
  age: yup
    .number()
    .min(10, 'You must be 10 years old')
    .required('Age is required')
});

// Register component
const RegisterForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "", age: 0 }}
      validationSchema={ registerSchema }
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          register(values.name, values.email, values.password, values.age)
            .then((res: AxiosResponse) => {
              if (res.status === 200) {
                if (res.data) {
                  console.log('User registered successfully');
                  console.log(res.data);
                } else {
                  throw new Error('invalid data');
                }
              } else {
                throw new Error('invalid credentials');
              }
              setSubmitting(false);
            }).catch((err) => {
              console.error(`[Login ERROR] Something went wrong: ${err}`);
              setSubmitting(false);
            })
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              type="confirmPassword"
              name="confirmPassword"
              className="form-control"
              placeholder="Repeat your password"
            />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field
              type="name"
              name="name"
              className="form-control"
              placeholder="Enter name"
            />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <Field
              type="age"
              name="age"
              className="form-control"
              placeholder="Enter age"
            />
            <ErrorMessage name="age" component="div" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
