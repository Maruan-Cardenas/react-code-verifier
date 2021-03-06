import { AxiosResponse } from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { login } from "../../services/authService";

// Define Schema of validation with Yup

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email Format').required('Email is required'),
  password: yup.string().required('Password is required')
});

// Login component
const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          login(values.email, values.password)
            .then((res: AxiosResponse) => {
              if (res.status === 200) {
                if (res.data.token) {
                  sessionStorage.setItem("token", res.data.token);
                }else {
                  throw new Error('invalid Token');  
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
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="example@email.com"
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
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Submit
          </button>
          {isSubmitting && <div>Checking credentials...</div>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
