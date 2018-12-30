import React from "react";
import { Field, reduxForm } from "redux-form";

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <div id="login-form">
      <h3>Log In</h3>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label htmlFor="username">username</label>
          <Field name="username" component="input" type="text" validate />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" validate />
        </div>
        <button type="submit" className="ui button">
          Submit
        </button>
      </form>
    </div>
  );
};

LoginForm = reduxForm({
  // a unique name for the form
  form: "login"
})(LoginForm);

export default LoginForm;
