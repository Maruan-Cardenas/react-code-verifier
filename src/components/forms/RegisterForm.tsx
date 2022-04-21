import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { register } from "../../services/authService";

// Define Schema of validation with Yup

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email Format').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  name: yup.string().required('Name is required'),
  age: yup.number().required('Age is required'),
});

// Register component
const RegisterForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", age: 0 }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          register( values.name, values.email, values.password, values.age);
          setSubmitting(false);
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
            <label htmlFor="confirmPassword">confirmPassword</label>
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
