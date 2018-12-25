import React, { Component } from "react";
import PostForm from "../../utils/PostForm";
import { connect } from "react-redux";
import { createPost } from "../../../actions";
import { withRouter } from "react-router-dom";

class CreatePost extends Component {
  submit = data => {
    this.props.createPost(data).then(() => {
      this.props.history.push("/blog/0");
      this.props.updateOnSubmit(true);
    });
  };

  render() {
    return (
      <div className="ui container">
        <PostForm onSubmit={this.submit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { createdPost: state.createPost };
};

export default withRouter(
  connect(
    mapStateToProps,
    { createPost }
  )(CreatePost)
);
