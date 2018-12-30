import React, { Component } from "react";
import PostForm from "../../utils/PostForm";
import { connect } from "react-redux";
import { createPost } from "../../../actions";
import { withRouter } from "react-router-dom";
import { Message } from "semantic-ui-react";
class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminError: false
    };
  }

  submit = data => {
    this.props
      .createPost(data)
      .then(() => {
        this.props.history.push("/blog");
        this.props.updateOnSubmit(true);
      })
      .catch(err => {
        console.log("error", err.toString());
        this.setState({
          adminError: !this.state.adminError
        });
        setTimeout(() => {
          this.setState({
            adminError: !this.state.adminError
          });
        }, 5000);
      });
  };

  render() {
    return (
      <div className="ui blog-detail">
        <h2>Write a post</h2>
        <PostForm onSubmit={this.submit} />
        {this.state.adminError && (
          <Message negative>
            <Message.Header>You are not an admin</Message.Header>
          </Message>
        )}
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
