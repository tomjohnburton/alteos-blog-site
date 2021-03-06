import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./utils/NavBar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import BlogList from "./pages/blogpage/BlogList";
import LoggedRoute from "./utils/LoggedRoute";
import ProtectedRoute from "./utils/ProtectedRoute";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="app">
        <NavBar />
        <div className="ui ">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <LoggedRoute path="/signup" component={Signup} />
            <LoggedRoute path="/login" component={Login} />
            <ProtectedRoute path="/blog" component={BlogList} />
          </Switch>
        </div>
      </div>
    );
  }
}
