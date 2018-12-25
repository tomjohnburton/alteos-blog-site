import { getPosts } from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Placeholder } from "semantic-ui-react";
import BlogDetail from "./BlogDetail";
import { Route } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import CreatePost from "../createpost/CreatePost";
import api from "../../../api/auth";

const PlaceholderExamplePlaceholder = () => (
  <div className="ui card">
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  </div>
);

class BlogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardId: null,
      selectedPost: null,
      updated: true
    };
  }
  componentDidMount = () => {
    this.props.getPosts();
  };

  updateOnSubmit = e => {
    this.props.getPosts().then(() => {
      this.setState({
        updated: !this.state.updated
      });
    });
  };

  handleClick = i => {
    this.setState({
      cardId: i,
      selectedPost: this.props.posts[i]
    });
  };
  active(i) {
    return this.state.cardId === i ? "active" : "";
  }

  renderPosts() {
    if (!this.props.posts) {
      return PlaceholderExamplePlaceholder();
    } else {
      return (
        <div id="blog-page">
          <div className="blog-list">
            <h1>Community Posts</h1>
            {this.props.posts &&
              this.props.posts.map((post, i) => (
                <Link
                  onClick={() => this.handleClick(i)}
                  key={i}
                  to={`/blog/${i}/read`}
                >
                  <Segment
                    color={
                      api.currentUser(post.user.email) ? "orange" : "black"
                    }
                    className={this.active(i)}
                  >
                    <h2>{post.title}</h2>
                    <p>{post.content || post.contents || post.body}</p>
                    <small>{post.user.email}</small>
                  </Segment>
                </Link>
              ))}
          </div>

          <Route
            path="/blog/:id/read"
            render={props => (
              <BlogDetail
                {...props}
                selectedPost={this.state.selectedPost}
                updateOnLike={e => this.updateOnSubmit(e)}
              />
            )}
          />
          <Route
            path="/blog/post"
            render={props => (
              <CreatePost
                {...props}
                updateOnSubmit={e => this.updateOnSubmit(e)}
              />
            )}
          />
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderPosts()}</div>;
  }
}

let mapStateToProps = state => {
  return { posts: state.getPosts };
};
export default connect(
  mapStateToProps,
  { getPosts }
)(BlogList);
