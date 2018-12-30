import React, { Component } from "react";
import UserForm from "../../utils/UserForm";
import { login } from "../../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Message } from "semantic-ui-react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorOnLogin: false
    };
  }

  submit = user => {
    this.props
      .login(user)
      .then(() => {
        let { status, data } = this.props.loginResponse;
        if (status === 200) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errorOnLogin: !this.state.errorOnLogin
        });
        setTimeout(() => {
          this.setState({
            errorOnLogin: !this.state.errorOnLogin
          });
        }, 5000);
      });
  };
  render() {
    return (
      <div className="ui container">
        <UserForm onSubmit={this.submit} formTitle="Log In" />
        {this.state.errorOnLogin && (
          <Message negative>
            <Message.Header>
              We're sorry but something went wrong...
            </Message.Header>
            <p>Are you sure you entered the correct username and password?</p>
          </Message>
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    loginResponse: state.login
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(Login)
);
