import React from "react";
import { Field, reduxForm } from "redux-form";

let PostForm = props => {
  const { handleSubmit } = props;
  return (
    <div id="signup-form">
      <h3>{props.postFormTitle}</h3>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text" />
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <Field name="content" component="input" type="text" />
        </div>
        <button type="submit" className="ui button">
          Submit
        </button>
      </form>
    </div>
  );
};

PostForm = reduxForm({
  // a unique name for the form
  form: "PostForm"
})(PostForm);

export default PostForm;
