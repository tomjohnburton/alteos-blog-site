import React from "react";
import { Field, reduxForm } from "redux-form";

let UserForm = props => {
  const { handleSubmit } = props;
  return (
    <div className="ui container">
      <h3>{props.formTitle}</h3>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit" className="ui button">
          Submit
        </button>
      </form>
    </div>
  );
};

UserForm = reduxForm({
  // a unique name for the form
  form: "UserForm"
})(UserForm);

export default UserForm;
