import { Button, Message } from "semantic-ui-react";
import React, { Component } from "react";
import PostForm from "../../utils/PostForm";
import { connect } from "react-redux";
import { editPost, getPosts, addLike, deletePost } from "../../../actions";
import { withRouter } from "react-router-dom";

class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editSelect: false,
      editButton: "Edit",
      cancelButton: "Cancel",
      update: true,
      likes: 0,
      adminError: false
    };
  }

  handleButtonClick = () => {
    this.setState({
      editSelect: !this.state.editSelect
    });
  };

  deletePost = () => {
    this.props
      .deletePost(this.props.selectedPost._id)
      .then(() => {
        this.props.getPosts().then(() => {
          this.setState({
            update: !this.state.update
          });
          this.props.history.push("/blog");
        });
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

  handleAddLike = _id => {
    this.props.selectedPost.likes++;
    this.props
      .addLike(_id)
      .then(() => {
        this.props.updateOnLike();
      })
      .then(() => {
        this.setState({
          update: !this.state.update
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  submitEdit = data => {
    let editData = {
      title: data.title,
      content: data.content,
      _id: this.props.selectedPost._id
    };
    this.props
      .editPost(editData)
      .then(() => {
        this.props.getPosts().then(() => {
          this.setState({
            editSelect: !this.state.editSelect
          });
          this.props.history.push("/blog");
        });
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
        {!this.props.selectedPost ? (
          <h1>Select a Post</h1>
        ) : (
          <>
            <h1>{this.props.selectedPost.title}</h1>
            <div className="post-content">
              {/* <h5>{this.props.selectedPost.title}</h5> */}
              <p>
                {this.props.selectedPost.content ||
                  this.props.selectedPost.body}
              </p>
              <p>{this.props.selectedPost.created_at}</p>
              <p>
                {this.props.selectedPost.user
                  ? this.props.selectedPost.user.username
                  : ""}
              </p>
              <div className="action-buttons">
                <Button
                  color="red"
                  content="Like"
                  icon="heart"
                  onClick={() =>
                    this.handleAddLike(this.props.selectedPost._id)
                  }
                  label={{
                    basic: true,
                    color: "red",
                    pointing: "left",
                    content: this.props.selectedPost.likes
                      ? this.props.selectedPost.likes
                      : 0
                  }}
                />
                <Button.Group>
                  <Button positive onClick={this.handleButtonClick}>
                    {this.state.editSelect
                      ? this.state.cancelButton
                      : this.state.editButton}
                  </Button>
                  <Button.Or />
                  <Button negative onClick={this.deletePost}>
                    Delete
                  </Button>
                </Button.Group>
              </div>
            </div>
          </>
        )}
        {this.state.adminError && (
          <Message negative>
            <Message.Header>You are not an admin</Message.Header>
          </Message>
        )}

        {this.state.editSelect ? <PostForm onSubmit={this.submitEdit} /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editedPost: state.editPost,
    likes: state.likes,
    deletedPost: state.deletePost
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { editPost, getPosts, addLike, deletePost }
  )(BlogDetail)
);
