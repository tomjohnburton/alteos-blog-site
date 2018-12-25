import { getPosts } from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Placeholder } from "semantic-ui-react";
import BlogDetail from "./BlogDetail";
import { Route } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import CreatePost from "../createpost/CreatePost";
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
            {this.props.posts &&
              this.props.posts.map((post, i) => (
                <Link
                  onClick={() => this.handleClick(i)}
                  key={i}
                  to={`/blog/${i}`}
                >
                  <Segment color="blue" className={this.active(i)}>
                    <h1>{post.title}</h1>
                    <p>{post.content || post.contents || post.body}</p>
                  </Segment>
                </Link>
              ))}
          </div>
          <Route
            exact
            path="/blog/:id"
            render={props => (
              <BlogDetail
                {...props}
                selectedPost={this.state.selectedPost}
                updateOnLike={e => this.updateOnSubmit(e)}
              />
            )}
          />
          <Route
            exact
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
