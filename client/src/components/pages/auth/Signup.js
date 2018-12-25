import React, { Component } from "react";
import UserForm from "../../utils/UserForm";
import { signup } from "../../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Message } from "semantic-ui-react";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorOnSignup: false
    };
  }

  submit = user => {
    this.props
      .signup(user)
      .then(() => {
        let { status, data } = this.props.signUpResponse;
        if (status === 200) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errorOnSignup: !this.state.errorOnSignup
        });
        setTimeout(() => {
          this.setState({
            errorOnSignup: !this.state.errorOnSignup
          });
        }, 5000);
      });
  };
  render() {
    return (
      <div className="ui container">
        <UserForm onSubmit={this.submit} formTitle="Sign Up" />
        {this.state.errorOnSignup && (
          <Message negative>
            <Message.Header>
              We're sorry but something went wrong...
            </Message.Header>
            <p>This email has already been registered</p>
          </Message>
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    signUpResponse: state.signup
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signup }
  )(Signup)
);
